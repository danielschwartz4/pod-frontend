import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import DashTabs from "../../components/Dash/DashTabs";
import DashWrapper from "../../components/Dash/DashWrapper";
import { Layout } from "../../components/Layout";

interface TaskHomeProps {}

const TaskHome: React.FC<TaskHomeProps> = ({}) => {
  const [changeTab, useChangeTab] = useState<string>("task");
  const [keepMounted, setKeepMounted] = useState(true);

  return (
    <Layout>
      <DashWrapper>
        <Flex></Flex>
        <DashTabs
          type="task"
          keepMounted={keepMounted}
          useChangeTab={useChangeTab}
          setKeepMounted={setKeepMounted}
        ></DashTabs>
      </DashWrapper>
    </Layout>
  );
};

export default TaskHome;
