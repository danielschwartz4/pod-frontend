import { Box, Flex, useColorModeValue, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import newLogo from "../../images/Logos/newLogo.png";

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
      <Flex justifyContent={"space-between"} alignItems="center" mx={"auto"}>
        <Text mx={2}>Est. 2022</Text>
        <Image mx={2} cursor={"pointer"} w={100} src={newLogo.src} alt="" />
        <Text mx={2} as="span">
          | Contact: schwartzray8@gmail.com
        </Text>
      </Flex>
    </Flex>
  );
}

//  <Flex mt={"auto"} mb={4} ml={4}>
// <NextLink href="/">
//   <Image cursor={"pointer"} w={200} src={newLogo.src} alt="" />
// </NextLink>
//       </Flex>
//       <Flex
//         ml={"auto"}
//         mb={4}
//         mr={8}
//         mt={"auto"}
//         fontSize={["sm", "md", "lg", "xl"]}
//         alignItems={"center"}
//         display={{ base: "block", md: "flex" }}
//       >
//         {/* Contact for questions or suggestions:&nbsp; */}
//         Contact:&nbsp;
//         <Text fontSize={[14, 24]}>
// <a href="mailto:">
//   <Text fontSize={[14, 24]} as="span" color="blue.400">
//     schwartzray8@gmail.com
//   </Text>
// </a>
//         </Text>
//       </Flex>
