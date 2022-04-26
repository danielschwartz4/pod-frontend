import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ColorModeProvider, ThemeProvider } from "@chakra-ui/react";
import "../css/DatePickerInput.css";
import theme from "../theme";

console.log("process.env.NODE_ENV");
console.log(process.env.NODE_ENV);

const client = new ApolloClient({
  uri: "https://podapi.herokuapp.com/graphql",
  // process.env.NODE_ENV === "production"
  //   ? "https://podapi.herokuapp.com/graphql"
  //   : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

// !! Check network request url to see if it's the above

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
