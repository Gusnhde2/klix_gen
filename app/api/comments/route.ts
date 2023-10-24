import { NextRequest, NextResponse } from "next/server";
import { getComments, saveComment } from "@/lib/comments";

export async function POST(req: NextRequest) {
  const { comment, article } = await req.json();

  try {
    await saveComment(comment, article);
    return NextResponse.json({ message: "Komentar je spremljen", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Greška prilikom spremanja komentara",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json({ comments: comments, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Greška prilikom dohvaćanja komentara",
      status: 500,
    });
  }
}
