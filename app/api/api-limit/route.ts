import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const apiCount = await prisma.klixGenUserApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  return NextResponse.json({ count: apiCount?.count, limit: apiCount?.limit });
}
