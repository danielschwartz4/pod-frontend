import { Box, Image } from "@chakra-ui/react";
import React from "react";
import bgImage from "../../images/bgImage.png";
import PodCard from "../MyPod/PodCard";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Box h={"100vh"} w={"100vh"} p={12}>
      <Box h={"60%"} w={"100%"}>
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
            podLength={3}
            isMainProject={true}
            projectsData={[
              SeedData.ExampleProject1.project,
              SeedData.ExampleProject2.project,
              SeedData.ExampleProject3.project,
            ]}
          ></PodCreated>
        </Box>
        <Image mr={"100px"} opacity={"10%"} src={bgImage.src}></Image>
      </Box>
    </Box>
  );
};

export default Hero;
