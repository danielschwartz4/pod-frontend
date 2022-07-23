import { SimpleGrid } from "@chakra-ui/react";
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
