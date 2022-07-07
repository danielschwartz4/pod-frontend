import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { FcConferenceCall, FcSerialTasks } from "react-icons/fc";
import { HiChat } from "react-icons/hi";
import { TiThLargeOutline } from "react-icons/ti";
import { Feature } from "./Feature";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <SimpleGrid
      as="section"
      my={"auto"}
      mx={"auto"}
      px={{ base: "6", md: "8" }}
      justifyContent={"space-between"}
      textColor={"gainsboro"}
      columns={{ base: 2, md: 2, lg: 4 }}
    >
      <Feature title="Track your progress" icon={<FcSerialTasks />}>
        {" "}
      </Feature>
      <Feature
        title="Join a pod to track others' progress"
        icon={<TiThLargeOutline color="lightblue" />}
      >
        {" "}
      </Feature>
      <Feature title="Chat with yours peers on your progress" icon={<HiChat />}>
        {" "}
      </Feature>
      <Feature
        title="Join a pod with your a friend or stranger!"
        icon={<FcConferenceCall />}
      >
        {" "}
      </Feature>
    </SimpleGrid>
  );
};

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
