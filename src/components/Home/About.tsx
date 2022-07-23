import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Flex justifyContent={"center"}>
      <VStack
        width={"80%"}
        fontFamily={"ubuntu"}
        textColor={"#F5F5F5"}
        // mt={"0px"}
      >
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Why poddds?
        </Text>
        <Text fontSize={"24"}>
          We know there are a lot of accountability apps out there. But{" "}
          <b>
            being self-conscious or not having like-minded friends makes it
            nearly impossible
          </b>{" "}
          to share and achieve your goals.
        </Text>
        <br />
        <Text fontSize={"24"}>
          We use the brew of progress: 1) accountability 2) friendly competition
          and 3) praise to bring strangers together and succeed.{" "}
          <b>
            We believe that we can support one another, even if our goals are
            different.
          </b>{" "}
        </Text>
        <br />
        <Text fontSize={"24"}>
          We invite you to join today and support podmates and yourself in being
          productive.
        </Text>
      </VStack>
    </Flex>
  );
};

export default About;
