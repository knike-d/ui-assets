import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";

type Params = {
  params: Promise<{ storeId: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const { storeId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  // TODO: ログイン機能実装後に修正
  const user = await prisma.user.findFirst();

  const data = await prisma.storeUserMessage.findMany({
    where: { storeId, userId: user?.id },
    select: {
      id: true,
      content: true,
      mediaUrl: true,
      senderType: true,
      messageType: true,
      isRead: true,
      createdAt: true,
    },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(data, { status: 200 });
};
