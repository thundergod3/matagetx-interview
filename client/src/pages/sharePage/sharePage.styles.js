import { chakra, Flex as CkFlex } from "@chakra-ui/react";

export const SharePageContainer = chakra(CkFlex, {
  baseStyle: () => ({
    justifyContent: "center",
    width: "100%",
    marginTop: "100px",
  }),
});

export const SharePageFormContainer = chakra(CkFlex, {
  baseStyle: () => ({
    flexDirection: "column",
    border: "solid 1px",
    padding: "48px 32px",
    position: "relative",
    minWidth: "80%",
  }),
});
