// hooks/useKeywords.ts
import { useEffect, useState } from 'react';

import * as C from '@/constants/home/keyword';
import { getRandomKeywords } from '@/utils/home/getRandomKeyword';

export const useKeywords = (initialCount: number) => {
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);

  useEffect(() => {
    const keywords = getRandomKeywords(C.KEYWORDLIST, initialCount);
    setRandomKeywords(keywords);
  }, [initialCount]);

  const refreshKeywords = (newCount: number) => {
    const keywords = getRandomKeywords(C.KEYWORDLIST, newCount);
    setRandomKeywords(keywords);
  };

  return { randomKeywords, refreshKeywords };
};
