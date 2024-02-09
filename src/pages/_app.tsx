import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <div className="max-w-3xl mx-auto shadow-lg">
        <Component {...pageProps} />;
      </div>
    </>
  );
}

const Head = () => {
  return (
    <NextHead>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta property="locale" content="ko_KR" />

      <meta property="og:title" content={'광진구청 홍보담당관'} />
      <meta
        property="og:image"
        content={
          'https://exambomb-bucket.s3.ap-northeast-2.amazonaws.com/newsScrap.png'
        }
      />
      <meta property="og:site-name" content={'광진구청 홍보담당관'} />
      <meta
        property="og:url"
        content={'https://search-naver-news.vercel.app'}
      />
      <meta property="og:type" content={'website'} />
      <meta property="og:description" content={'소통하며 발전하는 행복 광진'} />
      <meta name="title" content={'광진구청 홍보담당관'} />
      <meta name="description" content={'소통하며 발전하는 행복 광진'} />
    </NextHead>
  );
};
