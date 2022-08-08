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
import { BsQuestionSquare } from "react-icons/bs";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import newLogo from "../../images/Logos/newLogo.png";
import { isServer } from "../../utils/isServer";
import { HelpProjectPopover } from "./HelpProjectPopover";
import { Event } from "../../libs/tracking";

interface ProfileNavBarProps {
  isProjectsPage?: boolean;
}

export const ProfileNavBar: React.FC<ProfileNavBarProps> = ({
  isProjectsPage = false,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });

  const { isReady } = useRouter();

  return (
    <Box bg={"gray.800"} fontSize={18} color={"gainsboro"}>
      <Flex
        bg={"gray.800"}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <NextLink href="/profile">
            <Image
              cursor={"pointer"}
              h={50}
              w={200}
              src={newLogo.src}
              alt=""
              onClick={() => {
                router.push("/");
                Event(
                  "Desktop",
                  "Logo button ProfileNavBar.tsx",
                  "Clicked Logo"
                );
              }}
            />
          </NextLink>

          {data?.me ? (
            <Flex
              display={{ base: "none", md: "flex" }}
              flex={1}
              ml={10}
              alignItems={"center"}
              bg={"gray.800"}
            >
              <Flex
                w={"100%"}
                position={"relative"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                {!isProjectsPage ? (
                  <HelpProjectPopover>
                    <Button
                      mr={4}
                      border={"none"}
                      bgColor={"gray.800"}
                      color={"#FFDC93"}
                      cursor={"pointer"}
                      onClick={() => {
                        router.push("/profile");
                        Event(
                          "Desktop",
                          "Help button ProfileNavBar.tsx",
                          "Help"
                        );
                      }}
                      _hover={{ bg: "gray.700" }}
                    >
                      <BsQuestionSquare size={24} />
                    </Button>
                  </HelpProjectPopover>
                ) : null}

                <Button
                  border={"none"}
                  bgColor={"#FFDC93"}
                  color={"gray.800"}
                  borderRadius={"16px"}
                  cursor={"pointer"}
                  fontFamily={"ubuntu"}
                  _hover={{ bg: "#ffecc4" }}
                  onClick={() => router.push("/settings")}
                  mr={4}
                >
                  {data?.me?.username}
                </Button>
                {!isProjectsPage ? (
                  <Button
                    border={"none"}
                    bgColor={"#FFDC93"}
                    color={"gray.800"}
                    borderRadius={"16px"}
                    cursor={"pointer"}
                    fontFamily={"ubuntu"}
                    mr={4}
                    _hover={{ bg: "#ffecc4" }}
                    onClick={() => {
                      router.push("/profile");
                      Event(
                        "Desktop",
                        "My projects button HomeNavBar.tsx",
                        "My projects"
                      );
                    }}
                  >
                    My projects
                  </Button>
                ) : null}
                <Button
                  border={"none"}
                  bgColor={"gray.800"}
                  color={"#FFDC93"}
                  borderRadius={"16px"}
                  cursor={"pointer"}
                  fontFamily={"ubuntu"}
                  _hover={{ bg: "gray.700" }}
                  isLoading={logoutLoading}
                  onClick={() => {
                    Event("Desktop", "Logout button HomeNavBar.tsx", "Logout");
                    logout({
                      update: (cache) => {
                        cache.evict({ id: "User:" + data?.me.id });
                      },
                    });
                  }}
                >
                  Logout
                </Button>
              </Flex>
            </Flex>
          ) : (
            <></>
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
          m={4}
          display={{ md: "none" }}
        >
          {data?.me ? (
            <>
              <Box bg={"gray.800"} fontSize={18} color={"gainsboro"}>
                <Flex
                  justifyContent={"end"}
                  fontSize={18}
                  mr={6}
                  color={"gainsboro"}
                >
                  <Text
                    colorScheme={"tan"}
                    color={"gainsboro"}
                    fontSize={18}
                    fontFamily={"ubuntu"}
                    onClick={() => router.push("/settings")}
                    cursor={"pointer"}
                  >
                    {data?.me?.username}
                  </Text>
                </Flex>
                {!isProjectsPage ? <Divider /> : null}
                <Flex justifyContent={"end"}>
                  {!isProjectsPage ? (
                    <Text
                      mr={6}
                      colorScheme={"tan"}
                      cursor={"pointer"}
                      onClick={() => router.push("/profile")}
                      color={"gainsboro"}
                      fontSize={18}
                      fontFamily={"ubuntu"}
                      _hover={{ bg: "#ffecc4" }}
                    >
                      My projects
                    </Text>
                  ) : null}
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
                    isLoading={logoutLoading}
                    fontSize={18}
                    type="button"
                    variant={"link"}
                    color={"gainsboro"}
                    fontFamily={"ubuntu"}
                    cursor={"pointer"}
                  >
                    Logout
                  </Text>
                </Flex>
                <Divider />
                <Flex justifyContent={"end"}>
                  {!isProjectsPage ? (
                    <HelpProjectPopover>
                      <Button
                        mr={4}
                        colorScheme={"tan"}
                        cursor={"pointer"}
                        border={"none"}
                        bgColor={"gray.800"}
                        color={"gainsboro"}
                      >
                        <BsQuestionSquare size={24} />
                      </Button>
                    </HelpProjectPopover>
                  ) : null}
                </Flex>
              </Box>
            </>
          ) : (
            <></>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};
