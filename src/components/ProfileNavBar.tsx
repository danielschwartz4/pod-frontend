import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import firstLogo from "../images/Logos/firstLogo.png";
import { isServer } from "../utils/isServer";

interface ProfileNavBarProps {}

export const ProfileNavBar: React.FC<ProfileNavBarProps> = ({}) => {
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });
  const { isReady } = useRouter();

  let body = null;

  if (loading || !isReady) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex fontSize={28} mt={6} ml={12} align={"center"}>
          <Box>
            <NextLink href="/">
              {/* <Link style={{ textDecoration: "none" }}> */}
              <Image
                cursor={"pointer"}
                h={70}
                w={140}
                src={firstLogo.src}
                alt=""
              />
              {/* </Link> */}
            </NextLink>
          </Box>
          <Flex align={"center"} ml={"80vw"}>
            <Box fontSize={18} mr={6}>
              {data.me.username}
            </Box>
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
        </Flex>
      </>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      // bgGradient="linear(red.100 10%, orange.100 25%, yellow.100 50%)"
      bg={"gray.800"}
      ml={"auto"}
      pt={2}
      height={"10vh"}
      m={-2}
    >
      <Box mr={2}>{body}</Box>
    </Flex>
  );
};
