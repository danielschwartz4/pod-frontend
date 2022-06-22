import { Flex } from "@chakra-ui/react";

const Section: React.FC = ({ children }) => {
  return (
    <Flex
      textColor={"gray.500"}
      fontSize={"lg"}
      justifyContent={"space-between"}
      direction={"column"}
      m={4}
      p={4}
      bg={"gray.800"}
      w={["340px", "500px"]}
      minW={"200px"}
      rounded={"lg"}
    >
      {children}
    </Flex>
  );
};

export default Section;
