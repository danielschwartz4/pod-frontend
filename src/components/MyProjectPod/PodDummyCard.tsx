import { Box, Flex, Text } from "@chakra-ui/react";

const PodCard = () => {
  return (
    <Flex
      border={"8px"}
      borderColor={"gray"}
      borderRadius={"50%"}
      bg={"#F8F2E6"}
      height={"275px"}
      width={"275px"}
    >
      <Text width={"90%"} textAlign={"center"} m={"auto"}>
        waiting for new members... You will get an email when a new member
        joins!
      </Text>
    </Flex>
  );
};

export default PodCard;
