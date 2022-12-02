import {
  chakra,
  FormLabel as CkFormLabel,
  Box as CkBox,
} from "@chakra-ui/react";

export const FormLabel = chakra(CkFormLabel, {
  baseStyle: () => ({
    color: "text.third",
    fontSize: "12px",
    marginBottom: "4px",
    fontWeight: "bold",
  }),
});

export const InputIconContainer = chakra(CkBox, {
  baseStyle: () => ({
    marginRight: "8px",
  }),
});
