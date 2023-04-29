import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const openai = new OpenAIApi(configuration);


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt = req.body.prompt
  try {
    const completionParams = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const summary = await openai.createCompletion(completionParams);
    console.log(summary);

    res.status(200).json({ result: summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export default handler;

