import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ColorModeProvider, ThemeProvider } from "@chakra-ui/react";
import theme from "../theme";
import "../css/DatePickerInput.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // uri:  'https://podapi.herokuapp.com/'
  cache: new InMemoryCache(),
  credentials: "include" as const,
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
