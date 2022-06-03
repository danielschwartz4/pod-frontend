import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import Account from "../components/Settings/Account";
import Auth from "../components/Settings/Auth";
import Removal from "../components/Settings/Removal";
import { useMeQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/usIsAuth";

const Settings: React.FC = ({}) => {
  useIsAuth();

  const { data: meData, refetch } = useMeQuery({});

  useEffect(() => {
    refetch();
  }, [meData]);

  return (
    <Layout isProfile={false}>
      <Flex minH={"100vh"} h={"100%"}>
        <VStack
          divider={<Divider />}
          bgColor={"gray.700"}
          mx={"auto"}
          w={"800px"}
        >
          <Box>
            <Account refetch={refetch} meData={meData} />
          </Box>
          <Box>
            <Auth refetch={refetch} meData={meData} />
          </Box>
          <Box>
            <Removal refetch={refetch} meData={meData} />
          </Box>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default Settings;
