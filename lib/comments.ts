import { auth } from "@clerk/nextjs";
import prisma from "./prismadb";

export const saveComment = async (comment: string, article: string) => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  await prisma.userComments.create({
    data: {
      article,
      comment,
      userId,
    },
  });
};
