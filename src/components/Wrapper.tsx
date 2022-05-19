import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "medium" | "large";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "large",
}) => {
  return (
    <Box
      mt={8}
      // mx={"auto"}
      width={
        variant === "large" ? "100vw" : variant === "medium" ? "60vw" : "40vw"
      }
      h={"100%"}
    >
      {children}
    </Box>
  );
};
