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
      // mx="auto"
      mr={8}
      maxW={variant === "regular" ? "1000px" : "400px"}
      w="100vh"
    >
      {children}
    </Box>
  );
};
