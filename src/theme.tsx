import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "@fontsource/ubuntu";

// https://colorhunt.co/palette/fbf8f1f7ecdee9dac154bab9
const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const solarized = {
  night: "#2D393A",
  morning: "#FFC74A",
  prenoon: "#FF7A18",
  highnoon: "#DB2520",
  evening: "#1C2851",
  sundown: "#49636B",
};

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  solarized,
  fonts: {
    heading: `'Ubuntu', sans-serif`,
    text: `'Ubuntu', sans-serif`,
  },
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
});

export default theme;
