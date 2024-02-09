import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { SitemapBuilder, withXMLResponse } from '@/utils/class/sitemap';
import { buildings } from '@/constant/building';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const buildingsUrl = buildings.map(
    (_, i) => `https://building-info.vercel.app/apt/${i + 1}`,
  );
  const fields = new SitemapBuilder().buildSitemapXml([...buildingsUrl]);

  return withXMLResponse(ctx, fields);
};

export default function Sitemap() {}
