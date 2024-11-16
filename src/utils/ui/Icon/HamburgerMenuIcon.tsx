import type { FC, SVGProps } from "react";
export const HamburgerMenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    height="1em"
    style={{
      width: 20,
      height: 20,
      opacity: 1,
    }}
    viewBox="0 0 512 512"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 16h512v80H0zM0 216.008h512v79.984H0zM0 416h512v80H0z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);
