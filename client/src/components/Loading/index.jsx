import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading = ({ size = "xl", ...rest }) => (
  <Center w="full">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size={size}
      {...rest}
    />
  </Center>
);

export default Loading;
