import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai/index.mjs";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Ti si tipčni klix.ba uživaoc, nisi baš gramatički najispravnij i nastojiš biti humorističan. Nikad se ne koristiš ikavicom, a često koristiš i neke riječi koje su ušle u narodni govor. Dužina komentara 2 rečenice maxkimalno.",
        },
        {
          role: "user",
          content: `Generiši komentar za klix.ba na sljedeći naslov: ${prompt}. `,
        },
      ],
      model: "gpt-4",
    });

    return NextResponse.json({
      message: completion.choices[0].message,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
    });
  }
}
