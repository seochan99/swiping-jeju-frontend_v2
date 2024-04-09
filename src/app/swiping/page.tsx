'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Card from '@/components/swiper/Card';
import SwipeButton from '@/components/swiper/SwipeButton';
import { useAppDataStore } from '@/context/store';
import { useSwipe } from '@/hooks/swipe/useSwipe';
import { useMutate } from '@/hooks/useMutate';
import { HotPlace } from '@/interfaces/home/home';
import { AlbumCreateRequest, AlbumCreateResponse } from '@/interfaces/swipe';
import Dislike from '@/svg/dislike.svg';
import Navigation from '@/svg/fork_right.svg';
import Like from '@/svg/like.svg';
import Submit from '@/svg/swipe_complete.svg';
import { openKakaoMap } from '@/utils/swipe/openKakaoMap';

const Loading = dynamic(() => import('@/components/common/Loading'), {
  ssr: false,
});
const Modal_Swipe = dynamic(() => import('@/components/swiper/Modal_Swipe'), {
  ssr: false,
});

function SwipePage() {
  const appData = useAppDataStore.getState().appData;
  const { hotPlaceList, id } = appData; // hotPlaceList 가져오기

  const { trigger: postAlbum } = useMutate<
    AlbumCreateRequest,
    AlbumCreateResponse
  >('/album/create', 'POST');

  const {
    handleUndoSwipe,
    swiped,
    handleSwipe,
    outOfFrame,
    cardRefs,
    setIsFirstVisit,
    idArray,
    swipeState: {
      isFirstCard,
      isLastCard,
      currentIndex,
      isFirstVisit,
      lastDirection,
    },
  } = useSwipe<HotPlace>(hotPlaceList);

  const [isComplete, setIsComplete] = useState(false);
  const [isRunout, setIsRunout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLastCard) {
      setIsRunout(true);
    }
  }, [currentIndex, isLastCard]);

  const handleOpenKakaoMap = async () => {
    const { lat, lng, title } = hotPlaceList[currentIndex];
    openKakaoMap(lat, lng, title);
  };

  const [loading, setLoading] = useState(false);

  // 결과 리스트 만들기
  const handleMakeList = async () => {
    setIsComplete(false);
    setIsRunout(false);
    setLoading(true);

    const ResultData = hotPlaceList.filter((place) =>
      idArray.includes(place.id),
    );

    const title = await axios
      .post('/api/title', { data: ResultData })
      .then((res) => res.data);
    const description = await axios
      .post('/api/description', {
        data: ResultData,
      })
      .then((res) => res.data);

    // 서버로 결과 데이터 전송
    // TODO : likeIdList 실제 값 으로 대체 해야함 (임시값)
    await postAlbum({
      id: id,
      title: title?.result.slice(0, 40) ?? '',
      content: description?.result ?? '',
      likeIdList: idArray,
    });

    // 끝나면 결과 페이지로 이동
    setTimeout(() => {
      router.push(`/result/${id}`);
    }, 1000);
  };

  return (
    <main className={`flex h-[100vh] w-full flex-col`}>
      {/* // * ------------------------------------- */}
      {/* // * -------------- Header -------------- */}
      {/* // * ------------------------------------- */}
      <header className="flex min-h-[50px] w-full justify-between p-4">
        <Link href="/home">
          <Image
            src="/images/nav_logo.png"
            width={140}
            height={40}
            alt="nav_logo"
          />
        </Link>
        {isFirstCard && (
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
        )}
      </header>
      {/* // * ------------------------------------- */}
      {/* // * ---------- Swipe Card Deck ---------- */}
      {/* // * ------------------------------------- */}
      <div className="relative flex flex-1 items-center justify-center">
        {isLastCard ? (
          hotPlaceList.map((place: HotPlace, index) => (
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
        {/* // * ----------------------------------- */}
        {/* // * --------- Swipe Button ------------ */}
        {/* // * ----------------------------------- */}
        {!isRunout && (
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
              onClick={() => setIsComplete(true)}
              disabled={!isFirstCard}
            >
              <Submit />
            </SwipeButton>
          </div>
        )}
      </div>
      {/* // * ---------------------------- */}
      {/* // * ---------- Modals ---------- */}
      {/* // * ---------------------------- */}
      {isComplete && (
        <Modal_Swipe
          onClose={() => setIsComplete(false)}
          onClick={handleMakeList}
          text="진행중인 스와이프를 종료하고
          AI 결과 리스트를 만드시겠습니까?"
        />
      )}
      {isFirstVisit && (
        <Modal_Swipe
          onClose={() => setIsFirstVisit(false)}
          onClick={handleUndoSwipe}
          text={
            lastDirection === 'right'
              ? `사진을 오른쪽으로 미는 것은 이 장소에 관심이 있다는 뜻입니다.`
              : `이 장소에 관심이 없나요? 사진을 왼쪽으로 미는 것은 이 장소에 관심이 없다는 뜻입니다.`
          }
          cancelText="알겠습니다."
          submitText={'몰랐어요'}
        />
      )}
      {isRunout && (
        <Modal_Swipe
          onClose={() => setIsRunout(false)}
          onClick={handleMakeList}
          text={'선택이 모두 완료되었습니다. AI 결과 리스트를 생성합니다.'}
          hiddenCancel
        />
      )}
      {loading && <Loading />}
    </main>
  );
}

export default SwipePage;
