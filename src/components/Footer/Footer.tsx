import { Box, Flex, useColorModeValue, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import firstLogo from "../../images/Logos/firstLogo.png";

export default function LargeWithNewsletter() {
  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      height="20vh"
      display={["block", "flex"]}
      alignItems="center"
    >
      <Flex mt={"auto"} mb={4} ml={4}>
        <NextLink href="/">
          <Image cursor={"pointer"} w={200} src={firstLogo.src} alt="" />
        </NextLink>
      </Flex>
      <Flex
        ml={"auto"}
        mb={4}
        mr={8}
        mt={"auto"}
        fontSize={["sm", "md", "lg", "xl"]}
        alignItems={"center"}
        display={{ base: "block", md: "flex" }}
      >
        {/* Contact for questions or suggestions:&nbsp; */}
        Contact:&nbsp;
        <Text fontSize={[14, 24]}>
          <a href="mailto:">
            <Text fontSize={[14, 24]} as="span" color="blue.400">
              schwartzray8@gmail.com
            </Text>
          </a>
        </Text>
      </Flex>
    </Flex>
  );
}
