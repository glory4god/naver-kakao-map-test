import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const { url } = req.query;

  if (!url) return res.status(200).json({});

  if (method === 'GET') {
    try {
      const news = await fetch(url as string).then((res) => res.text());
      const [thumbnail, a, b] = news
        .split(/property="og:image" content="/)[1]
        ?.split(/>|\/>|\/ >/);
      return res.status(200).json(thumbnail.replace(/"/, ''));
    } catch {
      return res.status(401).json([]);
    }
  }
}
