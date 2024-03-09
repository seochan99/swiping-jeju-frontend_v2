import { a, SpringValue } from '@react-spring/web';
import Image from 'next/image';
import { FC } from 'react';

import { ICardData } from '@/interfaces/swipe';

import KakaoMap from './kakaoMap';

interface Props {
  place: ICardData;
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const BackCard: FC<Props> = ({ place, opacity, transform }) => {
  return (
    <a.div
      className="absolute flex size-full max-w-full flex-col items-center justify-start space-y-5  bg-[#242424] bg-cover p-8"
      style={{
        opacity,
        transform: transform.to((t) => `${t} rotateY(180deg)`),
      }}
    >
      <div className="flex w-full items-center justify-start">
        <Image
          src="/svg/locationIcon.svg"
          alt="location"
          width={40}
          height={40}
        />
        <p className="text-[34px] font-bold leading-[28px] text-white">
          {place.title}
        </p>
      </div>

      <div className="h-[160px] w-full">
        <KakaoMap place={place} />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[10px]">
        <div className="mb-[10px] flex justify-center gap-[10px]">
          {place.keyword.map((keyword, index) => (
            <p
              key={index}
              className="mb-[5px] rounded-[20px] bg-black px-[12px] py-[5px] text-[10px] leading-[19px] text-white"
            >
              {keyword}
            </p>
          ))}
        </div>
        <p className="mb-[10px] h-auto max-h-[120px] max-w-[80%] overflow-auto rounded-[10px] px-[10px] text-[16px] leading-[20px] text-gray-300">
          {place.content}
        </p>
      </div>
    </a.div>
  );
};

export default BackCard;
