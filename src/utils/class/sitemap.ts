import { GetServerSidePropsContext } from 'next';

export class SitemapBuilder {
  // XML의 템플릿을 만드는 함수
  withXMLTemplate(content: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${content}</urlset>`;
  }
  // sitemapIndex로 만들어주는 함수
  buildSitemapIndexXml(allSitemaps: string[]) {
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...(allSitemaps?.map((x) => `<sitemap><loc>${x}</loc></sitemap>`) ?? []),
      '</sitemapindex>',
    ].join('\n');
  }
  // url sitemap을 만들어주는 함수
  buildSitemapXml(fields: string[]): string {
    const content = fields
      .map((url) => `<url><loc>${url}</loc></url>\n`)
      .join('');
    return this.withXMLTemplate(content);
  }
}

// nextjs serverside에서 xml로 response를 내려주는 함수
export const withXMLResponse = (
  ctx: GetServerSidePropsContext,
  content: string,
) => {
  if (ctx?.res) {
    const { res } = ctx;
    res.setHeader('Content-Type', 'text/xml');
    res.write(content);
    res.end();
  }
  return {
    props: {},
  };
};
