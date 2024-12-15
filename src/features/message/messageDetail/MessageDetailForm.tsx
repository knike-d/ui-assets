"use client";
import { useState, type FC } from "react";
import { MessageDetailFormInput } from "@/features/message/messageDetail/MessageDetailFormInput";

export const MessageDetailForm: FC = () => {
  const [inputText, setInputText] = useState("");
  const handleChangeTextarea = (text: string): void => {
    setInputText(text);
  };

  return (
    <div className="flex w-full max-w-2xl items-end bg-white shadow-md">
      <MessageDetailFormInput inputText={inputText} onChangeTextarea={handleChangeTextarea} />
      <button className="h-12 whitespace-nowrap rounded bg-blue-500 p-3 text-white hover:bg-blue-600" type="button">
        送信
      </button>
    </div>
  );
};
