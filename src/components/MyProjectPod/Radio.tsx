import { Box, Flex } from "@chakra-ui/react";
import { Event } from "../../libs/tracking";

interface podRadioProps {
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
}

const PodRadio: React.FC<podRadioProps> = (props) => {
  return (
    <Flex>
      <Box
        onClick={() => {
          props.setIsRandom(true);
          Event("Desktop", "tasks/# radio.tsx Button", "Random Pod");

        }}
      >
        <RadioCard isChecked={props.isRandom}>Random Pod</RadioCard>
      </Box>
      <Box
        onClick={() => {
          Event("Desktop", "tasks/# radio.tsx Button", "Friend Pod");
          props.setIsRandom(false);
        }}
      >
        <RadioCard isChecked={!props.isRandom}>Friend Pod</RadioCard>
      </Box>
    </Flex>
  );
};

interface radioCardProps {
  isChecked: boolean;
}

const RadioCard: React.FC<radioCardProps> = (props) => {
  return (
    <Box
      w={{ base: "100px", md: "200px" }}
      cursor="pointer"
      borderRadius="md"
      bg={props.isChecked ? "#3766c4" : "#7e9cd6"}
      border={props.isChecked ? "1px" : "none"}
      color={"white"}
      px={5}
      py={3}
      mx={2}
    >
      {props.children}
    </Box>
  );
};

export default PodRadio;
