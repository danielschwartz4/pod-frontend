import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { Event } from "../../libs/tracking";
import teamBuilding from "../../images/Hero/teamBuilding.jpg";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width={"100%"} alignItems={"center"} minHeight={"65vh"} m={-2}>
      <Box
        mx={"auto"}
        p={2}
        textAlign={"center"}
        maxW={700}
        textColor={"gainsboro"}
        fontSize={{ base: 36, md: 48 }}
      >
        <Heading mb={10} size={"3xl"}>
          Pods for productivity
        </Heading>
        <Text mb={10} fontSize={"2xl"} fontFamily={"ubuntu"}>
          Join small groups with others. Get inspired by their progress. Keep
          accountable and grow together.
        </Text>
        {/* <Text textColor={"red"} fontSize={"16px"}>
          The website is currently under construction as we roll out a new
          feature set! Logging in will temporarily direct you to our discord.
          Watch the video below to see poddds in action!
        </Text> */}
        <Flex direction={["column", "row"]} mb={10}>
          <Box mx={"auto"}>
            {meData?.me == null ? <GetStartedButton /> : <GoToProfile />}
            <Button
              w={"250px"}
              borderRadius={8}
              ml={[0, 2]}
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
              _hover={{ bg: "gray.700" }}
              onClick={onOpen}
            >
              Watch a short video
            </Button>

            <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent
                backgroundColor={"gray.800"}
                boxShadow={"0 0 50px 10px #999"}
              >
                <ModalBody display={"flex"} justifyContent={"center"}>
                  <iframe
                    width="100%"
                    height="600"
                    src="https://www.youtube.com/embed/6A5LXlSlolE?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      </Box>
      {/* <Flex justifyContent={"center"} mb={0}>
        {typeof window !== "undefined" ? (
          <WidgetBot
            width={800}
            height={600}
            server="1002046685805023344"
            channel="1002046686350278788"
          />
        ) : null}
      </Flex> */}
      <Flex mb={2}>
        <Box
          p={2}
          gap={[1, 1, 12, 16]}
          mx={"auto"}
          display={{ base: "block", sm: "flex" }}
        >
          <Image
            borderRadius={16}
            w={{ base: "350px", sm: "550px", md: "800px" }}
            src={teamBuilding.src}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export const GetStartedButton = () => {
  return (
    <a href="https://discord.gg/4FCjdEPad2" style={{ textDecoration: "none" }}>
      <Button
        w={"250px"}
        borderRadius={8}
        mb={{ base: 4, sm: 0 }}
        height={"60px"}
        color={"gainsboro"}
        cursor={"pointer"}
        border={"none"}
        fontSize={"24px"}
        fontFamily={"ubuntu"}
        textColor={"gray.800"}
        bgColor={"#FFDC93"}
        _hover={{ bg: "#ffecc4" }}
        mr={[0, 4]}
        onClick={() => {
          router.push("/register");
          Event(
            "Desktop",
            "Register button dashtabs.tsx",
            "Join a pod and get started"
          );
        }}
      >
        Get started for free
      </Button>
    </a>
  );
};

export const GoToProfile = () => {
  return (
    <Button
      w={"250px"}
      borderRadius={8}
      mb={{ base: 4, sm: 0 }}
      height={"60px"}
      color={"gainsboro"}
      cursor={"pointer"}
      border={"none"}
      fontSize={"24px"}
      fontFamily={"ubuntu"}
      textColor={"gray.800"}
      bgColor={"#FFDC93"}
      _hover={{ bg: "#ffecc4" }}
      mr={[0, 4]}
      onClick={() => {
        router.push("/profile");
      }}
    >
      Go to profile
    </Button>
  );
};

export default Hero;
