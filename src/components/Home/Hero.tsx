import { Box, Image } from "@chakra-ui/react";
import React from "react";
import bgImage from "../../images/bgImage.png";
import PodCard from "../MyPod/PodCard";
import { PodCreated } from "../MyPod/PodCreated";
import SeedData from "./SeedHomeData";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <Box
      h={"100vh"}
      w={"100vh"}
      backgroundPosition="top"
      backgroundRepeat={"repeat-y"}
    >
      <Box h={"60%"} w={"60%"}>
        <Box
          position={"absolute"}
          mr={"6em"}
          top={0}
          mt={"6em"}
          right={0}
          zIndex={1}
        >
          <PodCreated
            podLength={1}
            isMainProject={true}
            projectsData={[SeedData.ExampleProject1.project]}
          ></PodCreated>
          {/* <PodCard
            project={SeedData.ExampleProject1.project}
          ></PodCard> */}
        </Box>
        <Image opacity={"20%"} src={bgImage.src}></Image>
      </Box>
    </Box>
  );
};

export default Hero;
