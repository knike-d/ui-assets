"use client";
import { type FC } from "react";
import { useMessageDetailTextInput } from "@/features/message/messageDetail/useMessageDetailTextInput";
import {
  useFetchMessageDetail,
  useOptimisticUpdateMessageDetail,
  usePostMessage,
} from "@/features/message/useFetchMessageDetail";

type Props = {
  storeId: string;
  onSubmit: () => void;
};

export const MessageDetailForm: FC<Props> = ({ storeId, onSubmit }) => {
  const { trigger: submitForm, isMutating: isFormMutating } = usePostMessage(storeId);
  const { mutate: mutateMessageDetail } = useFetchMessageDetail(storeId);
  const { optimisticUpdate, rollbackData } = useOptimisticUpdateMessageDetail(storeId);

  const { inputText, resetInputText, TextInput } = useMessageDetailTextInput({ disabled: isFormMutating });

  const handleSubmit = async (): Promise<void> => {
    if (!inputText) {
      return;
    }

    const formData = new FormData();
    formData.append("message", inputText);

    try {
      await optimisticUpdate({ inputText });
      onSubmit();
      await submitForm(formData);
      await mutateMessageDetail();
      resetInputText();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        await rollbackData();
      }
    }
  };
  const disabledSubmit = isFormMutating || !inputText;

  return (
    <div className="flex w-full max-w-2xl items-end border bg-white shadow-md">
      {TextInput}
      <button
        className={`h-12 whitespace-nowrap rounded  p-3 text-white  ${disabledSubmit ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-800"}`}
        data-testid="message-submit-button"
        disabled={disabledSubmit}
        type="button"
        onClick={handleSubmit}
      >
        送信
      </button>
    </div>
  );
};
