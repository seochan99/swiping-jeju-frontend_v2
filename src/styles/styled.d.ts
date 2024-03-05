// 이 부분은 'styled-components' 모듈을 확장하는 타입 선언입니다.
// 현재까지 정의된 모든 색상들을 일시적으로 주석 처리하였습니다.

import 'styled-components';

// TODO: styled.d.ts 파일을 추가함으로써, Theme을 사용하는 파일에서 하위 프로퍼티를 자동완성으로 타입 추론이 가능해집니다.
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      //   primary: '#FAFAFA';
      //   secondary: '#FFC80A';
      //   tertiary: '#303030';
      background: '#ffffff';
      text: '#000000';
      //   primaryTextColor: '#594F43';
      //   secondaryTextColor: '#777777';
      //   inputPlaceholder: '#C7C7C7';
      //   darkGrayText: '#303030';
      //   darkText: '#1A1A1A';
      //   black: '#000000';
      //   white: '#ffffff';
      //   dark: '';
      //   medium: '';
      //   light: '';
      //   danger: '';
      //   success: '#66A15A';
    };
    // fonts: {
    //   notoSans: 'Noto Sans KR';
    // };
    // paddings: {
    //   container: '15px';
    //   pageTop: '30px';
    // };
    // margins: {
    //   pageTop: '30px';
    // };
  }
}
