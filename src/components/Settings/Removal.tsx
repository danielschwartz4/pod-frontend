import { Box } from "@chakra-ui/react";
import React from "react";
import { accountProps } from "./Account";

interface removalProps extends accountProps {}

const Removal: React.FC<removalProps> = ({}) => {
  // !! Cascading delete
  return <Box></Box>;
};

export default Removal;
