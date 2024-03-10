/**
 * Opens Kakao Map with the specified latitude, longitude, and place name.
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @param placeName - The name of the place.
 */
export const openKakaoMap = (lat: number, lng: number, placeName: string) => {
  const url = `https://map.kakao.com/link/map/${placeName},${lat},${lng}`;
  window.open(url);
};
