import { useEffect } from "react";

type KeyEventHandler = (e: KeyboardEvent) => void;
type KeyEventFunc = (
  keyEventType: "keydown" | "keyup",
  key: "Escape" | "Tab",
  onKeyMatch?: KeyEventHandler,
  onKeyMismatch?: KeyEventHandler,
) => void;

export const useKeyEvent: KeyEventFunc = (keyEventType, key, onKeyMatch, onKeyMismatch) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) {
        onKeyMatch?.(e);
      } else {
        onKeyMismatch?.(e);
      }
    };

    document.addEventListener(keyEventType, handler);
    return () => {
      document.removeEventListener(keyEventType, handler);
    };
  }, [keyEventType, key, onKeyMatch, onKeyMismatch]);
};
