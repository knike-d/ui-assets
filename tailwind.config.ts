import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "200p": "200%",
      },
      maxWidth: {
        "80p": "80%",
      },
      height: {
        inherit: "inherit",
      },
      zIndex: {
        overlay: "calc(infinity - 100)",
        "drawer-menu": "calc(infinity)",
        "overlay-content": "calc(infinity)",
      },
      backgroundColor: {
        overlay: "rgb(0 0 0 / 0.5);",
      },
    },
  },
  plugins: [],
};
export default config;
