import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import teamBuilding from "../../images/Hero/teamBuilding.jpg";
import { Event } from "../../libs/tracking";
import NextLink from "next/link";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const toast = useToast();

  return (
    <Box width={"100%"} alignItems={"center"} minHeight={"65vh"}>
      <Box
        mx={"auto"}
        p={2}
        textAlign={"center"}
        maxW={700}
        textColor={"gainsboro"}
        fontSize={{ base: 36, md: 48 }}
      >
        <Heading size={"3xl"}>Pods for productivity</Heading>
        <Text fontSize={"2xl"} fontFamily={"ubuntu"}>
          Join small groups with others. Get inspired by their progress. Keep
          accountable and grow together.
        </Text>
        <Flex direction={["column", "row"]} mb={12}>
          <Box mx={"auto"}>
            {meData?.me == null ? <GetStartedButton /> : <></>}
            <Button
              w={"250px"}
              borderRadius={8}
              mr={[0, 4]}
              textColor={"#FFDC93"}
              bgColor={"gray.800"}
              border={"2px"}
              borderColor={"#FFDC93"}
              fontSize={".5em"}
              fontWeight={"bold"}
              height={"60px"}
              fontFamily={"ubuntu"}
              cursor={"pointer"}
            >
              <a
                target="_blank"
                href="https://www.youtube.com/watch?v=k5YCmw6BNGQ&ab_channel=DRS"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#FFDC93" }}
              >
                Watch a short video
              </a>
            </Button>
          </Box>
        </Flex>
      </Box>
      <Flex mb={4}>
        <Box
          p={2}
          maxW={"850px"}
          gap={[1, 1, 12, 16]}
          mx={"auto"}
          display={{ base: "block", sm: "flex" }}
        >
          <Image borderRadius={16} w={"800px"} src={teamBuilding.src} />
        </Box>
      </Flex>
    </Box>
  );
};

export const GetStartedButton = () => {
  return (
    <Button
      w={"250px"}
      borderRadius={8}
      height={"60px"}
      color={"gainsboro"}
      cursor={"pointer"}
      border={"none"}
      fontSize={"24px"}
      fontFamily={"ubuntu"}
      textColor={"gray.800"}
      bgColor={"#FFDC93"}
      _hover={{ bg: "#ffecc4" }}
      mr={4}
      onClick={() => {
        router.push("/register");
        Event("Desktop", "Register Button", "Join a pod and get started");
      }}
    >
      Get started for free
    </Button>
  );
};

export default Hero;
