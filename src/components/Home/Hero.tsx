import { Box } from "@chakra-ui/react";
import React from "react";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Box
      p={2}
      zIndex={1}
      // !! See if there's a way to not use a negative margin
      mx={["-10%", "10%"]}
      borderRadius={20}
      border={"4px"}
      borderColor={"#F6793D"}
      mb={4}
      // width={{ sm: "80%", lg: "50%" }}
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
