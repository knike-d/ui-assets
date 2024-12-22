import { FetchErrorMessage } from "@/utils/constants/errorMessage.const";

type CustomError = Error & Partial<Record<"method", string>>;

export const customFetch = async <Res>(input: RequestInfo | URL, init?: RequestInit): Promise<Res> => {
  return fetch(input, init)
    .then((res) => {
      if (!res.ok) {
        const isPostRequest = init?.method?.toUpperCase() === "POST";
        const errorMessage = isPostRequest ? FetchErrorMessage.PostFailed : FetchErrorMessage.FetchFailed;

        const error: CustomError = new Error(errorMessage);
        error.method = init?.method;
        throw error;
      }
      return res.json() as Promise<Res>;
    })
    .catch((error: CustomError) => {
      if (error.method) {
        throw error;
      }
      throw new Error(FetchErrorMessage.CommunicationFailed);
    });
};
