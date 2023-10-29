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

export const getAllComments = async (order: string, page: number) => {
  const comments = await prisma.userComments.findMany({
    skip: 10 * (page - 1),
    take: 10,
    select: {
      comment: true,
      userName: true,
      article: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: order === "asc" ? "asc" : "desc",
    },
  });

  return comments;
};

export const getCommentsCount = async () => {
  const commentsCount = await prisma.userComments.count();

  return commentsCount;
};

export const getUserCommentsCount = async (id: string) => {
  const commentsCount = await prisma.userComments.count({
    where: {
      userId: id,
    },
  });

  return commentsCount;
};
