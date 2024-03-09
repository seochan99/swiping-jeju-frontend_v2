// hooks/useResultData.js
import { useEffect, useState } from 'react';

import { DUMMY_DATA } from '@/constants/result/placeDummy';
import { ResultData } from '@/interfaces/result/result';

const useResultData = (id: string) => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoaded(true);
      try {
        const DummyData: ResultData = DUMMY_DATA;
        setResult(DummyData);
        setIsLoaded(false);
      } catch (error) {
        console.error('Error fetching result:', error);
        setIsLoaded(false);
      }
    };

    fetchNotice();
  }, [id]);

  return { result, isLoaded };
};

export default useResultData;
