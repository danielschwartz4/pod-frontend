import { Flex, Box, Avatar } from "@chakra-ui/react";
import React from "react";
import { MeQuery, ProjectQuery } from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import Entry from "./Entry";

export interface accountProps {
  meData: MeQuery;
  refetch: () => void;
}

const Account: React.FC<accountProps> = ({ meData, refetch }) => {
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
      <Entry
        refetch={refetch}
        title="USERNAME"
        meData={meData}
        data={"username"}
      />
      <Entry refetch={refetch} title="EMAIL" meData={meData} data={"email"} />
      <Entry
        refetch={refetch}
        removable={true}
        title="PHONE NUMBER"
        meData={meData}
        data={"phone"}
        editable
      >
        {/* <Button
          ml={"1em"}
          textColor={"gainsboro"}
          bg={"gray.600"}
          cursor={"pointer"}
        >
          <Text>Edit</Text>
        </Button> */}
      </Entry>
      <Box mt={2} mb={4}>
        <Avatar src={avatarMap(meData?.me?.avatar)} alt={"Author"} />
      </Box>
    </Flex>
  );
};

export default Account;
