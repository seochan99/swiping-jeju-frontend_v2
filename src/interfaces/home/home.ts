import { StaticImageData } from 'next/image';

//
export interface HomeLandingProps {
  onNext: () => void;
}

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

export interface HomeKeywordInputProps {
  swipingAlbum: SwipingAlbum;
  setSwipingAlbum: React.Dispatch<React.SetStateAction<SwipingAlbum>>;
}

// * /api/v1/cnt
export interface AlbumCountResponse {
  cnt: number;
}

// * /api/v1/album/apply

export interface AlbumApplyRequest {
  mapList: number[];
  keywordList: string[];
}

export interface AlbumResponse {
  id: number;
  hotPlaceList: HotPlace[];
}

export interface HotPlace {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  img: string;
  keywords: [string, string, string];
}
