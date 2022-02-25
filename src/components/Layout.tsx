import React from "react";
import { NavBar } from "./NavBar";
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
      {!isProfile ? <NavBar /> : <ProfileNavBar />}
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
