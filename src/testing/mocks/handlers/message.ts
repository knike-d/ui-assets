import { HttpResponse, http } from "msw";
import { db } from "@/testing/mocks/db";
import { networkDelay } from "@/testing/mocks/utils";

const endpoint = {
  messageDetail: "/api/message/:storeId",
};

export const messageHandlers = [
  http.get(endpoint.messageDetail, async ({ request, params }) => {
    await networkDelay();

    const storeId = params["storeId"] as string;
    const user = await db.user.findFirst({
      where: {},
    });

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);

    const result = db.message.findMany({
      where: {
        storeId: {
          equals: storeId,
        },
        userId: {
          equals: user?.id,
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return HttpResponse.json(result);
  }),
  http.post(endpoint.messageDetail, async ({ request, params }) => {
    await networkDelay();

    const storeId = params["storeId"] as string;
    const user = await db.user.findFirst({
      where: {},
    });

    const formData = await request.formData();
    const message = formData.get("message");

    if (user) {
      if (typeof message === "string") {
        await db.message.create({
          storeId,
          userId: user.id,
          content: message,
          isRead: true,
          messageType: "text",
          senderType: "user",
        });

        return HttpResponse.json(null);
      }
    }
    return HttpResponse.json(null, { status: 500 });
  }),
];

export const messageErrorHandler = {
  messageSubmit: http.post(endpoint.messageDetail, async () => {
    await networkDelay();
    return HttpResponse.json(null, { status: 500 });
  }),
};
