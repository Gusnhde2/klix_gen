import { getApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({
      status: 401,
      body: JSON.stringify({
        error: "Niste prijavljeni.",
      }),
    });
  }

  const apiLimitCount = await getApiLimit();

  if (!apiLimitCount) {
    return NextResponse.json({
      status: 402,
      body: {
        error: "Nažalost, potrošili ste kredite.",
      },
    });
  }

  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
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
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    incrementApiLimit();
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
