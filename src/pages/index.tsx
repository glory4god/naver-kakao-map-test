import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

interface News {
  title: string;
  link: string;
  description: string;
  originallink: string;
  pubDate: string;
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

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
        <div className="mt-4"></div>
        <Button disabled={loading} onClick={() => onSearch(keyowrd)}>
          검색
        </Button>
      </div>
      <div className="mt-4">
        {loading && <p className="px-4">loading...</p>}
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
        'h-auto font-bold cursor-pointer px-4 py-3 transition-all flex w-full forceHover justify-between border-b'
      }>
      <div className="">
        <div className="text-xs flex items-center justify-between text-gray-700">
          <p className="whitespace-pre-line">
            {(news.originallink.split(/\/\/|\//)[1] ?? '').replace(/www./, '')}
          </p>
          <p>{getDateTime(news.pubDate)}</p>
        </div>
        <h3
          className="text-sm mt-2"
          dangerouslySetInnerHTML={{ __html: news.title }}
        />
        <p
          className="text-xs my-1.5 text-gray-600"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(news.originallink);
              window.alert('링크가 복사되었습니다.');
            }}>
            <Image
              className="rounded"
              src={'/clipboard.png'}
              width={34}
              height={34}
              alt="카카오톡 공유"
            />
          </button>
          <KakaotalkShare
            url={news.originallink}
            title={news.title}
            description={news.description}
          />
        </div>
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

const getDateTime = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};

interface KakaoShare {
  url: string;
  title: string;
  description?: string;
}
const KakaotalkShare = (share: KakaoShare) => {
  const shareKakao = async ({ url, title, description }: KakaoShare) => {
    const newLink = `https://search-naver-news.vercel.app/newsLink?url=${url}`;
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_JS_KEY);
      }

      const link = await fetch(`/api/getThumbnail?url=${url}`).then((res) =>
        res.json(),
      );
      kakao.Share.sendDefault({
        // objectType: 'text',
        // text: title,
        // link: {
        //   mobileWebUrl: url,
        //   webUrl: url,
        // },
        objectType: 'feed',
        content: {
          title,
          description: description || '',
          imageUrl: link,
          link: {
            mobileWebUrl: newLink,
            webUrl: newLink,
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: newLink,
              webUrl: newLink,
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.integrity =
      'sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        shareKakao(share);
      }}>
      <Image
        className="rounded"
        src={'/kakaotalk.png'}
        width={32}
        height={32}
        alt="카카오톡 공유"
      />
    </button>
  );
};
