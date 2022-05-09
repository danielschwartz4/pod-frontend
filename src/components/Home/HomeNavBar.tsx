import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import firstLogo from "../../images/Logos/firstLogo.png";

interface HomeNavBarProps {}

export const HomeNavBar: React.FC<HomeNavBarProps> = ({}) => {
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
      <Flex w={"100%"} justifyContent={"end"}>
        <Button
          textColor={"gainsboro"}
          color={"gainsboro"}
          cursor={"pointer"}
          onClick={() => router.push("/register")}
          mr={"1em"}
        >
          Join the community!
        </Button>
        <Button
          textColor={"gainsboro"}
          color={"gainsboro"}
          cursor={"pointer"}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Flex>
    );
  } else {
    body = (
      // <>
      <Flex w={"100%"} textColor={"gainsboro"}>
        <Flex
          w={"100%"}
          position={"relative"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <Box mr={6} fontSize={18}>
            {data.me.username}
          </Box>
          <NextLink href="/profile">
            <Link href="/profile" mr={6}>
              My projects
            </Link>
          </NextLink>
          <Button
            onClick={() => {
              logout({
                update: (cache) => {
                  cache.evict({ id: "User:" + data?.me.id });
                },
              });
            }}
            isLoading={logoutLoading}
            colorScheme={"#54BAB9"}
            variant="solid"
            cursor={"pointer"}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      // </>
    );
  }

  return (
    <Flex
      zIndex={2}
      position="sticky"
      // bg={"gray.800"}
      bg={"radial-gradient(#f67a3d, transparent)"}
      mt={-2}
      px="6"
      py="5"
      align="center"
      justify="space-between"
    >
      <Flex>
        <NextLink href="/">
          <Image cursor={"pointer"} h={70} w={200} src={firstLogo.src} alt="" />
        </NextLink>
      </Flex>
      {body}
    </Flex>
  );
};
