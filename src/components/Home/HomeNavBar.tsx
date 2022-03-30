import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

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
      <Flex>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <>
        <Flex alignItems={"center"}>
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
      </>
    );
  }

  return (
    <Flex
      zIndex={2}
      position="sticky"
      top={0}
      bg="gray.600"
      ml={"auto"}
      p={8}
      m={-2}
    >
      <Box mr={2} ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};
