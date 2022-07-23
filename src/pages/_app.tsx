import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ColorModeProvider, ThemeProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import "../css/DatePickerInput.css";
import { initGA, PageView } from "../libs/tracking";
import theme from "../theme";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://api.poddds.com/graphql"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    initGA("UA-199218131-4"); // Using Universal Analytics Version from Google Analytics
    PageView();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
