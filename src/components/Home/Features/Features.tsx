import { Box, SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { FcConferenceCall, FcSerialTasks } from "react-icons/fc";
import { HiChat } from "react-icons/hi";
import { TiThLargeOutline } from "react-icons/ti";
import { Feature } from "./Feature";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <Box as="section" maxW="5xl" mx="auto" py="12" px={{ base: "6", md: "8" }}>
      <SimpleGrid
        textColor={"gainsboro"}
        columns={{ base: 1, md: 2 }}
        spacingX="10"
        spacingY={{ base: "8", md: "14" }}
      >
        <Feature title="Track your progress" icon={<FcSerialTasks />}>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus.
        </Feature>
        <Feature
          title="Join a pod to track others' progress"
          icon={<TiThLargeOutline color="lightblue" />}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore.
        </Feature>
        <Feature title="Update yours peers on your progress" icon={<HiChat />}>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus.
        </Feature>
        <Feature
          title="Join a pod with your friend!"
          icon={<FcConferenceCall />}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore.
        </Feature>
      </SimpleGrid>
    </Box>
  );
};
