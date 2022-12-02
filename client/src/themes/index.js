import { extendTheme } from "@chakra-ui/react";

import {
  GRAY_500_TEXT,
  GRAY_600_TEXT,
  GREY_100_BACKGROUND,
  GREY_200_BACKGROUND,
  GREY_400_BACKGROUND,
  GREY_500_BACKGROUND,
  OVERLAY_BACKGROUND,
} from "./globalStyles";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: OVERLAY_BACKGROUND,
        fontFamily: "Arial, sans-serif",
        color: GRAY_600_TEXT,
      },
    },
  },
  colors: {
    text: {
      grey: {
        500: GRAY_500_TEXT,
        600: GRAY_600_TEXT,
      },
    },
    background: {
      overlay: OVERLAY_BACKGROUND,
      grey: {
        100: GREY_100_BACKGROUND,
        200: GREY_200_BACKGROUND,
        400: GREY_400_BACKGROUND,
        500: GREY_500_BACKGROUND,
      },
    },
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Arial, sans-serif",
  },
});

export default theme;
