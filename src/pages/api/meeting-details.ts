import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { roomId } = req.query;
    const meetingdetails = await axios.get(
        `https://iriko.testing.huddle01.com/api/v1/meeting-details/${roomId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      console.log(meetingdetails)
    res.status(200).json(meetingdetails.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
