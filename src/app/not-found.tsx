'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="mx-5 flex w-80 flex-col items-center justify-center">
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
      <button
        className="mt-5 w-full cursor-pointer rounded-lg bg-green-500 py-2 text-white"
        onClick={() => {
          router.push(`/`);
        }}
      >
        홈으로
      </button>
    </div>
  );
};

export default NotFoundPage;
