import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";
import type { StoreUserMessage } from "@prisma/client";

type Params = {
  params: Promise<{ storeId: string }>;
};

export const GET = async (
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse<Omit<StoreUserMessage, "userId" | "storeId">[]>> => {
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

export const POST = async (req: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { storeId } = await params;

  const store = await prisma.store.findFirst({ where: { id: storeId } });
  if (!store) {
    return NextResponse.json({}, { status: 500 });
  }

  // TODO: ログイン機能実装後に修正
  const user = await prisma.user.findFirst();

  const formData = await req.formData();
  const message = formData.get("message");

  if (user) {
    if (typeof message === "string") {
      await prisma.storeUserMessage.create({
        data: {
          storeId,
          userId: user.id,
          content: message,
          isRead: true,
          messageType: "text",
          senderType: "user",
        },
      });

      return NextResponse.json({}, { status: 200 });
    }
  }

  return NextResponse.json({}, { status: 500 });
};
