import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface HomeLandingProps {
  onNext: () => void;
}

const HomeLanding: React.FC<HomeLandingProps> = ({ onNext }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const timeoutId = setTimeout(() => {
        onNext();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isClicked, onNext]);

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center pt-10">
        <Image
          src="/images/ReadMeLogo.png"
          alt="Logo"
          width={258}
          height={157}
        />
      </div>
      <div className="mt-5 flex w-full items-center justify-center text-white">
        <p>
          원하는 장소를 스와이프 하여
          <br /> 나만의 핀을 만들어 보세요
        </p>
      </div>
      <div className="mt-16 flex items-center justify-center">
        <Image
          src="/images/background/char_3.png"
          alt="Character3"
          width={277}
          height={155}
        />
      </div>
      <div className="mt-16 flex items-center justify-center border-solid">
        <div
          className={`relative cursor-pointer overflow-hidden rounded-full border border-green-400 bg-white px-16 py-5 text-base font-semibold text-slate-900`}
          onClick={handleClick}
          onTouchStart={handleClick}
        >
          스와이프 하러가기
          <div
            className={`absolute left-0 top-0 ml-2 mt-2 transition-transform ease-linear ${isClicked ? 'animate-slideRight' : ''}`}
          >
            <div className="absolute mt-1.5 h-3/5 w-[300%] bg-white -left-[300%] ${isClicked ? 'animate-maskSlideRight' : ''}"></div>
            <Image
              src="/images/background/nocap.png"
              alt="Character4"
              width={55}
              height={47}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <p className="text-center text-base font-medium text-white">
          29개의 앨범이 탄생했어요!
        </p>
      </div>
    </>
  );
};

export default HomeLanding;
