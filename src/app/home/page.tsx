'use client';

import React, { useEffect, useState } from 'react';

import HomeLanding from '@/components/home/HomeLanding';
import HomeMapSelection from '@/components/home/HomeMapSelection';
import { SwipingAlbum } from '@/interfaces/home/home';

function Home(): JSX.Element {
  const [step, setStep] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [swipingAlbum, setSwipingAlbum] = useState<SwipingAlbum>({
    title: '',
    mapList: [],
  });

  console.log(swipingAlbum);
  // 스텝 변경시 애니메이션 효과
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 1000);
    setAnimate(true);
    return () => clearTimeout(timeoutId);
  }, [step]);

  // 다음 스텝으로 넘어가는 함수
  const handleNext = (): void => {
    setStep((prevStep) => prevStep + 1);
  };

  // 처음 접속시 로컬스토리지에 isFirst 값이 없으면 true로 설정
  useEffect(() => {
    if (localStorage.getItem('isFirst') === null) {
      localStorage.setItem('isFirst', 'true');
    }
  }, []);

  return (
    <>
      <div className={`mt-12 ${animate ? 'animate-fadeIn' : ''} bg-[#050014]`}>
        {step === 0 && <HomeLanding onNext={handleNext} />}
        {step === 1 && (
          <HomeMapSelection
            onNext={handleNext}
            setSwipingAlbum={setSwipingAlbum}
          />
        )}
        {/* {step === 2 && (
          <HomeStyleInput
            swipingAlbum={swipingAlbum}
            setSwipingAlbum={setSwipingAlbum}
          />
        )} */}
      </div>
    </>
  );
}

export default Home;
