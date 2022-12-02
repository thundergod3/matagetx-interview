import { Text as CkText } from "@chakra-ui/react";

import chakraShouldForwardProp from "utils/chakraShouldForwardProp";

export const Text = chakraShouldForwardProp(
  CkText,
  ({ textPosition, fontSizeProps, fontSizeMobileProps }) => ({
    fontWeight: "bold",
    fontSize: {
      base: fontSizeMobileProps || "20px",
      md: fontSizeProps,
    },
    textAlign: textPosition,
    width: {
      base: "100%",
      md: "max-content",
    },
    wordBreak: "break-word",
    whiteSpace: "normal",
  })
);
