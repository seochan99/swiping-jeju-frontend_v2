import { a, SpringValue } from '@react-spring/web';
import React, { FC } from 'react';

import { HotPlace } from '@/interfaces/home/home';

interface Props {
  place: HotPlace;
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const FrontCard: FC<Props> = ({ place, opacity, transform }) => {
  return (
    <a.div
      className="absolute size-full bg-cover"
      style={{
        backgroundImage: `url(${place.img})`,
        opacity: opacity.to((o) => 1 - o),
        transform,
      }}
    >
      <div className="absolute bottom-[150px] flex w-full flex-col gap-6 px-4">
        <div className="flex items-center justify-start">
          <p className="text-3xl font-bold text-white">{place.title}</p>
        </div>
        <div>
          {place.keywords.map((keyword, index) => (
            <p
              key={index}
              className="m-2 inline rounded-full bg-white px-2 py-1 text-sm text-black"
            >
              {keyword}
            </p>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent" />
    </a.div>
  );
};

export default FrontCard;
