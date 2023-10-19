import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
  function getArticleTitles(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        "python app/api/scrape/getArticleTitles.py",
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(stdout);
        }
      );
    });
  }

  const articles = await getArticleTitles();

  return new NextResponse(articles);
}
