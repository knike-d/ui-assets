import { HttpResponse, http } from "msw";

import { db } from "@/testing/mocks/db";
import { networkDelay } from "@/testing/mocks/utils";

const endpoint = {
  store: "/api/store/:storeId",
};

export const storeHandlers = [
  http.get(endpoint.store, async ({ params }) => {
    await networkDelay();

    const storeId = params.storeId as string;

    const result = db.message.findFirst({
      where: {
        storeId: {
          equals: storeId,
        },
      },
    });
    return HttpResponse.json(result);
  }),
];
