import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import Account from "../components/Settings/Account";
import Auth from "../components/Settings/Auth";
import Removal from "../components/Settings/Removal";
import { MeQuery, useMeQuery } from "../generated/graphql";
import avatarMap from "../utils/avatarMap";

const Settings: React.FC = ({}) => {
  const { data: meData } = useMeQuery({});

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
            <Account meData={meData} />
          </Box>
          <Box>
            <Auth meData={meData} />
          </Box>
          <Box>
            <Removal meData={meData} />
          </Box>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default Settings;
