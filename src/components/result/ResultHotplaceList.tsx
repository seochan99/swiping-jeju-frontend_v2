import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiDirectionLine } from 'react-icons/ri';

import { ResultHotplaceListProps } from '@/interfaces/result/result';

const ResultHotplaceList: React.FC<ResultHotplaceListProps> = ({
  hotplaces,
}) => {
  const openInKakaoMaps = (name: string, lat: number, lng: number) => {
    const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-2.5 p-4 text-gray-800">
      {hotplaces?.map((place) => (
        <div
          key={place.id}
          className="flex cursor-pointer flex-row items-center rounded-full bg-white p-2 px-5"
          onClick={() => openInKakaoMaps(place.title, place.lat, place.lng)}
        >
          <FaMapMarkerAlt color="#00FF66" className="text-[#00FF66]" />
          <span className="mx-2 truncate text-xs">
            {place.title.slice(0, 5)}
          </span>
          <RiDirectionLine />
        </div>
      ))}
    </div>
  );
};

export default ResultHotplaceList;
