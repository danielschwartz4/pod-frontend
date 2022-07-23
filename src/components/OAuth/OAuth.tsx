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
import { OAuthType } from "../../types/types";
import { sendMessage } from "../../utils/messaging/sendMessage";
import GoogleOAuth from "./GoogleOAuth";

interface OAuthProps {
  OAuthType: OAuthType;
}

export const OAuth: React.FC<OAuthProps> = ({ OAuthType }) => {
  // console.log(OAuthType);
  const [user, setUser] = useState({});
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleCallbackResponse = async (response) => {
    // TODO
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    Event("Desktop", "Register register.tsx Button", "Join the community");

    console.log(OAuthType);
    if (OAuthType == "register") {
      const response_reg = await register({
        variables: {
          options: {
            username: user["given_name"],
            email: user["email"],
            password: "google",
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

      console.log(response_reg);
      if (response_reg?.data?.register?.user) {
        process.env.NODE_ENV === "production"
          ? sendMessage({
              to: "+12173817277",
              body: `${user["given_name"]} has joined the community! Their email is ${user.email}`,
            })
          : null;
        router.push("/profile");
      }
    } else if (OAuthType == "login") {
      const response_login = await login({
        variables: {
          password: "google", // TODO: Add other OAuth types
          usernameOrEmail: user["email"],
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

      if (response_login.data?.login.user) {
        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        } else {
          router.push("/profile");
        }
      }
    }
  };

  const handleSignOut = (e) => {
    setUser({});
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
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <OAuthContainer>
      <div id="signInDiv" />
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
