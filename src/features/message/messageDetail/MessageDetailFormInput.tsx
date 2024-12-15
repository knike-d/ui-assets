import type { ChangeEvent } from "react";
import { type FC } from "react";

type Props = {
  inputText: string;
  onChangeTextarea: (text: string) => void;
};

export const MessageDetailFormInput: FC<Props> = ({ inputText, onChangeTextarea }) => {
  const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChangeTextarea(event.target.value);
  };

  return (
    <div className="mx-1 flex w-full min-w-0">
      <div className="relative my-1 w-full overflow-auto text-sm">
        <div
          className="invisible max-h-40 min-h-10 overflow-hidden whitespace-pre-wrap break-words border px-3 py-2"
          aria-hidden
        >{`${inputText}\u200b`}</div>
        <textarea
          className="absolute inset-y-0 max-h-40 min-h-10 w-full resize-none border px-3 py-2"
          placeholder="メッセージを入力"
          value={inputText}
          onChange={handleChangeTextarea}
        />
      </div>
    </div>
  );
};
