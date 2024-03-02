/* eslint-disable @next/next/no-sync-scripts */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <div className="max-w-3xl mx-auto shadow-lg py-10 px-4 h-full min-h-screen bg-white">
        <Component {...pageProps} />
      </div>
    </>
  );
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const Head = () => {
  return (
    <NextHead>
      <script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
      />
      <meta
        name="naver-site-verification"
        content="888611dfbcbefb9a66285b309dd029f8c8c226a9"
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta property="locale" content="ko_KR" />

      <meta property="og:title" content={'지도'} />
      <meta property="og:site-name" content={'지도'} />
      <meta property="og:url" content={'https://building-info.vercel.app/'} />
      <meta property="og:type" content={'website'} />
      <meta property="og:description" content={'지도에서 찾아보세요!'} />
      <meta name="title" content={'지도'} />
      <meta name="description" content={'지도에서 찾아보세요!'} />
    </NextHead>
  );
};
