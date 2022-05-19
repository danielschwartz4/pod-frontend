import { Box } from "@chakra-ui/react";
import React from "react";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Box
      zIndex={1}
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
      {/* <Box>
        <Image width={"100%"} m={-10} opacity={"40%"} src={bgImage.src}></Image>
      </Box> */}
    </Box>
  );
};

export default Hero;
