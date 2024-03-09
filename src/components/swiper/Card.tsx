import { useSpring } from '@react-spring/web';
import React, { forwardRef, useState } from 'react';
import TinderCard from 'react-tinder-card';

import { API, Direction, ICardData } from '@/interfaces/swipe';

import BackCard from './BackCard';
import FrontCard from './FrontCard';

interface Props {
  place: ICardData;
  swiped: (dir: Direction, placeId: string, index: number) => void;
  outOfFrame: (placeId: string, index: number) => void;
  index: number;
}
export type Ref = API;

const Card = forwardRef<Ref, Props>(
  ({ place, swiped, outOfFrame, index }, ref) => {
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 },
    });

    const handleOnSwiper = (dir: Direction) => {
      swiped(dir, place.placeId, index);
      setFlipped(false);
    };

    const handleOnCardLeftScreen = () => {
      outOfFrame(place.placeId, index);
      setFlipped(false);
    };

    return (
      <TinderCard
        className="absolute flex size-full items-center justify-center"
        onSwipe={handleOnSwiper}
        onCardLeftScreen={handleOnCardLeftScreen}
        ref={ref}
      >
        <div
          className="relative flex size-full justify-center"
          onClick={() => setFlipped((prev) => !prev)}
          onTouchEnd={() => setFlipped((prev) => !prev)}
        >
          <BackCard place={place} opacity={opacity} transform={transform} />
          <FrontCard place={place} opacity={opacity} transform={transform} />
        </div>
      </TinderCard>
    );
  },
);

Card.displayName = 'Card';

export default Card;
