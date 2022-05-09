import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer/Footer";
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
    <Box margin={"auto"} bg={"gray.800"} m={-2} w={"fit-content"}>
      {!isProfile ? <HomeNavBar /> : <ProfileNavBar />}
      <Wrapper variant={variant}>{children}</Wrapper>
      <Box mt={16}>
        <Footer />
      </Box>
    </Box>
  );
};
