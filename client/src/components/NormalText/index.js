import React from "react";

import { NormalTextContainer, Text } from "./normalText.styles";

const NormalText = ({
  text,
  bold,
  center,
  right,
  fontSizeProps = "14px",
  fontSizeMobileProps,
  normalTextContainerStyle = {},
  ...rest
}) => (
  <NormalTextContainer
    center={center}
    right={right}
    {...normalTextContainerStyle}>
    <Text
      fontSizeProps={fontSizeProps}
      fontSizeMobileProps={fontSizeMobileProps}
      bold={bold}
      center={center}
      right={right}
      {...rest}>
      {text}
    </Text>
  </NormalTextContainer>
);

export default NormalText;
