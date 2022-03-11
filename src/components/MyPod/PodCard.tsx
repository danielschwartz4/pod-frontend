import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import bgImage from "../../images/design.png";

interface PodCardProps {
  username?: string;
  milestones?: string[];
  milestoneDates?: string[];
  overview: string;
  projectName: string;
  createdAt: Date;
  updatedAt: Date;
}

const PodCard: React.FC<PodCardProps> = (props) => {
  return (
    <Center py={6}>
      <Box
        // maxW={"350"}
        w={"300px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={bgImage.src} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {props.username}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {props.projectName}
          </Heading>

          <Text color={"gray.500"}>
            {/* !! Make this cut off after certain number of words */}
            {props.overview}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Last update: {props.updatedAt}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default PodCard;
