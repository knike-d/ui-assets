import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { IntersectionOptions } from "react-intersection-observer";

export const useInViewTrigger = (onInView: () => void, option: IntersectionOptions): JSX.Element => {
  const { ref, inView } = useInView(option);
  useEffect(() => {
    if (inView) {
      onInView();
    }
    // 万が一の無限レンダリング防止のため onInView を依存配列に追加しない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const triggerElement = <div ref={ref} aria-hidden />;
  return triggerElement;
};
