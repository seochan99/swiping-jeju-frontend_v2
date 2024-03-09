'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import NextButton from '@/components/common/NextButton';

const NotFoundPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push(`/`);
  };
  return (
    <div className="mx-5 flex h-[90%] flex-col items-center justify-center">
      <div className="text-2xl font-bold text-green-500">NOT FOUND!</div>
      <Image
        className="w-32"
        width={200}
        height={200}
        src={'/images/not-found.png'}
        alt="logo"
      />
      <div className="text-center text-base font-normal leading-6 text-gray-600">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 확인해주세요.
      </div>
      <div className="mx-5">
        <NextButton onClick={goHome} text={'홈으로'} />
      </div>
    </div>
  );
};

export default NotFoundPage;
