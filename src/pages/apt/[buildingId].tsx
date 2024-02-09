import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function ChapterPage({}) {
  const router = useRouter();

  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    let map: naver.maps.Map;

    function startDotMap(data?: any) {
      var dotmap = new naver.maps.visualization.DotMap({
        map: map,
        data: [[37.3595704, 127.105399]],
      });
    }

    const initMap = () => {
      const center: naver.maps.LatLng = new naver.maps.LatLng(
        37.3595704,
        127.105399,
      );

      map = new naver.maps.Map('map', {
        center: center,
        zoom: 16,
      });
      mapRef.current = map;

      naver.maps.Event.once(map, 'init', () => {
        startDotMap();
      });
    };

    initMap();

    return () => {
      map.destroy();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="bg-white h-full min-h-screen pt-10">
      <div id="map" className="w-full h-[600px]" />
    </div>
  );
}
