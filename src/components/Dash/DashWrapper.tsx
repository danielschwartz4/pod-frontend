import { VStack } from "@chakra-ui/react";
import React from "react";

interface DashWrapperProps {}

const DashWrapper: React.FC<DashWrapperProps> = ({ children }) => {
  return (
    <VStack minH={"90vh"} h={"100%"} w={"100%"} mt={{ base: 0, md: 16 }}>
      {children}
    </VStack>
  );
};

export default DashWrapper;
