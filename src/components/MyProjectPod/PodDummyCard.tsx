import { Box, Text } from "@chakra-ui/react";

const PodCard = () => {
  return (
    <Box
      maxH={"400px"}
      h={"400px"}
      width={"320px"}
      maxW={"380px"}
      mx={[2, 4]}
      bg={"gainsboro"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Text textAlign={"left"}>
        waiting for new members... You will get an email when a new member
        joins!
      </Text>
    </Box>
  );
};

export default PodCard;
