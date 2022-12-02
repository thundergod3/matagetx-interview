import {
  Input,
  FormControl,
  Flex,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

import NormalText from "components/NormalText";

import { FormLabel, InputIconContainer } from "./inputField.styles";

const InputField = ({
  type = "text",
  placeholder = "",
  label = "",
  onSubmit,
  usingEnterInput,
  formControlStyle = {},
  formLabelStyle = {},
  leftInputIcon,
  leftText,
  rightInputIcon,
  showingFocusBorder = true,
  isDisabled,
  error,
  touched,
  name,
  ...rest
}) => {
  const handleOnKeyDown = (event) => {
    if (event?.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onSubmit?.();
    }
  };

  return (
    <FormControl isInvalid={error && touched} {...formControlStyle}>
      {label && <FormLabel {...formLabelStyle}>{label}</FormLabel>}
      <Flex alignItems="center">
        {leftInputIcon && (
          <InputIconContainer>{leftInputIcon}</InputIconContainer>
        )}
        <InputGroup flexDirection="column">
          <Flex>
            {leftText && (
              <NormalText
                text={leftText}
                bold={!isDisabled}
                color={isDisabled ? "text.grey.200" : ""}
                width="max-content"
                marginRight="10px"
              />
            )}
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              onKeyDown={usingEnterInput ? (e) => handleOnKeyDown(e) : () => {}}
              focusBorderColor={
                !showingFocusBorder ? "transparent" : "blue.500"
              }
              disabled={isDisabled}
              background={error && touched ? "background.error" : "white"}
              {...rest}
            />
          </Flex>
          {rightInputIcon && (
            <InputRightElement pointerEvents="none" children={rightInputIcon} />
          )}
          <FormErrorMessage>{error}</FormErrorMessage>
        </InputGroup>
      </Flex>
    </FormControl>
  );
};

export default InputField;
