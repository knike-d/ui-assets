import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";
import type { Store } from "@prisma/client";

type Params = {
  params: Promise<{ id: string }>;
};

export const GET = async (req: Request, { params }: Params): Promise<NextResponse<Store | null>> => {
  const _params = await params;
  const data = await prisma.store.findUnique({
    where: { id: _params.id },
    select: {
      id: true,
      name: true,
    },
  });
  return NextResponse.json(data, { status: 200 });
};
