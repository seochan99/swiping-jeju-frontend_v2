import '../styles/reset.css';
import '../styles/globals.css';

import clsx from 'clsx';
import Script from 'next/script';

import { NotoSans } from './fonts';

export const metadata = {
  title: '스와이프 제주',
  description: '나만의 방문지를 스와이프로 선택해보세요!',
  openGraph: {
    title: '스와이프 제주',
    siteName: '스와이프 제주',
    description: '나만의 방문지를 스와이프로 선택해보세요!',
    type: 'website',
    url: 'https://jeju.swiping.kr',
    images: ['/images/og_image.png'],
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="flex w-screen justify-center bg-[#fff]">
      <body
        className={clsx(
          [NotoSans.className],
          ['min-h-screen w-full max-w-[430px]'],
          ['shadow-xl'],
          ['bg-[#050014]'],
          ['text-white'],
        )}
      >
        {children}
        <div id="modal-root" />
        {/* Load Kakao Maps SDK */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        {/* Load Kakao JavaScript SDK */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />
        {/* Load Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2869869359027632"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
