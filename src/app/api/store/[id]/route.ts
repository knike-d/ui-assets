import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export const GET = async (req: Request, { params }: Params) => {
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
