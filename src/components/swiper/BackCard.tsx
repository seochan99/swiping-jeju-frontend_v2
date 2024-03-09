import Image from 'next/image';
import React, { FC } from 'react';

import { ICardData } from '@/interfaces/swipe';

import KakaoMap from './kakaoMap';

interface Props {
  place: ICardData;
}

const BackCard: FC<Props> = ({ place }) => {
  return (
    <>
      <div className="h-calc(100vh - 116px) p-80px p-20px absolute flex w-full max-w-full flex-col items-center justify-start gap-20 rounded-lg bg-gray-900 bg-cover">
        <div className="flex w-full items-center justify-start"></div>
        <Image
          src="/svg/locationIcon.svg"
          alt="location"
          width={40}
          height={40}
        />
        <p className="leading-28px text-[34px] font-bold text-white">
          {place.title}
        </p>
      </div>

      <div className="absolute top-[20px] flex w-full justify-start px-[20px]">
        <button className="whitespace-nowrap border-none bg-none p-0">
          <Image src="/svg/undo.svg" alt="close" width={30} height={30} />
        </button>
      </div>

      <div className="h-167px w-full">
        <KakaoMap place={place} />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[10px]">
        <div className="mb-[10px] flex justify-center gap-[10px]">
          {place.keyword.map((keyword, index) => (
            <p
              key={index}
              className="leading-19px mb-5px px-12px py-5px rounded-20px bg-black text-[10px] text-white"
            >
              {keyword}
            </p>
          ))}
        </div>
        <p className="mb-[10px] h-auto max-h-[120px] max-w-[80%] overflow-auto rounded-[10px] px-[10px] text-[16px] leading-[20px] text-gray-300">
          {place.content}
        </p>
      </div>
    </>
  );
};

export default BackCard;
