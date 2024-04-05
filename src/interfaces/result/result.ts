interface Hotplace {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  img: string;
  keywords: string[];
  view: number;
  like: number;
  dislike: number;
}

export interface KakaoMapProps {
  hotplaces: Hotplace[];
}

export interface ResultData {
  id: number;
  title: string;
  content: string;
  hotPlaceList: Hotplace[];
}

export interface ResultHotplaceListProps {
  hotplaces: Hotplace[];
}
