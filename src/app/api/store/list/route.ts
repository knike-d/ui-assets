import { NextResponse } from "next/server";
import prisma from "@/utils/libs/prisma/prisma";

export const GET = async () => {
  const data = await prisma.store.findMany();
  return NextResponse.json(data, { status: 200 });
};
