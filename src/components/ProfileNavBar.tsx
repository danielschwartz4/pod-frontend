import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import firstLogo from "../images/Logos/firstLogo.png";
import { isServer } from "../utils/isServer";

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
              justify={"end"}
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
                {!isProjectsPage ? (
                  <Button
                    mr={4}
                    colorScheme={"tan"}
                    cursor={"pointer"}
                    onClick={() => router.push("/profile")}
                  >
                    My projects
                  </Button>
                ) : null}
                <Button
                  onClick={() => {
                    logout({
                      update: (cache) => {
                        cache.evict({ id: "User:" + data?.me.id });
                      },
                    });
                  }}
                  isLoading={logoutLoading}
                  colorScheme={"tan"}
                  type="button"
                  cursor={"pointer"}
                >
                  Logout
                </Button>
              </Flex>
              {/* <DesktopNav /> */}
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
        <Stack
          bg={useColorModeValue("white", "gray.800")}
          p={4}
          display={{ md: "none" }}
        >
          {data?.me ? (
            // <Flex
            //   display={{ base: "none", md: "flex" }}
            //   flex={1}
            //   justify={"end"}
            //   ml={10}
            //   alignItems={"center"}
            // >
            // <Flex
            //   w={"100%"}
            //   position={"relative"}
            //   justifyContent={"end"}
            //   alignItems={"center"}
            // >
            <Box>
              <Box fontSize={18} mr={6} color={"gainsboro"}>
                {data?.me?.username}
              </Box>
              {!isProjectsPage ? (
                <Button
                  mr={4}
                  colorScheme={"tan"}
                  cursor={"pointer"}
                  onClick={() => router.push("/profile")}
                >
                  My projects
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  logout({
                    update: (cache) => {
                      cache.evict({ id: "User:" + data?.me.id });
                    },
                  });
                }}
                isLoading={logoutLoading}
                colorScheme={"tan"}
                type="button"
                cursor={"pointer"}
              >
                Logout
              </Button>
            </Box>
          ) : (
            // </Flex>
            // </Flex>
            <></>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = (data, isProjectsPage, logout, logoutLoading) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {data?.me ? (
        <Flex
          display={{ base: "none", md: "flex" }}
          flex={1}
          justify={"end"}
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
            {!isProjectsPage ? (
              <Button
                mr={4}
                colorScheme={"tan"}
                cursor={"pointer"}
                onClick={() => router.push("/profile")}
              >
                My projects
              </Button>
            ) : null}
            <Button
              onClick={() => {
                logout({
                  update: (cache) => {
                    cache.evict({ id: "User:" + data?.me.id });
                  },
                });
              }}
              isLoading={logoutLoading}
              colorScheme={"tan"}
              type="button"
              cursor={"pointer"}
            >
              Logout
            </Button>
          </Flex>
          {/* <DesktopNav /> */}
        </Flex>
      ) : (
        <></>
      )}
      {/* {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))} */}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];

// import { Box, Button, Flex, Image } from "@chakra-ui/react";
// import NextLink from "next/link";
// import router, { useRouter } from "next/router";
// import React from "react";
// import { useLogoutMutation, useMeQuery } from "../generated/graphql";
// import firstLogo from "../images/Logos/firstLogo.png";
// import { isServer } from "../utils/isServer";

// interface ProfileNavBarProps {
//   isProjectsPage?: boolean;
// }

// export const ProfileNavBar: React.FC<ProfileNavBarProps> = ({
//   isProjectsPage = false,
// }) => {
// const [logout, { loading: logoutLoading }] = useLogoutMutation();
// const { data, loading, error } = useMeQuery({
//   // !! Look up wtf this is!!!!!!!!
//   skip: isServer(),
// });
// const { isReady } = useRouter();

//   let body = null;

//   if (loading || !isReady) {
//   } else if (!data?.me) {
//     body = (
//       <Flex w={"100%"} justifyContent={"end"}>
//         <Button
//           textColor={"gainsboro"}
//           color={"gainsboro"}
//           cursor={"pointer"}
//           onClick={() => router.push("/register")}
//           mr={"1em"}
//         >
//           Join the community!
//         </Button>
//         <Button
//           textColor={"gainsboro"}
//           color={"gainsboro"}
//           cursor={"pointer"}
//           onClick={() => router.push("/login")}
//         >
//           Login
//         </Button>
//       </Flex>
//     );
//   } else {
//     body = (
//       <>
//         <Flex w={"100%"} textColor={"gainsboro"}>
// <Flex>
// <NextLink href="/">
//   <Image
//     cursor={"pointer"}
//     h={70}
//     w={200}
//     src={firstLogo.src}
//     alt=""
//     mr={4}
//   />
// </NextLink>
// </Flex>
// <Flex
//   w={"100%"}
//   position={"relative"}
//   justifyContent={"end"}
//   alignItems={"center"}
// >
//   <Box fontSize={18} mr={6} color={"gainsboro"}>
//     {data.me.username}
//   </Box>
//   {!isProjectsPage ? (
//     <Button
//       mr={4}
//       colorScheme={"tan"}
//       cursor={"pointer"}
//       onClick={() => router.push("/profile")}
//     >
//       My projects
//     </Button>
//   ) : null}
//   <Button
//     onClick={() => {
//       logout({
//         update: (cache) => {
//           cache.evict({ id: "User:" + data?.me.id });
//         },
//       });
//     }}
//     isLoading={logoutLoading}
//     colorScheme={"tan"}
//     type="button"
//     cursor={"pointer"}
//   >
//     Logout
//   </Button>
// </Flex>
//         </Flex>
//       </>
//     );
//   }

//   return (
//     <Flex
//       zIndex={1}
//       position="sticky"
//       bg={"gray.800"}
//       px="6"
//       py="5"
//       align="center"
//       justify="space-between"
//     >
//       {body}
//     </Flex>
//   );
// };
