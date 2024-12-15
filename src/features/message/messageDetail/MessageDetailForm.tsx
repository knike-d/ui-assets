"use client";
import { useState, type FC } from "react";
import { MessageDetailFormInput } from "@/features/message/messageDetail/MessageDetailFormInput";
import { useFetchMessageDetail, usePostMessage } from "@/features/message/useFetchMessageDetail";

type Props = {
  storeId: string;
};

export const MessageDetailForm: FC<Props> = ({ storeId }) => {
  const [inputText, setInputText] = useState("");
  const { trigger, isMutating } = usePostMessage(storeId);
  const { mutate } = useFetchMessageDetail(storeId);

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
      await trigger(formData);
      await mutate();
      setInputText("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex w-full max-w-2xl items-end bg-white shadow-md">
      <MessageDetailFormInput disabled={isMutating} inputText={inputText} onChangeTextarea={handleChangeTextarea} />
      <button
        className="h-12 whitespace-nowrap rounded bg-blue-700 p-3 text-white hover:bg-blue-800"
        disabled={isMutating}
        type="button"
        onClick={handleSubmit}
      >
        送信
      </button>
    </div>
  );
};
