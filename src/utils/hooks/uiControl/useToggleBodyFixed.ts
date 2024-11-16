import { useEffect } from "react";

const applyBodyStyle = (scrollPosition: number, isApplied: boolean): void => {
  const htmlWidth = document.documentElement.clientWidth;
  const scrollBarWidth = window.innerWidth - htmlWidth;
  const isBodyFullScreen = htmlWidth === document.body.clientWidth;

  const bodyStyles = {
    // 動的viewportを考慮してbodyを固定
    position: "fixed",
    width: "100dvw",
    left: "0",

    // body固定によるスクロール位置のズレを防止
    top: `${scrollPosition * -1}px`,

    // body固定によってスクロールバーが消失した際のズレを防止
    right: `${scrollBarWidth}px`,
    // bodyが画面いっぱいの場合にスクロールバーの領域を確保する
    paddingRight: isBodyFullScreen ? `${scrollBarWidth}px` : "",
  } as const;

  Object.entries(bodyStyles).forEach(([key, value]) => {
    document.body.style[key as keyof typeof bodyStyles] = isApplied ? value : "";
  });
};

const restoreScrollPosition = (scrollPosition: number): void => {
  window.scrollTo({
    top: scrollPosition * -1,
    behavior: "instant",
  });
};

const toggleBodyFixed = (isFixed: boolean): void => {
  const scrollPosition = isFixed
    ? (document.scrollingElement?.scrollTop ?? 0)
    : parseInt(document.body.style.top || "0", 10);

  applyBodyStyle(scrollPosition, isFixed);
  if (!isFixed) {
    // 固定を解除するとスクロール位置がリセットされるため、固定前の位置に戻す
    restoreScrollPosition(scrollPosition);
  }
};

export const useToggleBodyFixed = (isFixed: boolean): void => {
  useEffect(() => {
    if (isFixed) {
      toggleBodyFixed(true);
    }

    return () => {
      if (isFixed) {
        toggleBodyFixed(false);
      }
    };
  }, [isFixed]);
};
