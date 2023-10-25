import { getAllComments } from "@/lib/comments";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const comments = await getAllComments();
    return NextResponse.json({ comments: comments, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Greška prilikom dohvaćanja komentara",
      status: 500,
    });
  }
}
