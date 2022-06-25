import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer/Footer";
import { HomeNavBar } from "./Nav/HomeNavBar";
import { ProfileNavBar } from "./Nav/ProfileNavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  isProfile?: boolean;
  isProjectsPage?: boolean;
  withHelpPopover?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  isProfile = false,
  isProjectsPage = false,
  withHelpPopover = false,
}) => {
  return (
    <Box margin={"auto"} bg={"gray.800"} m={-2}>
      {!isProfile ? (
        <HomeNavBar withHelpPopover={withHelpPopover} />
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
