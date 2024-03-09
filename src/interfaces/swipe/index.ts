export interface ICardData {
  title: string;
  img: string;
  lng: number;
  lat: number;
  content: string;
  keyword: string[];
  placeId: string;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export interface API {
  swipe(dir?: Direction): Promise<void>;
  restoreCard(): Promise<void>;
}
