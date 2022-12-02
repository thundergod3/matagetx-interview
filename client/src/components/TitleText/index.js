import React from "react";

import { Text } from "./titleText.styles";

const TitleText = ({
  fontSize = "28px",
  title = "",
  textPosition = "left",
  fontSizeMobileProps,
  ...rest
}) => (
  <Text
    textPosition={textPosition}
    fontSizeProps={fontSize}
    fontSizeMobileProps={fontSizeMobileProps}
    {...rest}>
    {title}
  </Text>
);

export default TitleText;
