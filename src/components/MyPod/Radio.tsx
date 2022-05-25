import { Box, Flex } from "@chakra-ui/react";

interface podRadioProps {
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
}

const PodRadio: React.FC<podRadioProps> = (props) => {
  return (
    <Flex>
      <Box onClick={() => props.setIsRandom(false)}>
        <RadioCard isChecked={!props.isRandom}>Friend Pod</RadioCard>
      </Box>
      <Box onClick={() => props.setIsRandom(true)}>
        <RadioCard isChecked={props.isRandom}>Random Pod</RadioCard>
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
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg={props.isChecked ? "#7e9cd6" : "#3766c4"}
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
