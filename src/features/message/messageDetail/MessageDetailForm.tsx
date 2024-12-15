"use client";
import { useState, type FC } from "react";
import { MessageDetailFormInput } from "@/features/message/messageDetail/MessageDetailFormInput";
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
  const [inputText, setInputText] = useState("");
  const { trigger, isMutating } = usePostMessage(storeId);
  const { mutate } = useFetchMessageDetail(storeId);
  const { optimisticUpdate, rollbackData } = useOptimisticUpdateMessageDetail(storeId);

  const handleChangeTextarea = (text: string): void => {
    setInputText(text);
  };

  const handleSubmit = async () => {
    if (!inputText) {
      return;
    }

    const formData = new FormData();
    formData.append("message", inputText);

    try {
      await optimisticUpdate({ inputText });
      onSubmit();
      await trigger(formData);
      await mutate();
      setInputText("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        await rollbackData();
      }
    }
  };
  const disabledSubmit = isMutating;

  return (
    <div className="flex w-full max-w-2xl items-end border bg-white shadow-md">
      <MessageDetailFormInput disabled={isMutating} inputText={inputText} onChangeTextarea={handleChangeTextarea} />
      <button
        className={`h-12 whitespace-nowrap rounded  p-3 text-white  ${disabledSubmit ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-800"}`}
        disabled={disabledSubmit}
        type="button"
        onClick={handleSubmit}
      >
        送信
      </button>
    </div>
  );
};
