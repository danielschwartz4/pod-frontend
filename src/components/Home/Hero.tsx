import { Box, Image } from "@chakra-ui/react";
import React from "react";
import bgImage from "../../images/bgImage.png";
import PodCard from "../MyPod/PodCard";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Box h={"100vh"} w={"100vh"}>
      <Box
        position={"absolute"}
        mr={"6em"}
        top={0}
        mt={"8em"}
        p={2}
        right={0}
        zIndex={1}
        borderRadius={20}
        border={"4px"}
        borderColor={"#F6793D"}
      >
        <PodCreated
          isMainProject={false}
          projectsData={[
            SeedData.ExampleProject1.project,
            SeedData.ExampleProject2.project,
            SeedData.ExampleProject3.project,
          ]}
        ></PodCreated>
      </Box>
      <Image m={-10} opacity={"20%"} src={bgImage.src}></Image>
    </Box>
  );
};

export default Hero;
