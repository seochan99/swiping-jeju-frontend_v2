import { StaticImageData } from 'next/image';

import * as C from '@/constants/home/home';

import Map0 from '../../../public/images/map/map_0.png';

// 지도 이미지 선택 함수
export const selectMapImage = (selectedMaps: number[]): StaticImageData => {
  // 선택된 맵 ID 정렬
  const sortedSelectedMapIds = selectedMaps.sort((a, b) => a - b);
  // 정렬된 ID를 문자열로 결합
  const selectedMapIdsString = sortedSelectedMapIds.join('');
  // 매핑된 이미지 찾기
  const selectedMapImage = C.MAPIMAGESMAPPINGS[selectedMapIdsString];

  // console.log(`선택된 지도 리스트 ${selectedMapIdsString}`);
  // console.log(selectedMapImage);

  return selectedMapImage || Map0; // 기본 이미지로 Map0을 사용
};
