import { createRef, RefObject, useMemo, useRef, useState } from 'react';

import { API, Direction } from '@/interfaces/swipe';

export const useSwipe = <T>(items: T[]) => {
  const [idArray, setIdArray] = useState<string[]>([]);
  const [lastDirection, setLastDirection] =
    useState<Omit<Direction, 'up' | 'down'>>();
  const [currentIndex, setCurrentIndex] = useState(items.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const isFirstCard = currentIndex < items.length - 1;
  const isLastCard = currentIndex >= 0;
  const cardRefs: RefObject<API>[] = useMemo(
    () =>
      Array(items?.length)
        .fill(0)
        .map(() => createRef()),
    [items],
  );

  const handleCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const handleUndoSwipe = async () => {
    if (!isFirstCard) return;
    const newIndex = currentIndex + 1;
    handleCurrentIndex(newIndex);
    await cardRefs[newIndex].current?.restoreCard();
    setIdArray((prev) => prev.slice(0, -1));
  };

  const swiped = async (
    direction: Omit<Direction, 'up' | 'down'>,
    placeId: string,
    index: number,
  ) => {
    setLastDirection(direction);
    handleCurrentIndex(index - 1);
    if (direction === 'right') {
      setIdArray((prev) => [...prev, placeId]);
    }
  };

  const handleSwipe = async (dir: Omit<Direction, 'up' | 'down'>) => {
    if (isLastCard && currentIndex < items?.length) {
      await (cardRefs[currentIndex].current as API).swipe(dir);
    }
  };

  const outOfFrame = (placeId: string, idx: number) => {
    currentIndexRef.current >= idx && cardRefs[idx].current?.restoreCard();
  };

  return {
    currentIndex,
    currentIndexRef,
    setCurrentIndex,
    handleCurrentIndex,
    handleUndoSwipe,
    swiped,
    handleSwipe,
    outOfFrame,
    cardRefs,
    idArray,
    swipeState: {
      currentIndex,
      isFirstCard,
      isLastCard,
      lastDirection,
    },
  };
};
