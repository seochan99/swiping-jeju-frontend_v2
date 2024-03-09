import { a, SpringValue } from '@react-spring/web';
import React, { FC } from 'react';

import { ICardData } from '@/interfaces/swipe';

interface Props {
  place: ICardData;
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const FrontCard: FC<Props> = ({ place, opacity, transform }) => {
  return (
    <a.div
      className="absolute rounded-lg"
      style={{
        backgroundImage: `url(${place.img})`,
        backgroundSize: 'cover',
        width: '100%',
        maxWidth: '100%',
        height: 'calc(100vh - 116px)',
        opacity: opacity.to((o) => 1 - o),
        transform,
      }}
    >
      <div className="h-100px bg-gradient-to-top absolute bottom-0 w-full from-black via-transparent"></div>
      <div className="bottom-25% left-10% absolute flex flex-col gap-20">
        <div className="flex items-center justify-start">
          <p className="text-3xl font-bold text-white">{place.title}</p>
        </div>
        <div>
          {place.keyword.map((keyword, index) => (
            <p
              key={index}
              className="m-2 inline rounded-full bg-white px-4 py-2"
            >
              {keyword}
            </p>
          ))}
        </div>
      </div>
    </a.div>
  );
};

export default FrontCard;
