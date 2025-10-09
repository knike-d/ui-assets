import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";
import type { Store } from "@prisma/client";

export const GET = async (): Promise<NextResponse<Store[]>> => {
  const data = await prisma.store.findMany();
  return NextResponse.json(data, { status: 200 });
};
