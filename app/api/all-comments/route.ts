import { getAllComments, getCommentsCount } from "@/lib/comments";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { order, page } = await req.json();

  const { userId } = auth();
  try {
    const commentsCount = await getCommentsCount();
    const comments = await getAllComments(order, page);
    return NextResponse.json({
      comments: comments,
      count: commentsCount,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Greška prilikom dohvaćanja komentara",
      status: 500,
    });
  }
}
