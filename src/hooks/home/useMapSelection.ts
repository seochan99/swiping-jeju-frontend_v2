import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

import * as I from '@/interfaces/home/home';
import { selectMapImage } from '@/utils/home/mapUtils';

// 지도 선택 커스텀 훅
export const useMapSelection = (
  initialMap?: I.MapOption,
): [I.MapOption[], StaticImageData, (map: I.MapOption) => void] => {
  // 선택된 지도 리스트
  const [selectedMaps, setSelectedMaps] = useState<I.MapOption[]>(
    initialMap ? [initialMap] : [],
  );
  // 선택된 이미지
  const [selectedImage, setSelectedImage] = useState<StaticImageData>(
    selectMapImage(selectedMaps.map((map) => map.id)),
  );

  // 선택된 지도 리스트 변경 시 이미지 변경
  useEffect(() => {
    const mapIds = selectedMaps.map((map) => map.id);
    const newSelectedImage = selectMapImage(mapIds);
    setSelectedImage(newSelectedImage);
  }, [selectedMaps]);

  // 지도 선택 토글 함수
  const toggleMapSelection = (map: I.MapOption): void => {
    // 비활성화된 지도는 선택 불가
    if (map.status === 'disabled') return;
    // 선택된 지도 리스트에 추가 또는 제거
    setSelectedMaps((currentMaps) => {
      const isAlreadySelected = currentMaps.some(
        (selectedMap) => selectedMap.id === map.id,
      );
      // 이미 선택된 지도라면 제거
      if (isAlreadySelected) {
        return currentMaps.filter((selectedMap) => selectedMap.id !== map.id);
      } else {
        // 선택되지 않은 지도라면 추가
        return [...currentMaps, map];
      }
    });
  };
  // 선택된 지도 리스트, 선택된 이미지, 지도 선택 토글 함수 반환
  return [selectedMaps, selectedImage, toggleMapSelection];
};
