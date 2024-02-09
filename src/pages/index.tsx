import { Button } from '@/components/Button';
import { BigInput } from '@/components/Input';
import { NewsLinkRow } from '@/components/NewsLinkRow';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChapterPage({}) {
  const router = useRouter();
  const { text } = router.query;
  const [loading, setLoading] = useState(false);
  const [keyowrd, setKeyword] = useState(String(text || ''));
  const [news, setNews] = useState<News[]>([] as News[]);

  const onSearch = async (keyowrd: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/news?query=${keyowrd}`);
      const resJson: { items: News[] } = await res.json();
      setNews(
        resJson.items.filter(
          (a) =>
            keyowrd.split(' ').some((b) => a.title.includes(b)) ||
            keyowrd.split(' ').some((b) => a.description.includes(b)),
        ),
      );
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!text) onSearch(String(text));
  }, [text]);

  return (
    <div className="bg-white h-full min-h-screen pt-10">
      <div className="px-5 flex space-x-3">
        <BigInput
          value={keyowrd}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button disabled={loading} onClick={() => onSearch(keyowrd)}>
          검색
        </Button>
      </div>
      <div className="mt-4">
        {loading && <p className="px-4">loading...</p>}
        {news.map((newsData, i) => {
          return <NewsLinkRow news={newsData} key={i} />;
        })}
      </div>
    </div>
  );
}
