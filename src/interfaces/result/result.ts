interface Hotplace {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface KakaoMapProps {
  hotplaces: Hotplace[];
}

export interface ResultData {
  id: number;
  title: string;
  content: string;
  hotPlace: Hotplace[];
}

export interface ResultHotplaceListProps {
  hotplaces: Hotplace[];
}
