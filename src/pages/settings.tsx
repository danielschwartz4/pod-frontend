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

interface accountProps {
  meData: MeQuery;
}

const Account: React.FC<accountProps> = ({ meData }) => {
  return (
    <Flex
      textColor={"gray.500"}
      fontSize={"lg"}
      justifyContent={"space-between"}
      direction={"column"}
      m={4}
      p={4}
      bg={"gray.800"}
      w={"500px"}
      h={"300px"}
      rounded={"lg"}
    >
      {/* <Box alignItems={"center"}> */}
      <Entry title="USERNAME" meData={meData} data={"username"} />
      <Entry title="EMAIL" meData={meData} data={"email"} />
      <Entry
        removable={true}
        title="PHONE NUMBER"
        meData={meData}
        data={"phone"}
      />
      <Box>
        <Avatar src={avatarMap(meData?.me?.avatar)} alt={"Author"} />
      </Box>
      {/* </Box> */}
    </Flex>
  );
};

interface entryProps extends accountProps {
  title: string;
  data: any;
  removable?: boolean;
}

const Entry: React.FC<entryProps> = ({ meData, title, data, removable }) => {
  return (
    <Flex alignItems={"center"}>
      <Box>
        <Text>
          <b> {title} </b>
        </Text>
        {meData?.me?.[data] != null && meData?.me?.[data] != "" ? (
          <Text mt={"-.8em"} textColor={"gainsboro"}>
            {meData?.me?.[data]}
          </Text>
        ) : (
          <Text mt={"-.8em"} textColor={"gainsboro"}>
            Not set
          </Text>
        )}
      </Box>
      <Flex alignItems={"center"} textColor={"gainsboro"} ml={"auto"}>
        {removable ? (
          <Text cursor={"pointer"} onClick={() => console.log("hello")}>
            <b> remove </b>
          </Text>
        ) : (
          <></>
        )}

        <Button
          ml={removable ? "1em" : "0"}
          textColor={"gainsboro"}
          bg={"gray.600"}
          cursor={"ponter"}
          variant={"flat"}
        >
          <Text>Edit</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

interface authProps extends accountProps {}

const Auth: React.FC<authProps> = ({}) => {
  return <Box></Box>;
};

interface removalProps extends accountProps {}

const Removal: React.FC<removalProps> = ({}) => {
  // !! Cascading delete
  return <Box></Box>;
};

export default Settings;
