import React from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

import { KakaoMapProps } from '@/interfaces/result/result';

const KakaoMap: React.FC<KakaoMapProps> = ({ hotplaces }) => {
  if (!hotplaces || hotplaces.length === 0) {
    return (
      <div className="text-center text-yellow-100">
        지도를 불러오는 중입니다...
      </div>
    );
  }

  const averageLat =
    hotplaces.reduce((acc, curr) => acc + curr.lat, 0) / hotplaces.length;
  const averageLng =
    hotplaces.reduce((acc, curr) => acc + curr.lng, 0) / hotplaces.length;

  return (
    <Map
      center={{ lat: averageLat, lng: averageLng }}
      level={6}
      isPanto={true}
      style={{ width: '100%', height: '200px', borderRadius: '20px' }}
    >
      {hotplaces.map((place) => (
        <MapMarker
          key={place.id}
          title={place.name}
          position={{ lat: place.lat, lng: place.lng }}
        />
      ))}
      <Polyline
        path={hotplaces.map((place) => ({ lat: place.lat, lng: place.lng }))}
        strokeWeight={3}
        strokeColor="#FFAE00"
        strokeOpacity={0.7}
        strokeStyle="solid"
      />
    </Map>
  );
};

export default KakaoMap;
