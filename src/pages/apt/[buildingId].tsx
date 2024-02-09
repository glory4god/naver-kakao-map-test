import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ChapterPage({}) {
  const router = useRouter();

  useEffect(() => {
    let map: naver.maps.Map;

    const initMap = () => {
      const center: naver.maps.LatLng = new naver.maps.LatLng(
        37.3595704,
        127.105399,
      );

      map = new naver.maps.Map('map', {
        center: center,
        zoom: 16,
      });
    };
    initMap();

    return () => {
      map.destroy();
    };
  }, []);

  return (
    <div className="bg-white h-full min-h-screen pt-10">
      <div id="map" className="w-full h-[600px]" />
    </div>
  );
}
