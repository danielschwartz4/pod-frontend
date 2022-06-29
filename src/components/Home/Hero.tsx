import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import heroProject from "../../images/heroProject.png";
import heroTask from "../../images/heroTask.png";

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
        <Text>
          Join groups of others to stay <b>motivated</b> and <b>accountable</b>{" "}
          while pursing a solo goal
        </Text>

        <Box ml={4} mb={16}>
          {meData?.me == null ? (
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
          gap={4}
          mx={"auto"}
          display={{ base: "block", sm: "flex" }}
        >
          <Flex>
            <Image
              mx={"auto"}
              // mr={4}
              w={"380px"}
              h={"430px"}
              src={heroProject.src}
              alt=""
              draggable={false}
            />
          </Flex>
          <Flex>
            <Image
              // ml={4}
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
