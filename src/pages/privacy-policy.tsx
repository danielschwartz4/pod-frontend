import { Box, Divider, Flex, Text, Image, Stack } from "@chakra-ui/react";
import React from "react";
import { HomeNavBar } from "../components/Nav/HomeNavBar";
import { Font } from "../css/styles";

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({}) => {
  return (
    <Box
      margin={"auto"}
      height={"auto"}
      bg={"gray.800"}
      m={-2}
      paddingBottom={20}
    >
      <HomeNavBar />
      <Flex justifyContent={"center"}>
        <Stack width={"65%"} mt={10} mx={150}>
          <Flex justifyContent={"center"}>
            <Font style={{ fontSize: "36px" }}>
              <b>Privacy Policy</b>
            </Font>
          </Flex>
          <br />
          <Font textAlign="center">
            Daniel Schwartz, Kevin Huang, and collaborators built the poddds
            website as a Free website. This SERVICE is provided by poddds at no
            cost and is intended for use as is. This document is used to inform
            visitors regarding our policies with the collection, use, and
            disclosure of Personal Information if anyone decided to use our
            Service.
          </Font>
          <Font>
            If you choose to use our Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that we collect is used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy.{" "}
          </Font>
          <br />
          <Font>
            <b>Information Collection and Use</b>
          </Font>
          <Font>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to name, email, and push notifications.
            The information that we request will be retained on your device and
            is not collected by me in any way.{" "}
          </Font>
          <br />
          <Font>
            <b>Cookies</b>
          </Font>
          <Font>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory. This Service does not use these “cookies” explicitly.
            However, the app may use third party code and libraries that use
            “cookies” to collect information and improve their services. You
            have the option to either accept or refuse these cookies and know
            when a cookie is being sent to your device. If you choose to refuse
            our cookies, you may not be able to use some portions of this
            Service.
          </Font>
          <br />
          <Font>
            <b>Security</b>
          </Font>
          <Font>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </Font>
          <br />
          <Font>
            <b>Children’s Privacy</b>
          </Font>
          <Font>
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13. In the case we do discover that a child under 13 has
            provided me with personal information, we will immediately delete
            this from our servers. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact me so that we will be able to do the necessary
            actions.
          </Font>
          <br />
          <Font>
            <b>Changes to This Privacy Policy</b>
          </Font>
          <Font>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. These changes are effective immediately after they are posted
            on this page.
          </Font>
          <br />
          <Font>
            <b>Contact Us</b>
          </Font>
          <Font>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at schwartzray8@gmail.com.
          </Font>
        </Stack>
      </Flex>
    </Box>
  );
};

export default PrivacyPolicy;
