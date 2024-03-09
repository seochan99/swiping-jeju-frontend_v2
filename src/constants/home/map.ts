import * as I from '@/interfaces/home/home';

import Map0 from '../../../public/images/map/map_0.png';
import Map4 from '../../../public/images/map/map_4.png';
import Map45 from '../../../public/images/map/map_4_5.png';
import Map456 from '../../../public/images/map/map_4_5_6.png';
import Map4567 from '../../../public/images/map/map_4_5_6_7.png';
import Map457 from '../../../public/images/map/map_4_5_7.png';
import Map46 from '../../../public/images/map/map_4_6.png';
import Map467 from '../../../public/images/map/map_4_6_7.png';
import Map47 from '../../../public/images/map/map_4_7.png';
import Map5 from '../../../public/images/map/map_5.png';
import Map56 from '../../../public/images/map/map_5_6.png';
import Map567 from '../../../public/images/map/map_5_6_7.png';
import Map57 from '../../../public/images/map/map_5_7.png';
import Map6 from '../../../public/images/map/map_6.png';
import Map67 from '../../../public/images/map/map_6_7.png';
import Map7 from '../../../public/images/map/map_7.png';
// 지도 이미지
export const MAPIMAGESMAPPINGS: I.MapImageMapping = {
  0: Map0,
  45: Map45,
  456: Map456,
  4567: Map4567,
  457: Map457,
  46: Map46,
  467: Map467,
  47: Map47,
  4: Map4,
  5: Map5,
  56: Map56,
  567: Map567,
  57: Map57,
  6: Map6,
  67: Map67,
  7: Map7,
};

export const MAPOPTIONS: I.MapOption[] = [
  { id: 1, name: '제주시', status: 'disabled' },
  { id: 2, name: '조천읍', status: 'disabled' },
  { id: 3, name: '구좌읍', status: 'disabled' },
  { id: 4, name: '성산읍', status: 'enabled' },
  { id: 5, name: '표선면', status: 'enabled' },
  { id: 6, name: '남원읍', status: 'enabled' },
  { id: 7, name: '서귀포', status: 'enabled' },
  { id: 8, name: '중문', status: 'disabled' },
  { id: 9, name: '안덕면', status: 'disabled' },
  { id: 10, name: '대정읍', status: 'disabled' },
  { id: 11, name: '한경면', status: 'disabled' },
  { id: 12, name: '한림읍', status: 'disabled' },
  { id: 13, name: '애월읍', status: 'disabled' },
];
