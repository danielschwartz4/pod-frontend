import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Image,
  Stack,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import newLogo from "../../images/Logos/newLogo.png";
import PrivacyPolicy from "../../pages/privacy-policy";

export default function LargeWithNewsletter() {
  return (
    <Flex
      bg={"gray.800"}
      height="80px"
      display={["block", "flex"]}
      textColor={"#F5F5F5"}
      fontSize={"20px"}
      fontFamily={"ubuntu"}
    >
      <Flex
        fontSize={{ base: "10px", sm: "20px" }}
        justifyContent={"space-between"}
        alignItems="center"
        mx={"auto"}
      >
        <Text mx={2}>Est. 2022 </Text>
        {" | "}
        <Image mx={2} cursor={"pointer"} w={100} src={newLogo.src} alt="" />
        {" | "}
        <Box mx={2}>
          <Text as="span"> schwartzray8@gmail.com</Text>
          {/* Don't know how to make this look good lol */}
          {/* <Text as="span"> 1kevin.huang@gmail.com</Text> */}
        </Box>
        {" | "}
        <Box mx={2}>
          <NextLink href="/privacy-policy">
            <Link> Privacy Policy</Link>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
}
