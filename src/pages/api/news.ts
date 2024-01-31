import { NextApiRequest, NextApiResponse } from 'next';

//**
/* GET Subject subjectId로 조회
/* PATCH Subject 수정
*/

const client_id = process.env.NAVER_CLIENT_ID || '';
const client_secret = process.env.NAVER_CLIENT_SECRET || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const { query } = req.query;

  if (method === 'GET') {
    try {
      const news = await fetch(
        `https://openapi.naver.com/v1/search/news?query=${query}&display=100&start=1&sort=date`,
        {
          headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
          },
        },
      ).then((res) => res.json());
      return res.status(200).json(news);
    } catch {
      return res.status(401).json([]);
    }
  }
}
