import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Flex>
      <VStack width={"90%"} mx={"auto"}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          fontFamily={"ubuntu"}
          textColor={"#F5F5F5"}
          textAlign={"center"}
        >
          How it works
        </Text>
        <Flex
          textColor={"white"}
          justifyContent={"space-between"}
          width={"100%"}
          fontFamily={"ubuntu"}
          alignItems={"flex-start"}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
          }}
        >
          <Box
            display={{ base: "block", sm: "block", md: "block", lg: "flex" }}
            mx={"auto"}
          >
            <Entry
              emoji={<RiNumber1 />}
              title={"Set your goal"}
              text={"Create your task or project goal"}
            />
            <Entry
              emoji={<RiNumber2 />}
              title={"Match into a random group"}
              text={
                "Get randomly placed into a pod with others or join with friends"
              }
            />
            <Entry
              emoji={<RiNumber3 />}
              title={"Share your progress"}
              text={
                "Get inspired by your podmates’ progress to complete your own goals"
              }
            />
          </Box>
        </Flex>
      </VStack>
    </Flex>
  );
};

const Entry = ({ emoji, title, text }) => {
  return (
    <Flex>
      <Box
        mt={4}
        fontSize={{ base: 48 }}
        mx={{ base: "15px", sm: "60px", lg: "15px" }}
      >
        {emoji}
      </Box>
      <VStack width={"250px"} display={"flex"} flexDirection={"row"}>
        <Flex
          mb={"auto"}
          direction={"column"}
          fontSize={{ base: 20 }}
          textAlign={"left"}
        >
          <Text mb={-2}>{title}</Text>
          <Text opacity={"60%"}>{text}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};
