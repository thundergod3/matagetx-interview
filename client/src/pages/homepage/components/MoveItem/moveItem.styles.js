import { chakra, Flex as CkFlex } from "@chakra-ui/react";

export const MovieItemContainer = chakra(CkFlex, {
  baseStyle: () => ({
    justifyContent: "space-between",
    marginBottom: "24px",
    flexDirection: {
      base: "column",
      md: "row",
    },

    _last: {
      marginBottom: 0,
    },
  }),
});

export const MovieItemLeftContainer = chakra(CkFlex, {
  baseStyle: () => ({
    width: "100%",
    flex: 0.45,
  }),
});

export const MovieItemRightContainer = chakra(CkFlex, {
  baseStyle: () => ({
    width: "100%",
    flex: 0.5,
    flexDirection: "column",
  }),
});

export const MovieItemVoteActionContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    marginLeft: "auto",
  }),
});

export const MovieItemVoteItemContainer = chakra(CkFlex, {
  baseStyle: () => ({
    alignItems: "center",
    marginRight: "12px",
  }),
});

export const MovieItemDescriptionContainer = chakra(CkFlex, {
  baseStyle: () => ({
    flexDirection: "column",
    marginTop: "8px",
  }),
});
