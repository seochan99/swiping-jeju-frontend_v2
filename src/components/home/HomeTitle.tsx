import React from 'react';

interface KeywordTitleProps {
  text1: string;
  text2: string;
  text3: string;
}

const KeywordTitle: React.FC<KeywordTitleProps> = ({ text1, text2, text3 }) => (
  <div className="mb-4 flex w-full justify-start">
    <h1 className="mb-3 mt-1 text-4xl font-bold text-white">
      {text1} <span className="text-[#00FF66]">{text2}</span>
      <br />
      {text3}
    </h1>
  </div>
);

export default KeywordTitle;
