import { Box } from "@chakra-ui/react";

const PodCard = () => {
  return (
    <Box
      maxH={"420px"}
      h={"420px"}
      width={"100%"}
      maxW={"380px"}
      mx={[2, 4]}
      bg={"gainsboro"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      waiting for new members...
    </Box>
  );
};

export default PodCard;
