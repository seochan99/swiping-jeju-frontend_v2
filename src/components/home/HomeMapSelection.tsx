import Image from 'next/image';
import React from 'react';

import * as C from '@/constants/home/map'; // 상수
import { useMapSelection } from '@/hooks/home/useMapSelection'; // 지도 선택 훅
import * as I from '@/interfaces/home/home'; // 인터페이스
import { updateSwipingAlbumAndProceed } from '@/utils/home/updateSwipingAlbumAndProceed'; // 앨범 업데이트 및 진행 함수

// 지도 선택 컴포넌트
const HomeMapSelection: React.FC<I.HomeMapSelectionProps> = ({
  onNext,
  setSwipingAlbum,
}) => {
  // useMapSelection 훅 사용
  // 선택된 지도 리스트, 선택된 이미지, 지도 선택 토글 함수
  const [selectedMaps, selectedImage, toggleMapSelection] = useMapSelection();

  return (
    <>
      <div className="relative flex size-full flex-col items-center justify-center p-11">
        {/* --------------------------------------------------------- */}
        {/* ----------------------------TTILE ---------------------- */}
        {/* --------------------------------------------------------- */}
        <div className="mb-12 mt-4 flex w-full justify-start">
          <h1 className="text-4xl font-bold text-white">
            원하는 <span className="text-[#00FF66]">장소</span>를
            <br />
            선택하세요
          </h1>
        </div>
        {/* --------------------------------------------------------- */}
        {/* ----------------------------MAP ---------------------- */}
        {/* --------------------------------------------------------- */}
        <div className="relative flex h-64 w-full items-center justify-center">
          {/* --------------------click Potiner ---------------------- */}
          <div
            className="absolute cursor-pointer bg-transparent"
            style={{ top: '35%', left: '90%', width: '30px', height: '30px' }}
            onClick={() => toggleMapSelection(C.MAPOPTIONS[3])}
          ></div>
          {/* --------------------map Image ---------------------- */}
          <Image src={selectedImage} alt="Selected Jeju Map" height={260} />
        </div>
        {/* --------------------------------------------------------- */}
        {/* -----------------------Choice List ---------------------- */}
        {/* --------------------------------------------------------- */}
        <div className="mt-4 grid w-full grid-cols-4 gap-2.5">
          {selectedMaps.map((selectedMap) => (
            <div
              key={selectedMap.id}
              className={`mt-5 flex h-7 w-16 items-center justify-center border ${
                selectedMap.status === 'disabled'
                  ? 'border-gray-400 bg-black'
                  : 'border-green-500 bg-[#80FFB2]'
              } cursor-pointer rounded-full text-sm font-semibold text-gray-800`}
              onClick={() => toggleMapSelection(selectedMap)}
            >
              {selectedMap.name}
            </div>
          ))}
        </div>
        {/* --------------------------------------------------------- */}
        {/* -----------------------Button List ---------------------- */}
        {/* --------------------------------------------------------- */}
        <div className="mt-11 grid w-full grid-cols-4 gap-2.5">
          {C.MAPOPTIONS.map((map) => (
            <div
              key={map.id}
              className={`flex h-7 items-center justify-center border text-gray-800 ${selectedMaps.some((selectedMap) => selectedMap.id === map.id) ? 'border-green-500 bg-[#80FFB2]' : map.status === 'disabled' ? 'border-gray-400 bg-gray-700 text-gray-300' : 'border-gray-400 bg-white '} cursor-pointer rounded-full text-sm font-semibold`}
              onClick={() => toggleMapSelection(map)}
            >
              {map.name}
            </div>
          ))}
        </div>

        {/* --------------------------------------------------------- */}
        {/* -----------------------Next Button ---------------------- */}
        {/* --------------------------------------------------------- */}
        <div className="mt-8 flex w-full items-center justify-center">
          <button
            className="mt-4 h-12 w-full cursor-pointer rounded-lg border border-[#00FF66] bg-[#80FFB2] text-center text-base font-bold text-gray-800"
            onClick={() =>
              updateSwipingAlbumAndProceed(
                selectedMaps,
                setSwipingAlbum,
                onNext,
              )
            }
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeMapSelection;
