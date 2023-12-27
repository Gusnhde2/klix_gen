import { auth } from "@clerk/nextjs";
import prisma from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const apiCount = await prisma.klixGenUserApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!apiCount) {
    await prisma.klixGenUserApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  } else {
    await prisma.klixGenUserApiLimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: apiCount.count + 1,
      },
    });
  }
};

export const getApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const apiCount = await prisma.klixGenUserApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!apiCount) {
    await prisma.klixGenUserApiLimit.create({
      data: {
        userId: userId,
        count: 0,
        limit: MAX_FREE_COUNTS,
      },
    });
    return true;
  } else if (apiCount.count < apiCount.limit) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const apiCount = await prisma.klixGenUserApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!apiCount) {
    return 0;
  } else {
    return { count: apiCount.count, limit: apiCount.limit };
  }
};
// ----Patreon link----
// https://patreon.com/KlixCommentGenerator?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link
