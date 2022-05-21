import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Flex
      display={{ base: "block", lg: "flex" }}
      width={"100%"}
      alignItems={"center"}
    >
      <Box
        mx={"auto"}
        textAlign={"center"}
        maxW={550}
        textColor={"gainsboro"}
        fontSize={{ base: 36, md: 48 }}
        transform={{ base: "translateY(-20px)", lg: "translateY(-100px)" }}
      >
        <Text>
          A place to stay motivated and accountable when pursing a solo goal
        </Text>
      </Box>
      <Box
        minW={{ base: "0px", sm: "700px" }}
        maxW={"850px"}
        borderRadius={20}
        border={"4px"}
        borderColor={"#F6793D"}
        py={4}
        mb={4}
        mx={"auto"}
      >
        <PodCreated
          projectsData={[
            SeedData.ExampleProject1.project,
            SeedData.ExampleProject2.project,
            SeedData.ExampleProject3.project,
          ]}
        />
      </Box>
      {/* <Box>
        <Image width={"100%"} m={-10} opacity={"40%"} src={bgImage.src}></Image>
      </Box> */}
    </Flex>
  );
};

export default Hero;
