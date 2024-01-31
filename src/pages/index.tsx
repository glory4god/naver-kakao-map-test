import Link from 'next/link';
import { InputHTMLAttributes, PropsWithChildren, useState } from 'react';

interface News {
  title: string;
  link: string;
  description: string;
  originallink: string;
  pubDate: string;
}

export default function ChapterPage({}) {
  const [loading, setLoading] = useState(false);
  const [keyowrd, setKeyword] = useState('');
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

  return (
    <div className="bg-white h-full min-h-screen pt-10">
      <div className="px-5">
        <BigInput
          value={keyowrd}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="mt-4"></div>
        <Button disabled={loading} onClick={() => onSearch(keyowrd)}>
          검색
        </Button>
      </div>
      <div className="mt-4">
        {loading && <p>loading...</p>}
        {news.map((newsData, i) => {
          return <BoardRow news={newsData} key={i} />;
        })}
      </div>
    </div>
  );
}

interface Props {
  news: News;
}
const BoardRow = ({ news }: Props) => {
  return (
    <Link
      href={news.originallink}
      target="_blank"
      className={
        'h-auto font-bold cursor-pointer py-3  transition-all flex w-full forceHover justify-between border-b'
      }>
      <div className="pl-5">
        <h3
          className="text-sm my-1.5 whitespace-nowrap text-ellipsis overflow-hidden"
          dangerouslySetInnerHTML={{ __html: news.title }}
        />
        <p
          className="text-xs mb-2 text-gray-600"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        <p className="text-xs ">{news.pubDate}</p>
      </div>
    </Link>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const BigInput = ({ ...rest }: InputProps) => {
  return (
    <input
      className="rounded-[1px] h-[44px] p-0 pb-1 text-lg border-b-2 border-gray-300 text-[26px] outline-none focus:border-red-300 transition-all duration-150"
      style={{
        color: '#1f2937',
        caretColor: '#f87171',
        lineHeight: 1.15,
      }}
      {...rest}
    />
  );
};

type ButtonProps = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}>;

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button className="bg-blue-500 px-5 py-2 rounded text-white" {...rest}>
      {children}
    </button>
  );
};
