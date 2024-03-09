import { useCallback, useEffect, useState } from 'react';

// 딜레이 클릭 훅
function useDelayedClick(
  onNext: () => void,
  delay: number = 1000,
): [() => void, boolean] {
  // 클릭 상태
  const [isClicked, setIsClicked] = useState(false);
  // 클릭 핸들러
  const handleClick = useCallback(() => {
    // 클릭 상태 변경
    setIsClicked(true);
  }, []);

  // 클릭 상태 변경 시 다음으로 넘어가는 함수 호출
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isClicked) {
      // 딜레이 후 다음으로 넘어가는 함수 호출
      timeoutId = setTimeout(() => {
        onNext();
        setIsClicked(false);
      }, delay);
    }

    // 클릭 상태 변경 시 타임아웃 제거
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isClicked, onNext, delay]);

  return [handleClick, isClicked];
}

export default useDelayedClick;
