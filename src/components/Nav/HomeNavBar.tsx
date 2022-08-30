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
  Tooltip,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import newLogo from "../../images/Logos/newLogo.png";
import discordLogo from "../../images/Logos/discord-icon.svg";
import { Event } from "../../libs/tracking";
import { isServer } from "../../utils/isServer";
import { HelpTaskPopover } from "./HelpTaskPopover";

interface ProfileNavBarProps {
  isProjectsPage?: boolean;
  withHelpPopover?: boolean;
}

export const HomeNavBar: React.FC<ProfileNavBarProps> = ({
  isProjectsPage,
  withHelpPopover,
}) => {
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
        bg={"gray.800"}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"} alignItems={"center"}>
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
                "Click logo button HomeNavBar.tsx",
                "Clicked Logo"
              );
            }}
          />
          <Tooltip
            hasArrow
            label={"Check out the broader community discord!"}
            bg="gray.300"
            color="black"
            placement="bottom"
            fontFamily={"ubuntu"}
          >
            <a href="https://discord.gg/EAvCtmZTre" target={"_blank"}>
              <Image
                cursor={"pointer"}
                h={35}
                w={35}
                ml={5}
                src={discordLogo.src}
                alt=""
                onClick={() => {
                  Event(
                    "Desktop",
                    "Click discord logo button HomeNavBar.tsx",
                    "Clicked discord Logo"
                  );
                }}
              />
            </a>
          </Tooltip>

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
                {!isProjectsPage && withHelpPopover ? (
                  <HelpTaskPopover>
                    <Button
                      mr={4}
                      border={"none"}
                      bgColor={"gray.800"}
                      color={"#FFDC93"}
                      cursor={"pointer"}
                      onClick={() =>
                        Event("Desktop", "Help button HomeNavBar.tsx", "Help")
                      }
                      _hover={{ bg: "gray.700" }}
                    >
                      <BsQuestionSquare size={24} />
                    </Button>
                  </HelpTaskPopover>
                ) : null}
                <Button
                  border={"none"}
                  bgColor={"#FFDC93"}
                  color={"gray.800"}
                  borderRadius={"16px"}
                  cursor={"pointer"}
                  fontFamily={"ubuntu"}
                  onClick={() => router.push("/settings")}
                  mr={4}
                  _hover={{ bg: "#ffecc4" }}
                >
                  {data?.me?.username}
                </Button>
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
                      "Click my projects button HomeNavBar.tsx",
                      "My projects"
                    );
                  }}
                >
                  My projects
                </Button>
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
                <a
                  href="https://discord.gg/EAvCtmZTre"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    border={"none"}
                    textColor={"gainsboro"}
                    cursor={"pointer"}
                    bgColor={"#FFDC93"}
                    color={"gray.800"}
                    borderRadius={"16px"}
                    fontFamily={"ubuntu"}
                    _hover={{ bg: "#ffecc4" }}
                    onClick={() => {
                      router.push("/register");
                      Event(
                        "Desktop",
                        "Register HomeNavBar Button",
                        "Join the community"
                      );
                    }}
                    mr={"1em"}
                  >
                    Sign up
                  </Button>
                </a>
                <a
                  href="https://discord.gg/EAvCtmZTre"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    border={"none"}
                    bgColor={"gray.800"}
                    color={"#FFDC93"}
                    borderRadius={"16px"}
                    cursor={"pointer"}
                    fontFamily={"ubuntu"}
                    _hover={{ bg: "gray.700" }}
                    onClick={() => {
                      router.push("/login");
                      Event("Desktop", "Login button", "Login");
                    }}
                  >
                    Login
                  </Button>
                </a>
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
                    onClick={() => router.push("/settings")}
                    fontFamily={"ubuntu"}
                    cursor={"pointer"}
                  >
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
                    fontFamily={"ubuntu"}
                  >
                    My projects
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
                  {!isProjectsPage && withHelpPopover ? (
                    <HelpTaskPopover>
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
                    </HelpTaskPopover>
                  ) : null}
                </Flex>
                {/* <Divider /> */}
              </Box>
            </>
          ) : (
            <>
              <Box bg={"gray.800"} fontSize={18} color={"gainsboro"}>
                <Flex mr={6} justifyContent={"end"}>
                  <a
                    href="https://discord.gg/EAvCtmZTre"
                    style={{ textDecoration: "none" }}
                  >
                    <Text
                      textColor={"gainsboro"}
                      color={"gainsboro"}
                      cursor={"pointer"}
                      fontFamily={"ubuntu"}
                      onClick={() => {
                        router.push("/register");
                        Event(
                          "Mobile",
                          "Register HomeNavBar Button",
                          "Join the community"
                        );
                      }}
                    >
                      Join the community!
                    </Text>
                  </a>
                </Flex>

                <Divider />
                <a
                  href="https://discord.gg/EAvCtmZTre"
                  style={{ textDecoration: "none" }}
                >
                  <Flex mr={6} justifyContent={"end"}>
                    <Text
                      textColor={"gainsboro"}
                      colorScheme={"tan"}
                      cursor={"pointer"}
                      fontFamily={"ubuntu"}
                      onClick={() => {
                        {
                          router.push("/login");
                          Event("Mobile", "Login Button", "Login");
                        }
                      }}
                    >
                      Login
                    </Text>
                  </Flex>
                </a>
              </Box>
            </>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};
