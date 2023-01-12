// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


type RoverPhoto = {
  id: number;
  sol: number;
  img_src: string;
};

type RawRoverPhoto = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoverPhoto>
) {
 

}
