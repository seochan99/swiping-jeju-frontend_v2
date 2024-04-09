import { ResultData } from '@/interfaces/result/result';

export const DUMMY_DATA: ResultData = {
  // 앨범 아이디, 쿼리 아이디
  id: 3,
  // ai가 만들어주는 제목
  title: '성산이 만든 제주도',
  // ai가 만들어주는 내용물
  content:
    '너의 여행 리스트를 보니까 산, 바다, 카페라는 여행 목적에 아주 잘 부합하고 있어!\n만장굴에서는 자연 속 아름다운 산의 경관을, 중문 색달 해변과 섭지코지에서는 아름다운 바다..',
  // 핫플레이스 지도 위도 경도 리스트
  hotPlaceList: [
    {
      id: 1,
      title: '성산일출봉',
      lat: 33.45914752593695,
      lng: 126.94039767700909,
      img: '/',
      description: '성산일출봉에서는 아름다운 바다와 일출을 만끽할 수 있어.',
      keywords: ['일출', '바다', '산'],
      view: 0,
      like: 0,
      dislike: 0,
    },
    {
      id: 2,
      title: '성산일출봉 아시횟집',
      lat: 33.4652923722517,
      lng: 126.93234696830558,
      img: '/',
      description: '성산일출봉에서는 아름다운 바다와 일출을 만끽할 수 있어.',
      keywords: ['일출', '바다', '산'],
      view: 0,
      like: 0,
      dislike: 0,
    },
    {
      id: 3,
      title: '우도 잠수함',
      lat: 33.471982703373556,
      lng: 126.93307332647784,
      img: '/',
      description: '성산일출봉에서는 아름다운 바다와 일출을 만끽할 수 있어.',
      keywords: ['일출', '바다', '산'],
      view: 0,
      like: 0,
      dislike: 0,
    },
    {
      id: 4,
      title: '성산 포항',
      lat: 33.47362374548788,
      lng: 126.9332872326622,
      img: '/',
      description: '성산일출봉에서는 아름다운 바다와 일출을 만끽할 수 있어.',
      keywords: ['일출', '바다', '산'],
      view: 0,
      like: 0,
      dislike: 0,
    },
  ],
};
