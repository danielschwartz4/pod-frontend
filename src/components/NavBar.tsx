import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading, error } = useMeQuery({
    // !! Look up wtf this is!!!!!!!!
    skip: isServer(),
  });

  let body = null;

  if (loading) {
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
        <Flex>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            onClick={() => {
              logout({
                update: (cache) => {
                  cache.evict({ id: "User:" + data?.me.id });
                },
              });
            }}
            isLoading={logoutLoading}
            colorScheme={"blue"}
            variant="link"
          >
            Logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" ml={"auto"} p={4}>
      <Box mr={2} ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};
