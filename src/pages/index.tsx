import { buildings } from '@/constant/building';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ChapterPage({}) {
  const router = useRouter();

  return (
    <div className="bg-white h-full min-h-screen pt-10 px-5">
      <div className="mt-4">다음 주소의 위치정보를 알아보세요!</div>

      <ul className="space-y-2 mt-4">
        {buildings.map(({ address, latitude, longitude }, i) => {
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
    </div>
  );
}
