import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Is this a medical bill or healthcare-related financial document? Answer with only 'yes' or 'no'." 
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
                detail: "low"
              }
            }
          ],
        }
      ],
      max_tokens: 10,
      temperature: 0
    });

    if (!response.choices[0]?.message?.content) {
      return res.status(500).json({ error: 'No response from AI service' });
    }

    const content = response.choices[0].message.content.toLowerCase();
    const isLegitimate = content.includes('yes');

    return res.status(200).json({
      result: isLegitimate ? 'yes' : 'no',
      isLegitimate
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to verify document'
    });
  }
}
