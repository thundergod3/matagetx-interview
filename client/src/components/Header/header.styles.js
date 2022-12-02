import {
  chakra,
  Flex as CkFlex,
  Container as CkContainer,
} from "@chakra-ui/react";

export const HeaderContainer = chakra(CkContainer, {
  baseStyle: () => ({
    maxWidth: "6xl",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "solid 1px",
    borderBottomColor: "background.grey.500",
    paddingBottom: "24px",
    marginTop: "12px",
  }),
});

export const HeaderLeftContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    cursor: "pointer",
  }),
});

export const HeaderRightContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    marginLeft: "auto",
  }),
});
