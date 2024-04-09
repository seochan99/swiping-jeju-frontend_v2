import { create } from 'zustand';

import { HotPlace } from '@/interfaces/home/home';
import { log } from '@/utils/log';

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
    log('Updating appData:', data);
    set({ appData: data });
  },
}));
