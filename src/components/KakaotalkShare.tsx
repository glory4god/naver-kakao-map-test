import Image from 'next/image';
import { useEffect } from 'react';

interface KakaoShare {
  url: string;
  title: string;
  description?: string;
}
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

export const KakaotalkShare = (share: KakaoShare) => {
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
