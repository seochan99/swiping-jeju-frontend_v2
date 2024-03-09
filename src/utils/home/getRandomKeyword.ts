// 랜덤 키워드 추출 함수
export function getRandomKeywords(
  keywordList: string[],
  count: number,
): string[] {
  // 결과 리스트 초기화
  const resultList = [];
  // 중복 선택을 방지하기 위한 인덱스 집합 생성
  const indexSet = new Set();

  // resultList의 길이가 count보다 작고, indexSet의 크기가 keywordList의 길이보다 작을 때까지 반복
  while (resultList.length < count && indexSet.size < keywordList.length) {
    // keywordList의 길이 내에서 랜덤 인덱스 생성
    const randomIndex = Math.floor(Math.random() * keywordList.length);

    // 해당 인덱스가 아직 선택되지 않았다면
    if (!indexSet.has(randomIndex)) {
      // 인덱스 집합에 추가
      indexSet.add(randomIndex);
      // 결과 리스트에 해당 키워드 추가
      resultList.push(keywordList[randomIndex]);
    }
  }

  return resultList;
}
