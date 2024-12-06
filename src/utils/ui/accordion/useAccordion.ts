import { useCallback, useRef, useState } from "react";

const openingKeyframes = (elementHeight: number): Keyframe[] => {
  return [
    {
      height: "0px",
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.999,
    },
    {
      height: "auto",
      offset: 1,
    },
  ];
};

const closingKeyframes = (elementHeight: number): Keyframe[] => {
  return [
    {
      height: "auto",
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.001,
    },
    {
      height: "0px",
      offset: 1,
    },
  ];
};

const option: KeyframeAnimationOptions = {
  duration: 200,
  easing: "ease-out",
  fill: "forwards",
};

export const useAccordion = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = useCallback(() => {
    const accordion = accordionRef.current;
    if (!accordion?.firstElementChild) return;
    const accordionHeight = accordion.clientHeight;
    const accordionChildHeight = accordion.firstElementChild.clientHeight;

    const isOpen = accordionHeight > 0;
    if (isOpen) {
      accordion.animate(closingKeyframes(accordionChildHeight), option);
    } else {
      accordion.animate(openingKeyframes(accordionChildHeight), option);
    }
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    handleAccordionClick,
    accordionRef,
  };
};
