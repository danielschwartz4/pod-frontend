import { Box, Button, Flex, HStack, Image, Link } from "@chakra-ui/react";
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
        <Flex w={"100%"} textColor={"gainsboro"}>
          <Flex>
            <NextLink href="/">
              <Image
                cursor={"pointer"}
                h={70}
                w={200}
                src={firstLogo.src}
                alt=""
              />
            </NextLink>
          </Flex>
          <Flex
            w={"100%"}
            position={"relative"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <Box fontSize={18} mr={6} color={"gainsboro"}>
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
      bg={"gray.800"}
      m={-2}
      px="6"
      py="5"
      align="center"
      justify="space-between"
    >
      {body}
    </Flex>
  );
};
