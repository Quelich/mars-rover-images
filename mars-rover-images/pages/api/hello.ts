// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
