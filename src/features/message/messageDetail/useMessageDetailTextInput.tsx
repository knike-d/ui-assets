"use client";

import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";

type Params = {
  disabled: boolean;
};

type Result = {
  inputText: string;
  resetInputText: () => void;
  TextInput: ReactElement;
};

export const useMessageDetailTextInput = ({ disabled }: Params): Result => {
  const [inputText, setInputText] = useState("");

  const resetInputText = (): void => {
    setInputText("");
  };

  const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(event.target.value);
  };

  const TextInput = (
    <div className="mx-1 flex w-full min-w-0">
      <div className="relative my-1 w-full overflow-auto text-sm">
        <div
          className="invisible max-h-40 min-h-10 overflow-hidden whitespace-pre-wrap break-words border px-3 py-2"
          aria-hidden
        >{`${inputText}\u200b`}</div>
        <textarea
          className="absolute inset-y-0 max-h-40 min-h-10 w-full resize-none border px-3 py-2"
          disabled={disabled}
          placeholder="メッセージを入力"
          value={inputText}
          onChange={handleChangeTextarea}
        />
      </div>
    </div>
  );

  return { inputText, resetInputText, TextInput };
};
