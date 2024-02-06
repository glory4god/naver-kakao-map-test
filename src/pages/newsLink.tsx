import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChapterPage({}) {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) router.replace(url as string);
  }, [url]);

  return <div className="bg-white h-full min-h-screen pt-10"></div>;
}
