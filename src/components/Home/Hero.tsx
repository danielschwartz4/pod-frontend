import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import heroProject from "../../images/heroProject.png";
import heroTask from "../../images/heroTask.png";
import { Event } from "../../libs/tracking";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const toast = useToast();

  // let i = 0;
  // function myLoop() {
  //   setTimeout(function () {
  //     toast({
  //       title: "test",
  //       description: "test",
  //       position: "bottom-left",
  //       status: "info",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     i++; //  increment the counter
  //     if (i < 10) {
  //       myLoop();
  //     } //  ..  setTimeout()
  //   }, 2000);
  // }
  // myLoop();

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
        <Text fontFamily={"sans-serif"} fontWeight={"thin"}>
          Join groups of others to stay <b>motivated</b> and <b>accountable</b>{" "}
          while pursing a solo goal
        </Text>
        <Box ml={4} mb={16}>
          {meData?.me == null ? (
            <Button
              textColor={"gainsboro"}
              fontSize={".5em"}
              height={"100px"}
              color={"gainsboro"}
              cursor={"pointer"}
              onClick={() => {
                router.push("/register");
                Event(
                  "Desktop",
                  "Register Button",
                  "Join a pod and get started"
                );
              }}
            >
              <Flex direction={"column"}>
                <Text fontFamily={"sans-serif"} fontWeight={"medium"} mb={"-2"}>
                  Join a pod and get started! 😆
                </Text>
                <Text fontSize={16} fontWeight={"light"}>
                  (it's free)
                </Text>
              </Flex>
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Flex mb={4}>
        <Box
          p={2}
          borderRadius={20}
          border={"4px"}
          maxW={"850px"}
          borderColor={"#F6793D"}
          gap={[1, 1, 12, 16]}
          mx={"auto"}
          display={{ base: "block", sm: "flex" }}
        >
          <Flex>
            <Image
              mx={"auto"}
              w={"380px"}
              h={"430px"}
              src={heroProject.src}
              alt=""
              draggable={false}
            />
          </Flex>
          <Flex>
            <Image
              mx={"auto"}
              w={"380px"}
              h={"430px"}
              src={heroTask.src}
              alt=""
              draggable={false}
            />
          </Flex>
          {/* <PodCreated
            projectsData={[
              SeedData.ExampleProject1.project as Project,
              SeedData.ExampleProject2.project as Project,
            ]}
          /> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
