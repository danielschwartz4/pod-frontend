import { Box, Flex, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FcConferenceCall, FcSerialTasks } from "react-icons/fc";
import { HiChat } from "react-icons/hi";
import { TiThLargeOutline } from "react-icons/ti";
import { Feature } from "./Feature";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Flex justifyContent={"center"}>
      <VStack width={"90%"}>
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
        >
          <Entry
            emoji={<FcSerialTasks />}
            title={"Set your goal"}
            text={"Create your task or project goal"}
          />
          <Entry
            emoji={<TiThLargeOutline color="lightblue" />}
            title={"Match into a random group"}
            text={
              "Get randomly placed into a pod with others or join with friends"
            }
          />
          <Entry
            emoji={<FcConferenceCall />}
            title={"Share your progress"}
            text={
              "Get inspired by your podmates’ progress to complete your own goals"
            }
          />
        </Flex>
      </VStack>
    </Flex>
  );
};

const Entry = ({ emoji, title, text }) => {
  return (
    <VStack display={"flex"} flexDirection={"row"}>
      <Box fontSize={{ base: 48 }} ml={"15px"} mr={"15px"}>
        {emoji}
      </Box>
      <Box fontSize={{ base: 24 }} textAlign="left">
        <b>{title}</b> <br /> {text}
      </Box>
    </VStack>
  );
};

// {
//   /* <SimpleGrid
//     as="section"
//     my={"auto"}
//     mx={"auto"}
//     px={{ base: "6", md: "8" }}
//     justifyContent={"space-between"}
//     textColor={"gainsboro"}
//     columns={{ base: 2, md: 2, lg: 4 }}
//   >
//     <Feature title="Track your progress" icon={<FcSerialTasks />}>
//       {" "}
//     </Feature>
//     <Feature
//       title="Join a pod to track others' progress"
//       icon={<TiThLargeOutline color="lightblue" />}
//     >
//       {" "}
//     </Feature>
//     <Feature title="Chat with yours peers on your progress" icon={<HiChat />}>
//       {" "}
//     </Feature>
//     <Feature
//       title="Join a pod with your a friend or stranger!"
//       icon={<FcConferenceCall />}
//     >
//       {" "}
//     </Feature>
//   </SimpleGrid> */
// }

// {/* <Box
// as="section"
// maxW="5xl"
// h={600}
// mx="auto"
// py="12"
// px={{ base: "6", md: "8" }}
// >
//   <SimpleGrid
// textColor={"gainsboro"}
// columns={{ base: 1, md: 2 }}
// spacingX="10"
// spacingY={{ base: "8", md: "14" }}
//   >
//     {/* <Flex direction={"column"} justifyContent={"space-between"}> */}
//     <Feature title="Track your progress" icon={<FcSerialTasks />}>
//       Generate a custom flow chart to see a visual representation of your
//       progress
//     </Feature>
//     <Feature
//       title="Join a pod to track others' progress"
//       icon={<TiThLargeOutline color="lightblue" />}
//     >
//       Join a "pod" to see the progress of others and stay motivated
//     </Feature>
//     <Feature title="Update yours peers on your progress" icon={<HiChat />}>
//       Update your pod members on your progress through SMS notifications
//     </Feature>
//     <Feature title="Join a pod with your friend!" icon={<FcConferenceCall />}>
//       Join a pod with your friends to hold eachother accountable!
//     </Feature>
//   </SimpleGrid>
//   {/* </Flex> */}
// </Box>; */}
