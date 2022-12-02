import { Text as CkText, Flex as CkFlex } from "@chakra-ui/react";

import { TEXT_POSITION } from "shared/schemas";

import chakraShouldForwardProp from "utils/chakraShouldForwardProp";

export const Text = chakraShouldForwardProp(
  CkText,
  ({ bold, textPosition, fontSizeProps, fontSizeMobileProps }) => ({
    fontFamily: "Arial, sans-serif",
    fontSize: {
      base: fontSizeMobileProps || fontSizeProps,
      md: fontSizeProps,
    },
    fontWeight: bold ? "bold" : "normal",
    color: "text.grey.600",
    textAlign:
      textPosition === TEXT_POSITION.CENTER
        ? "center"
        : textPosition === TEXT_POSITION.RIGHT
        ? "end"
        : "start",
    wordBreak: "break-word",
    whiteSpace: "normal",
    lineHeight: "22px",
  })
);

export const NormalTextContainer = chakraShouldForwardProp(
  CkFlex,
  ({ textPosition }) => ({
    justifyContent:
      textPosition === TEXT_POSITION.CENTER
        ? "center"
        : textPosition === TEXT_POSITION.RIGHT
        ? "flex-end"
        : "flex-start",
    alignItems: "center",
  })
);
