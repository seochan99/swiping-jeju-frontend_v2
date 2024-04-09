'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

// component
import KakaoMap from '@/components/result/KakaoMap';
import KakaoShareButton from '@/components/result/KakaoShareButton';
import ResultHotplaceList from '@/components/result/ResultHotplaceList';
import useDelayedClick from '@/hooks/home/useDelayedClick';
// hook
import { useFetch } from '@/hooks/useFetch';
import { ResultData } from '@/interfaces/result/result';

const ResultDetail: React.FC = () => {
  const pathname = usePathname();

  const id = pathname.split('/').pop();

  const router = useRouter();

  const { data: result, isLoading } = useFetch<ResultData>('/album/result', {
    params: {
      id,
    },
  });
  //클릭 핸들러
  const [handleClick, isClicked] = useDelayedClick(() => {
    router.push('/');
  });

  if (isLoading) {
    // TODO: 더 나은 로딩 컴포넌트 필요할 것 같음
    return <div className="text-center">로딩중...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-11">
      <h1 className="mb-3 mt-1 text-4xl font-bold text-[#00FF66]">
        {result?.title}
      </h1>
      <Image
        src="/images/background/char_3.png"
        alt="Main image"
        width={277}
        height={155}
        className="mb-4"
      />
      <div className="text-center text-white">{result?.content}</div>
      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      {/* ---------------------------------------- 카카오 지도  ----------------------------------------*/}
      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      <KakaoMap hotplaces={result?.hotPlaceList || []} />

      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      {/* ---------------------------------------- 핫플 리스트  ----------------------------------------*/}
      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      <ResultHotplaceList hotplaces={result?.hotPlaceList || []} />

      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      {/* ---------------------------------------카카오 공유 버튼 ---------------------------------------*/}
      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      <KakaoShareButton description={result?.content || ''} />

      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      {/* ---------------------------------------- 스와이프 버튼 ----------------------------------------*/}
      {/* ---------------------------------------- ------------- ----------------------------------------*/}
      <div className="mt-20 flex items-center justify-center border-solid">
        <div
          className={`relative cursor-pointer overflow-hidden rounded-full border border-green-400 bg-white px-16 py-5 text-base font-semibold text-slate-900`}
          onClick={handleClick}
          onTouchStart={handleClick}
        >
          스와이프 하러가기
          <div
            className={`absolute right-0 top-0 ml-2 mt-2 transition-transform ease-linear ${isClicked ? 'animate-slideLeft' : ''} `}
          >
            {/* 스와이프 하러가기 margin-left: 10px; margin-top: 5px; height: 60%;
          width: 400%; left: 100%; // 시작 위 */}

            <div className="absolute mt-1.5 h-3/5 w-[400%] bg-white left-[80%] ${isClicked ? 'animate-maskSlideLeft' : ''} z-10"></div>
            <Image
              src="/images/background/nocap.png"
              alt="Character4"
              width={55}
              height={47}
              className="relative z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
