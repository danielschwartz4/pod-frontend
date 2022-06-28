import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import Account from "../components/Settings/Account";
import Auth from "../components/Settings/Auth";
import Messaging from "../components/Settings/Messaging";
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
      <Flex mt={12} minH={"75vh"} h={"100%"}>
        <VStack
          divider={<Divider color={"gray.600"} />}
          bgColor={"gray.700"}
          w={{ base: "100%", md: "auto" }}
          mx={"auto"}
        >
          <Box>
            <Account refetch={refetch} meData={meData} />
          </Box>
          <Box>
            <Messaging meData={meData} />
          </Box>
          <Box>
            <Auth meData={meData} />
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
