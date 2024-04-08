export type Direction = 'left' | 'right' | 'up' | 'down';

export interface API {
  swipe(dir?: Omit<Direction, 'up' | 'down'>): Promise<void>;
  restoreCard(): Promise<void>;
}

// * SwipeButton related props
export interface SwipeButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}
export interface ButtonContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// * /api/title

// export interface TitleRequest =

export interface TitleRequest {
  data: PlaceInfo[];
}

export interface PlaceInfo {
  title: string;
  keyword: string[];
  description: string;
}

export interface TitleResponse {
  result: string;
}

// * /api/description

export interface DescriptionRequest {
  title: string;
  keyword: string[];
  description: string;
}

export interface DescriptionResponse {
  result: string;
}

// * /album/create

export interface AlbumCreateRequest {
  id: number;
  title: string;
  content: string;
  likeIdList: number[];
}

export interface AlbumCreateResponse {
  status: number;
}
