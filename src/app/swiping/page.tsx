'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { createRef, RefObject, useMemo, useRef, useState } from 'react';

import Card from '@/components/swiper/Card';
import { API, Direction, ICardData } from '@/interfaces/swipe';

const db: ICardData[] = [
  {
    title: '성산어물정',
    img: '/0.jpeg',
    lng: 126.917306236842,
    lat: 33.4395648227551,
    content: `성산일출봉과 섭지코지 사이에 위치한 저희 제주 어물전은 제주도 특산물인 고등어회,딱새우회, 제주 갈치회 전문점으로 싱싱한 활어회와 함께 푸짐한 한상을 준비하였습니다. 주차 편의시설 또한 넓어서 불편함 없이 이용가능하십니다.`,
    keyword: ['성산일출봉', '전통시장', '해변'],
    placeId: '1',
  },
  {
    title: '어조횟집',
    img: '/1.jpeg',
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
    img: '/2.jpeg',
    lng: 126.921633330756,
    lat: 33.4495800115369,
    content: `제주도 핫플레이스 루프탑카페 ! 성산일출봉 오션뷰 카페 호랑호랑 입니다.
    전용비치를 보유하고있어 낮에는 포근한 햇살과, 밤에는 은은한 조명의 야경이 아름다운곳 입니다`,
    keyword: ['카페', '테마파크', '포토스팟'],
    placeId: '3',
  },
  {
    title: '삼다도식당',
    img: '/3.jpeg',
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
  const [placeId, setPlaceId] = useState<string[]>([]);
  // const [lastDirection, setLastDirection] = useState<'left' | 'right'>();
  const [currentIndex, setCurrentIndex] = useState(db?.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const route = useRouter();

  // const [isComplete, setIsComplete] = useState(false);
  // const [isRunout, setIsRunout] = useState(false);
  // const [isFirst, setIsFirst] = useState(false);
  const canGoBack = currentIndex < db?.length - 1;
  const canSwipe = currentIndex >= 0;

  const childRefs: RefObject<API>[] = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map(() => createRef()),
    [],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // set last direction and decrease current index
  const swiped = async (
    direction: Direction,
    placeId: string,
    index: number,
  ) => {
    // setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === 'right') {
      setPlaceId((prev) => [...prev, placeId]);
    }
    if (
      currentIndex === db?.length - 1 &&
      localStorage.getItem('isFirst') === 'true'
    ) {
      // setIsFirst(true);
      localStorage.setItem('isFirst', 'false');
    }
  };

  // useEffect(() => {
  //   if (!canSwipe) {
  //     setIsRunout(true);
  //   }
  // }, [currentIndex]);

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < db?.length) {
      await (childRefs[currentIndex].current as API).swipe(dir);
    }
  };

  const outOfFrame = (placeId: string, idx: number) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
    setPlaceId((prev) => prev.slice(0, -1));
  };

  // const handleMakeList = async () => {
  //   setIsComplete(false);
  //   setIsRunout(false);

  //   setTimeout(() => {
  //     console.log('placeId', placeId);
  //   }, 2000);
  // };

  const openInGoogleMaps = (name: string, lat: number, lng: number) => {
    const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
    window.open(url, '_blank');
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
        {canGoBack ? (
          <button
            type="button"
            onClick={async () => await goBack()}
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

      {/* // ! Swipe Card Deck */}
      <div className="flex flex-1 items-center justify-center">
        {canSwipe ? (
          db.map((place: ICardData, index) => (
            <Card
              key={place.title}
              ref={childRefs[index]}
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

        <div className="absolute bottom-0 flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={() =>
              openInGoogleMaps(
                db[currentIndex].title,
                db[currentIndex].lat,
                db[currentIndex].lng,
              )
            }
            className="size-12"
          >
            <Image
              src="/svg/fork_right.svg"
              alt="like"
              width={25}
              height={25}
            />
          </button>
          <button
            type="button"
            onClick={() => swipe('left')}
            disabled={!canGoBack}
          >
            <Image
              src="/svg/dislike.svg"
              alt="dislike"
              width={25}
              height={25}
            />
          </button>

          <button
            type="button"
            onClick={() => swipe('right')}
            disabled={!canSwipe}
          >
            <Image src="/svg/like.svg" alt="like" width={40} height={40} />
          </button>
          <div className="relative size-12">
            <button
              type="button"
              // onClick={() => setIsComplete(true)}
              className="size-12"
              disabled={placeId?.length === 0}
            >
              <Image
                src="/svg/swipe_complete.svg"
                alt="like"
                width={25}
                height={25}
              />
              <p className="absolute right-0 top-0 size-6 rounded-full bg-red-500 p-1 text-center text-white">
                {placeId?.length}
              </p>
            </button>
          </div>
        </div>
      </div>
      {/* {isComplete && (
        <CustomModal
          onConfirm={handleMakeList}
          onClose={() => setIsComplete(false)}
          bodyText={`진행 중인 스와이핑을 종료하고,\nAI 결과 리스트를 만드시겠습니까?`}
          cancelText={'취소'}
          confirmText={'만들기'}
          isAlert={false}
        />
      )}
      {isRunout && (
        <CustomModal
          onConfirm={handleMakeList}
          bodyText={`선택이 모두 완료되었습니다. AI 결과 리스트를 생성합니다.`}
          confirmText={'만들기'}
          isAlert={true}
        />
      )}
      {isFirst && (
        <CustomModal
          onConfirm={async () => {
            await goBack();
            setIsFirst(false);
          }}
          onClose={async () => {
            setIsFirst(false);
          }}
          bodyText={
            lastDirection === 'right'
              ? `사진을 오른쪽으로 미는 것은 이 장소에 관심이 있다는 뜻입니다.`
              : `이 장소에 관심이 없나요? 사진을 왼쪽으로 미는 것은 이 장소에 관심이 없다는 뜻입니다.`
          }
          cancelText={
            lastDirection === 'right' ? '알고있어요 !' : '알고있어요 !'
          }
          confirmText={lastDirection === 'right' ? '몰랐어요 !' : '몰랐어요 !'}
        />
      )} */}
    </div>
  );
}

export default SwipePage;
