// utils/useSwipingAlbum.ts or hooks/useSwipingAlbum.ts
import * as I from '@/interfaces/home/home';

export const updateSwipingAlbumAndProceed = (
  selectedMaps: I.MapOption[],
  setSwipingAlbum: React.Dispatch<React.SetStateAction<I.SwipingAlbum>>,
  onNext: () => void,
): void => {
  // 선택된 지도가 없을 경우
  if (selectedMaps.length === 0) {
    alert('지도를 선택해주세요');
    return;
  }

  // 선택된 지도 ID 리스트
  const selectedMapIds: number[] = selectedMaps.map((map) => map.id);

  // 선택된 지도 ID 리스트로 앨범 정보 업데이트
  setSwipingAlbum((prevAlbum: I.SwipingAlbum) => ({
    ...prevAlbum,
    mapList: selectedMapIds,
  }));

  // 다음 스텝으로 넘어가기
  onNext();
};
