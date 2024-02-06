import Image from 'next/image';
import Link from 'next/link';
import { KakaotalkShare } from './KakaotalkShare';

interface Props {
  news: News;
}
export const NewsLinkRow = ({ news }: Props) => {
  return (
    <Link
      href={news.originallink}
      target="_blank"
      className={
        'h-auto font-bold cursor-pointer px-4 py-3 transition-all flex w-full forceHover justify-between border-b'
      }>
      <div className="">
        <div className="text-xs flex items-center justify-between text-gray-700">
          <p className="whitespace-pre-line">
            {(news.originallink.split(/\/\/|\//)[1] ?? '').replace(/www./, '')}
          </p>
          <p>{getDateTime(news.pubDate)}</p>
        </div>
        <h3
          className="text-sm mt-2"
          dangerouslySetInnerHTML={{ __html: news.title }}
        />
        <p
          className="text-xs my-1.5 text-gray-600"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(news.originallink);
              window.alert('링크가 복사되었습니다.');
            }}>
            <Image
              className="rounded"
              src={'/clipboard.png'}
              width={34}
              height={34}
              alt="카카오톡 공유"
            />
          </button>
          <KakaotalkShare
            url={news.originallink}
            title={news.title}
            description={news.description}
          />
        </div>
      </div>
    </Link>
  );
};

const getDateTime = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};
