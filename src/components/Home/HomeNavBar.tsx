import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import firstLogo from "../../images/Logos/firstLogo.png";
import { isServer } from "../../utils/isServer";

interface ProfileNavBarProps {
  isProjectsPage?: boolean;
}

export const HomeNavBar: React.FC<ProfileNavBarProps> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  const { isReady } = useRouter();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <NextLink href="/">
            <Image
              cursor={"pointer"}
              h={70}
              w={200}
              src={firstLogo.src}
              alt=""
              mr={4}
            />
          </NextLink>

          {data?.me ? (
            <Flex
              display={{ base: "none", md: "flex" }}
              flex={1}
              ml={10}
              alignItems={"center"}
            >
              <Flex
                w={"100%"}
                position={"relative"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box fontSize={18} mr={6} color={"gainsboro"}>
                  {data?.me?.username}
                </Box>
                <Button
                  mr={4}
                  colorScheme={"tan"}
                  cursor={"pointer"}
                  onClick={() => router.push("/profile")}
                >
                  My projects
                </Button>
                <Button
                  onClick={() => {
                    logout({
                      update: (cache) => {
                        cache.evict({ id: "User:" + data?.me.id });
                      },
                    });
                  }}
                  isloading={logoutLoading.toString()}
                  colorScheme={"tan"}
                  type="button"
                  cursor={"pointer"}
                >
                  Logout
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Flex
              display={{ base: "none", md: "flex" }}
              flex={1}
              ml={10}
              alignItems={"center"}
            >
              <Flex
                w={"100%"}
                position={"relative"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Button
                  textColor={"gainsboro"}
                  cursor={"pointer"}
                  onClick={() => router.push("/register")}
                  mr={"1em"}
                >
                  Join the community!
                </Button>
                <Button
                  textColor={"gainsboro"}
                  cursor={"pointer"}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          justify={"end"}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      {/* !! MOBILE ----------------------------------- */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg={useColorModeValue("white", "gray.800")}
          p={4}
          display={{ md: "none" }}
        >
          {data?.me ? (
            <>
              <Flex
                justifyContent={"end"}
                fontSize={18}
                mr={6}
                color={"gainsboro"}
              >
                <Text colorScheme={"tan"} color={"gainsboro"} fontSize={18}>
                  {data?.me?.username}
                </Text>
              </Flex>
              <Divider />
              <Flex justify={"end"}>
                <Text
                  mr={6}
                  colorScheme={"tan"}
                  cursor={"pointer"}
                  onClick={() => router.push("/profile")}
                  color={"gainsboro"}
                  fontSize={18}
                >
                  <b>My projects</b>
                </Text>
              </Flex>
              <Divider />
              <Flex justifyContent={"end"}>
                <Text
                  mr={6}
                  onClick={() => {
                    logout({
                      update: (cache) => {
                        cache.evict({ id: "User:" + data?.me.id });
                      },
                    });
                  }}
                  isloading={logoutLoading.toString()}
                  fontSize={18}
                  type="button"
                  variant={"link"}
                  color={"gainsboro"}
                >
                  <b>Logout</b>
                </Text>
              </Flex>
              <Divider />
            </>
          ) : (
            <>
              <Box fontSize={18} color={"gainsboro"}>
                <Flex mr={6} justifyContent={"end"}>
                  <Text
                    textColor={"gainsboro"}
                    color={"gainsboro"}
                    cursor={"pointer"}
                    onClick={() => router.push("/register")}
                  >
                    Join the community!
                  </Text>
                </Flex>

                <Divider />
                <Flex mr={6} justifyContent={"end"}>
                  <Text
                    textColor={"gainsboro"}
                    colorScheme={"tan"}
                    cursor={"pointer"}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Text>
                </Flex>
              </Box>
            </>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};
