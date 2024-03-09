import Image from 'next/image';
import React, { useEffect } from 'react';

import { SHARE_SNS_IMG_SRC } from '@/constants/result/shareSnsImageSrc';

// Define interfaces for the Kakao SDK parts we interact with
interface KakaoSDK {
  init: (apiKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: KakaoShareOptions) => void;
  };
}

interface KakaoShareOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

interface KakaoShareButtonProps {
  description: string;
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ description }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (
      window.Kakao &&
      !window.Kakao.isInitialized() &&
      process.env.NEXT_PUBLIC_KAKAO_API_KEY
    ) {
      console.log('Kakao SDK initialized' + window.Kakao);
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK not found');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '스와이핑 제주',
        description,
        imageUrl:
          'https://velog.velcdn.com/images/seochan99/post/d0181e19-d4bf-4e1b-bafa-9948e1ccc067/image.png',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '나도 하러가기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  return (
    <div className="my-8 flex flex-row items-center justify-center gap-4">
      {Object.values(SHARE_SNS_IMG_SRC).map((image, index) => (
        <div key={index} onClick={handleShare} className="cursor-pointer">
          <Image src={image} width={40} height={40} alt="Share icon" />
        </div>
      ))}
    </div>
  );
};

export default KakaoShareButton;
