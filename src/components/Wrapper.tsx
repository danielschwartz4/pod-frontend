import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx={"auto"}
      width={variant === "regular" ? "100vw" : "40vw"}
      h={"100%"}
    >
      {children}
    </Box>
  );
};
