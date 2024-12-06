"use client";
import type { FC, ReactNode } from "react";
import { RightArrowIcon } from "@/utils/ui/Icon/RightArrowIcon";
import { useAccordion } from "@/utils/ui/accordion/useAccordion";

type Props = {
  title: string;
  children: ReactNode;
};
export const Accordion: FC<Props> = ({ title, children }) => {
  const { isOpen, handleAccordionClick, accordionRef } = useAccordion();

  return (
    <>
      <button
        aria-controls="contents"
        aria-expanded={!isOpen}
        className="flex h-14 w-full items-center border px-5 text-left hover:bg-slate-100"
        type="button"
        onClick={handleAccordionClick}
      >
        {title}
        <RightArrowIcon
          className={`ml-auto  transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </button>
      <div ref={accordionRef} aria-hidden={!isOpen} className="h-0 w-full overflow-hidden" id="contents">
        {children}
      </div>
    </>
  );
};
