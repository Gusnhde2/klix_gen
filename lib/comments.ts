import { auth } from "@clerk/nextjs";
import prisma from "./prismadb";

export const saveComment = async (
  comment: string,
  article: string,
  userName: string
) => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  await prisma.userComments.create({
    data: {
      article,
      comment,
      userId,
      userName,
    },
  });
};

export const getComments = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const comments = await prisma.userComments.findMany({
    where: {
      userId: userId,
    },
  });

  return comments;
};

export const deleteComment = async (id: number) => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  await prisma.userComments.delete({
    where: {
      postId: id.toString(),
    },
  });
};

export const getAllComments = async () => {
  const comments = await prisma.userComments.findMany();

  return comments;
};
