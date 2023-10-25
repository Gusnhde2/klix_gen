import { NextRequest, NextResponse } from "next/server";
import { deleteComment, getComments, saveComment } from "@/lib/comments";

export async function POST(req: NextRequest) {
  const { comment, article, userName } = await req.json();

  try {
    await saveComment(comment, article, userName);
    return NextResponse.json({ message: "Komentar je spremljen", status: 200 });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return NextResponse.json({
      message: "Greška prilikom dohvaćanja komentara",
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { postId } = await req.json();

  try {
    await deleteComment(postId);
    return NextResponse.json({ message: "Komentar je obrisan", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Greška prilikom brisanja komentara",
      status: 500,
    });
  }
}
