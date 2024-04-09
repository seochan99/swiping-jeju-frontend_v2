// hooks/useResultData.js
import { useEffect, useState } from 'react';

import { DUMMY_DATA } from '@/constants/result/placeDummy';
import { ResultData } from '@/interfaces/result/result';
import { log } from '@/utils/log';

const useResultData = (id: string) => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoaded(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/album/result?id=${id}`,
        );
        const resultData: ResultData = await response.json();
        log('resultData:', resultData);
        // const DummyData: ResultData = DUMMY_DATA;
        setResult(resultData);
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
