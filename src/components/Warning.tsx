import { Box, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import React from "react";
import { Layout } from "./Layout";

interface WarningProps {}

export const Warning: React.FC<WarningProps> = ({}) => {
  return (
    <Layout isProfile>
      <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Sorry, this page isn't available.
        </Heading>
        <Text color={"gray.500"}>
          Sorry, the link you followed may be broken, or the page may have been
          removed.
        </Text>
      </Box>
    </Layout>
  );
};
