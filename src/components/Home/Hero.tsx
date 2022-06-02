import { Box, Button, Flex, Text } from "@chakra-ui/react";
import router from "next/router";
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
      minHeight={"65vh"}
    >
      <Box
        mx={"auto"}
        mt={"auto"}
        p={2}
        textAlign={"center"}
        maxW={550}
        textColor={"gainsboro"}
        fontSize={{ base: 36, md: 48 }}
        transform={{ base: "translateY(-20px)", lg: "translateY(-100px)" }}
      >
        <Text>
          Stay <b>motivated</b> and <b>accountable</b> while pursing a solo goal
        </Text>

        <Box ml={4}>
          <Button
            textColor={"gainsboro"}
            fontSize={".5em"}
            height={"75px"}
            color={"gainsboro"}
            cursor={"pointer"}
            onClick={() => router.push("/register")}
          >
            Join a pod and get started! 😆
          </Button>
          <Text fontSize={24} mt={16}>
            Whether you want to finish a book, a project, or anything else that
            has a finite number of milestones, join others and make it happen
          </Text>
        </Box>
      </Box>
      <Box
        minW={{ base: "0px", sm: "800px" }}
        maxW={"850px"}
        borderRadius={20}
        border={"4px"}
        borderColor={"#F6793D"}
        py={4}
        mb={4}
        mx={"auto"}
      >
        <Box display={{ base: "none", lg: "block" }}>
          <PodCreated
            projectsData={[
              SeedData.ExampleProject1.project,
              SeedData.ExampleProject2.project,
              // SeedData.ExampleProject3.project,
            ]}
          />
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <PodCreated
            projectsData={[
              SeedData.ExampleProject1.project,
              SeedData.ExampleProject2.project,
            ]}
          />
        </Box>
      </Box>

      {/* <Box>
        <Image width={"100%"} m={-10} opacity={"40%"} src={bgImage.src}></Image>
      </Box> */}
    </Flex>
  );
};

export default Hero;
