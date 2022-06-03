import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import Account from "../components/Settings/Account";
import Auth from "../components/Settings/Auth";
import Removal from "../components/Settings/Removal";
import { useMeQuery } from "../generated/graphql";
import { useGetProjectFromUrl } from "../utils/useGetProjectFromUrl";

const Settings: React.FC = ({}) => {
  const { data: meData } = useMeQuery({});
  const { data: projectData } = useGetProjectFromUrl();

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
            <Account projectData={projectData} meData={meData} />
          </Box>
          <Box>
            <Auth projectData={projectData} meData={meData} />
          </Box>
          <Box>
            <Removal projectData={projectData} meData={meData} />
          </Box>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default Settings;
