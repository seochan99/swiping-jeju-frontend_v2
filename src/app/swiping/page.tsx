'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Card from '@/components/swiper/Card';
import SwipeButton from '@/components/swiper/SwipeButton';
import { useSwipe } from '@/hooks/swipe/useSwipe';
import { ICardData } from '@/interfaces/swipe';
import Dislike from '@/svg/dislike.svg';
import Navigation from '@/svg/fork_right.svg';
import Like from '@/svg/like.svg';
import Submit from '@/svg/swipe_complete.svg';
import { openKakaoMap } from '@/utils/swipe/openKakaoMap';

const db: ICardData[] = [
  {
    title: '성산어물정',
    img: '/images/0.jpeg',
    lng: 126.917306236842,
    lat: 33.4395648227551,
    content: `성산일출봉과 섭지코지 사이에 위치한 저희 제주 어물전은 제주도 특산물인 고등어회,딱새우회, 제주 갈치회 전문점으로 싱싱한 활어회와 함께 푸짐한 한상을 준비하였습니다. 주차 편의시설 또한 넓어서 불편함 없이 이용가능하십니다.`,
    keyword: ['성산일출봉', '전통시장', '해변'],
    placeId: '1',
  },
  {
    title: '어조횟집',
    img: '/images/1.jpeg',
    lng: 126.930809833027,
    lat: 33.4604386103906,
    content: `제주도 맛집 리스트 고민중이셨나요??
    제주 동쪽 가볼만한 곳 검색 후
    성산일출봉을 일정에 추가하셨다면
    꼭 방문해야할 성신맛집입니다!`,
    keyword: ['먹거리', '전통시장', '감귤체험'],
    placeId: '2',
  },
  {
    title: '호랑호랑카페',
    img: '/images/2.jpeg',
    lng: 126.921633330756,
    lat: 33.4495800115369,
    content: `제주도 핫플레이스 루프탑카페 ! 성산일출봉 오션뷰 카페 호랑호랑 입니다.
    전용비치를 보유하고있어 낮에는 포근한 햇살과, 밤에는 은은한 조명의 야경이 아름다운곳 입니다`,
    keyword: ['카페', '테마파크', '포토스팟'],
    placeId: '3',
  },
  {
    title: '삼다도식당',
    img: '/images/3.jpeg',
    lng: 126.915845324691,
    lat: 33.4484446960871,
    content: `성산일출봉근처에 위치한 갈치,고등어요리 전문점입니다!
    내 가족들이 먹는다고 생각하고 항상 깨끗하게 재료 손질하여 안심하고 드실 수 있습니다.
    지역주민들이 더 추천하는 로컬맛집!! 밑반찬최고!! 갈치조림맛집을 찾는다면 '삼다도식당'으로 오세요.`,
    keyword: ['먹거리', '전통시장', '한라산'],
    placeId: '4',
  },
];

function SwipePage() {
  const {
    handleUndoSwipe,
    swiped,
    handleSwipe,
    outOfFrame,
    cardRefs,
    swipeState: { isFirstCard, isLastCard, currentIndex },
  } = useSwipe<ICardData>(db);

  const route = useRouter();

  // const [isComplete, setIsComplete] = useState(false);
  // const [isRunout, setIsRunout] = useState(false);
  // const [isFirst, setIsFirst] = useState(false);

  // useEffect(() => {
  //   if (!canSwipe) {
  //     setIsRunout(true);
  //   }
  // }, [currentIndex]);

  // const handleMakeList = async () => {}
  //   setIsComplete(false);
  //   setIsRunout(false);

  //   setTimeout(() => {
  //     console.log('placeId', placeId);
  //   }, 2000);
  // };

  const handleOpenKakaoMap = async () => {
    const { lat, lng, title } = db[currentIndex];
    openKakaoMap(lat, lng, title);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between p-4">
        <button className="h-12 w-40" onClick={() => route.push('/')}>
          <Image
            src="/images/nav_logo.png"
            width={140}
            height={40}
            alt="nav_logo"
          />
        </button>
        {isFirstCard ? (
          <button
            type="button"
            onClick={async () => await handleUndoSwipe()}
            className="size-12 bg-black"
          >
            <Image
              src="/svg/undo_white.svg"
              alt="like"
              width={25}
              height={25}
            />
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* // * ---------- Swipe Card Deck ---------- */}
      <div className="relative flex flex-1 items-center justify-center">
        {isLastCard ? (
          db.map((place: ICardData, index) => (
            <Card
              key={place.title}
              ref={cardRefs[index]}
              place={place}
              swiped={swiped}
              outOfFrame={outOfFrame}
              index={index}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-2xl text-white">선택이 모두 완료되었습니다.</p>
          </div>
        )}

        {/* //  * -------- Swipe Button ------------ */}
        <div className="absolute bottom-[50px] flex w-full items-center justify-center space-x-4 ">
          <SwipeButton
            type="button"
            className="!size-[52px]"
            onClick={handleOpenKakaoMap}
          >
            <Navigation />
          </SwipeButton>
          <SwipeButton type="button" onClick={() => handleSwipe('left')}>
            <Dislike className="scale-125" />
          </SwipeButton>
          <SwipeButton type="button" onClick={() => handleSwipe('right')}>
            <Like className="scale-125" />
          </SwipeButton>
          <SwipeButton
            type="button"
            className="!size-[52px]"
            // onClick={() => setIsComplete(true)}
          >
            <Submit />
          </SwipeButton>
        </div>
      </div>
    </div>
  );
}

export default SwipePage;
