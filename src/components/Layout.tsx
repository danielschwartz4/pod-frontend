import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer/Footer";
import { HomeNavBar } from "./Home/HomeNavBar";
import { ProfileNavBar } from "./ProfileNavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  isProfile?: boolean;
  isProjectsPage?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  isProfile = false,
  isProjectsPage = false,
}) => {
  return (
    <Box margin={"auto"} bg={"gray.800"} m={-2}>
      {!isProfile ? (
        <HomeNavBar />
      ) : (
        <ProfileNavBar isProjectsPage={isProjectsPage} />
      )}
      <Wrapper variant={variant}>{children}</Wrapper>
      <Box mt={16}>
        <Footer />
      </Box>
    </Box>
  );
};
