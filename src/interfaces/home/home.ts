import { StaticImageData } from 'next/image';

// 앨범 정보
export interface SwipingAlbum {
  title: string;
  mapList: number[];
}

// 지도 이미지 매핑
export interface MapImageMapping {
  [key: string]: StaticImageData;
}

// 지도 옵션
export interface HomeMapSelectionProps {
  onNext: () => void;
  setSwipingAlbum: React.Dispatch<React.SetStateAction<SwipingAlbum>>;
}

export interface MapOption {
  id: number;
  name: string;
  status: 'enabled' | 'disabled';
}
