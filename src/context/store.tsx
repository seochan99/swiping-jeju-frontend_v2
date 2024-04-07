import { create } from 'zustand';

import { HotPlace } from '@/interfaces/home/home';

interface AppDataState {
  id: number;
  hotPlaceList: HotPlace[];
}

interface AppDataStore {
  appData: AppDataState;
  setAppData: (data: AppDataState) => void;
}

export const useAppDataStore = create<AppDataStore>((set) => ({
  // 앱 데이터 : id, hotPlaceList, 변수명 바꿔야함
  appData: {
    id: 0,
    hotPlaceList: [],
  },
  // 셋팅
  setAppData: (data) => {
    console.log('Updating appData:', data);
    set({ appData: data });
  },
}));
