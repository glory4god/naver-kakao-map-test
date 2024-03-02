import { useEffect, useRef } from 'react';
import NextHead from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { buildings } from '@/constant/building';
import Link from 'next/link';

interface ServerProps {
  buildingId: number;
  building: Building;
}
export default function ChapterPage({ buildingId, building }: ServerProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    let map: naver.maps.Map;

    const initMap = () => {
      const center: naver.maps.LatLng = new naver.maps.LatLng(
        building.latitude,
        building.longitude,
      );

      map = new naver.maps.Map('map', {
        center: center,
        zoom: 14,
      });

      mapRef.current = map;
    };

    initMap();

    return () => {
      map.destroy();
      mapRef.current = null;
    };
  }, []);

  const title = `${building.address} 주소 지도 위치 정보`;
  const description = `${building.address} 주소의 위치 정보에 대해서 알아보세요!`;
  const url = `https://building-info.vercel.app/apt/${buildingId}`;
  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={'website'} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content={'ko_KR'} />
        <meta property="og:site-name" content={'building-info'} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:domain" content="building-info" />

        <link rel="canonical" href={url} />
      </NextHead>
      <h1 className="text-lg">
        <b>{building.address}</b>
      </h1>
      {building?.buildingName && (
        <h2 className="text-lg mt-1 pb-2">{building.buildingName}</h2>
      )}
      <table>
        <tbody>
          <tr>
            <th>주소</th>
            <td>{building.address}</td>
          </tr>
          <tr>
            <th>좌표</th>
            <td>
              {building.latitude}, {building.longitude}
            </td>
          </tr>
        </tbody>
      </table>
      <p>지도에서 위치를 확인해보세요!</p>
      <div id="map" className="w-full h-[600px] mt-5" />
      <p className="mt-10">다른 주소들도 확인해보세요!</p>
      <ul className="space-y-2 mt-4">
        {buildings.map(({ address, latitude, longitude }, i) => {
          if (buildingId + 15 > i && buildingId - 15 < i)
            return (
              <li className="p-3 shadow-sm border rounded text-sm" key={i + 1}>
                <Link href={`/apt/${i + 1}`}>
                  <h2>{address}</h2>
                  <p className="mt-1">
                    {latitude}, {longitude}
                  </p>
                </Link>
              </li>
            );
        })}
      </ul>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { buildingId } = context.query;

  const building = buildings[Number(buildingId) - 1];

  if (!building) return { notFound: true };

  return {
    props: {
      buildingId: Number(buildingId),
      building,
    },
  };
}
