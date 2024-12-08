import type { FC, SVGProps } from "react";
export const HamburgerMenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="fill-white"
    height="20px"
    viewBox="0 0 512 512"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 16h512v80H0zM0 216.008h512v79.984H0zM0 416h512v80H0z" />
  </svg>
);
