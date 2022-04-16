import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  ApolloError,
  ServerParseError,
  ServerError,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { isClient } from "./DOM";
import {
  clearLocalAuthInfo,
  getLocalAuthInfo,
} from "../components/Auth/AuthLocal";
import { message as antd_message, notification } from "antd";
import { GraphQLError } from "graphql";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
//   import { CachePersistor } from 'apollo-cache-persist';

// Cache implementation
const cache = new InMemoryCache();

const authCache: {
  /**
   * store tmp auth token to send with graphql requests
   * If you wanna get JWT token of current user, plz get from AuthStore.token instead
   */
  token: string;
} = {
  token: _fetchInitialAuthTokenFromLocal(),
};

export function setAuthToken(token: string) {
  authCache.token = token;
}
if (isClient) {
  // @ts-ignore
  window.tmp__setApoloAuth = setAuthToken;
}

/**
 * If you wanna get JWT token of current user, plz get from AuthStore.token instead
 */
function _getAuthToken(): string {
  return authCache.token;
}

function _fetchInitialAuthTokenFromLocal(): string {
  const u = getLocalAuthInfo();
  return u ? u.token ?? "" : "";
}

// const persistor = new CachePersistor({
//   cache,
//   storage: window.localStorage,
// });
// persistor.restore();

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});
var splitLink: any;

if (isClient) {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_URL ?? "",
    })
  );

  splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
}

let countGqlErrNetwork = 0;
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path},  extensions: ${extensions?.message}`
      );
      if (message === "Unauthorized") {
        // Clean auth info in case of auth error
        // Might be JWT is expired
        // We do clear info only if there was a logged-in user
        if (_getAuthToken()) {
          clearLocalAuthInfo();
        }

        // notification.error({
        //   message: "Unauthorized",
        //   description: "Please connect your wallet again",
        // });
      }
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    countGqlErrNetwork += 1;
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = _getAuthToken();
  // console.log("{apolo.authLink} token: ", token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: from([
    errorLink,
    authLink.concat(splitLink != null ? splitLink : httpLink),
  ]),
  cache,
  connectToDevTools: true,
});

export default client;

/**
 * User for external error handling
 */
export function handleApolloError(error: ApolloError) {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "Unauthorized") {
        // notification["error"]({
        //   message: "Unauthorized",
        //   description: "Please connect wallet first!",
        // });
        antd_message.error(
          "Error: Unauthorized: Please connect wallet first!",
          3
        );
      } else {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        // notification["error"]({
        //   message: "Error!",
        //   description: message,
        // });
        antd_message.error(message, 3);
      }
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
}

export function onApolloError(
  error: ApolloError,
  onError: (e: GraphQLError) => void,
  onAuthError: (e: GraphQLError) => void,
  onNetworkError: (e: Error | ServerParseError | ServerError) => void
) {
  const { graphQLErrors, networkError } = error;

  if (networkError) {
    onNetworkError(networkError);
    return;
  }

  if (graphQLErrors)
    graphQLErrors.forEach((e) => {
      const { message, locations, path } = e;
      if (message === "Unauthorized") {
        onAuthError(e);
      } else {
        onError(e);
      }
    });
}
