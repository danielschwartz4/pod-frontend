import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { MeQuery, ProjectQuery } from "../../generated/graphql";
import avatarMap from "../../utils/avatarMap";
import Entry from "./Entry";
import Section from "./Section";

export interface accountProps {
  meData: MeQuery;
  refetch?: () => void;
}

const Account: React.FC<accountProps> = ({ meData, refetch }) => {
  return (
    <Section>
      <Flex display={["block", "flex"]} mt={-4} alignItems={"center"}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>USER INFO</b>
        </Text>
        <Avatar
          ml={"auto"}
          src={avatarMap(meData?.me?.avatar)}
          alt={"Author"}
        />
      </Flex>
      <Entry
        refetch={refetch}
        title="USERNAME"
        meData={meData}
        data={"username"}
      />
      <Entry refetch={refetch} title="EMAIL" meData={meData} data={"email"} />
      <Entry
        refetch={refetch}
        title="PHONE NUMBER"
        meData={meData}
        data={"phone"}
        editable
        removable
      />
    </Section>
  );
};

export default Account;
