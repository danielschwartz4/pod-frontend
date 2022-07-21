import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Event } from "../../libs/tracking";

interface SampleVideoProps {}

const SampleVideo: React.FC<SampleVideoProps> = ({}) => {
  return (
    <Flex mt={"8em"} direction={"column"}>
      <Flex>
        <Text
          fontFamily={"sans-serif"}
          fontSize={24}
          textColor={"gainsboro"}
          mx={"auto"}
        >
          TUTORIAL
        </Text>
      </Flex>
      <Box
        mt={8}
        mx={"auto"}
        display={["none", "block"]}
        onClick={() =>
          Event("Desktop", "SampleVideo.tsx Button", "Clicked Tutorial")
        }
      >
        <iframe
          width="672"
          height="378"
          src="https://www.youtube.com/embed/k5YCmw6BNGQ"
          title="Poddds tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
      <Box mt={8} mx={"auto"} display={["block", "none"]}>
        <iframe
          width="336"
          height="189"
          src="https://www.youtube.com/embed/k5YCmw6BNGQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Flex>
  );
};

export default SampleVideo;
