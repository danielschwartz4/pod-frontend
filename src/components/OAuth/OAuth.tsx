import { useEffect, useState } from "react";
import {
  OAuthContainer,
  OAuthButton,
  OAuthText,
  OAuthImage,
  OAuthImageContainer,
} from "./styles";
import jwt_decode from "jwt-decode";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../../generated/graphql";
import discord from "../../images/Logos/discordicon.png";
import google from "../../images/Logos/googleicon.jpg";
import fb from "../../images/Logos/fbicon.png";
import reddit from "../../images/Logos/redditicon.png";
import { useRouter } from "next/router";
import { Event } from "../../libs/tracking";
import { GsiButtonConfiguration, OAuthType } from "../../types/types";
import { sendMessage } from "../../utils/messaging/sendMessage";
import GoogleOAuth from "./GoogleOAuth";

interface OAuthProps {
  OAuthType: OAuthType;
}

export const OAuth: React.FC<OAuthProps> = ({ OAuthType }) => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState(false);

  const handleCallbackResponse = async (response) => {
    const userObject = await jwt_decode(response.credential);
    const userEmail = await jwt_decode(response.credential)["email"];
    const userName = await jwt_decode(response.credential)["given_name"];

    Event("Desktop", "Click OAuth Button", "Join the community");

    // login anyway
    const response_login = await login({
      variables: {
        password: "tempGoogle", // TODO: Add other OAuth types and make a more secure password
        email: userEmail,
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login?.user,
          },
        });
      },
    });
    if (response_login?.data?.login.errors) {
      console.log(
        "Login error: " + response_login.data?.login.errors?.at(0).message
      );
    } else if (response_login.data?.login.user) {
      // not sure what the below is
      // if (typeof router.query.next === "string") {
      //   router.push(router.query.next);
      // } else {
      router.push("/profile");
      return; // break from register
      // }
    }

    const response_reg = await register({
      variables: {
        options: {
          username: userName,
          email: userEmail,
          password: "tempGoogle",
          feedback: "",
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.register.user,
          },
        });
      },
    });
    if (response_reg.data.register.errors) {
      console.log(
        "Register error: " + response_reg.data?.register.errors?.at(0).message
      );
    } else if (response_reg?.data?.register?.user) {
      process.env.NODE_ENV === "production"
        ? sendMessage({
            to: "+12173817277",
            body: `${userName} has joined the community! Their email is ${userEmail}`,
          })
        : null;
      router.push("/project-info");
    }
  };

  const handleSignOut = (e) => {
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    // GoogleOAuth();
    /* global google */
    window.google.accounts.id.initialize({
      client_id:
        "53293187080-1of7nrcd2f6dqil7b4qo59hjlkvu333e.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: "300px" } as GsiButtonConfiguration
    );

    window.google.accounts.id.prompt();
  }, []);

  return (
    <OAuthContainer>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        id="signInDiv"
      />
      {/* <OAuthButton>
        <OAuthImageContainer>
          <OAuthImage src="static/react/images/githubicon.png" alt="" />
        </OAuthImageContainer>
        <OAuthText>Continue with Github</OAuthText>
      </OAuthButton> */}
      {/* <OAuthButton id="signInButton">
        <OAuthImageContainer>
          <OAuthImage src={google.src} alt="" />
        </OAuthImageContainer>
        <OAuthText>Continue with Google</OAuthText>
        </OAuthButton> */}
      {/* <OAuthButton>
        <OAuthImageContainer>
          <OAuthImage src={discord.src} alt="" />
        </OAuthImageContainer>
        <OAuthText>Continue with Discord</OAuthText>
      </OAuthButton> */}
      {/* <OAuthButton>
        <OAuthImageContainer>
          <OAuthImage src={fb.src} alt="" />
        </OAuthImageContainer>
        <OAuthText>Continue with Facebook</OAuthText>
      </OAuthButton> */}
      {/* <OAuthButton>
        <OAuthImageContainer>
          <OAuthImage src={reddit.src} alt="" />
        </OAuthImageContainer>
        <OAuthText>Continue with Reddit</OAuthText>
      </OAuthButton> */}
    </OAuthContainer>
  );
};

export default OAuth;
