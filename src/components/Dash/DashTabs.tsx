import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

interface DashTabsProps {
  type: "project" | "task";
  keepMounted: boolean;
  useChangeTab: React.Dispatch<React.SetStateAction<string>>;
  setKeepMounted: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashTabs: React.FC<DashTabsProps> = ({
  type,
  children,
  keepMounted,
  useChangeTab,
  setKeepMounted,
}) => {
  return (
    <Tabs
      border={{ base: "none", md: "1px solid #7e9cd6" }}
      borderRadius={"lg"}
      w={{ base: "100%", md: "800px", lg: "1024px" }}
      isFitted={true}
      variant="enclosed"
      align={"center"}
      defaultIndex={0}
      // ? Made isLazy so tab rerenders flow since flow only appears correctly upon rendering
      isLazy
      lazyBehavior={keepMounted ? "keepMounted" : "unmount"}
    >
      <TabList mb="1em">
        <Tab
          onClick={() => {
            useChangeTab(type);
            setKeepMounted(true);
          }}
          _selected={{ color: "white", bg: "#1a202c" }}
        >
          My {type}
        </Tab>
        <Tab
          onClick={() => {
            useChangeTab("pod");
            setKeepMounted(true);
          }}
          _selected={{ color: "white", bg: "#1a202c" }}
        >
          My pod
        </Tab>
      </TabList>
      {children}
    </Tabs>
  );
};

export default DashTabs;
