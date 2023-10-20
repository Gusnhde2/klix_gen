import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function POST(req: NextRequest) {
  const { page } = await req.json();

  try {
    const url = `https://www.klix.ba/${page}`;
    const response = await axios.get(url);
    const root = parse(response.data);

    const articles = root.querySelectorAll("article").map((article: any) => {
      return {
        title: article.querySelector("h2").text.trim(),
        link: article.querySelector("a").getAttribute("href"),
      };
    });

    return new NextResponse(
      JSON.stringify({
        articles: articles,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      })
    );
  }
}
