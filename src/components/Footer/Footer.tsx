import { Box, useColorModeValue } from "@chakra-ui/react";

export default function LargeWithNewsletter() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      height="20vh"
    />
  );
}
