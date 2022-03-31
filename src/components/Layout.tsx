import { Box } from "@chakra-ui/react";
import React from "react";
import { HomeNavBar } from "./Home/HomeNavBar";
import { ProfileNavBar } from "./ProfileNavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  isProfile?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  isProfile = false,
}) => {
  return (
    <>
      <Box w={"100vw"}>{!isProfile ? <HomeNavBar /> : <ProfileNavBar />}</Box>

      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
