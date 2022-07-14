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
import AuthStore from "../components/Auth/AuthStore";
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

const p2eEndpoint = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_P2E_URL,
});

let splitLink: any;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = _getAuthToken();

  //console.log("{apolo.authLink} token: ", token);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

if (isClient) {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_URL ?? "",
    })
  );

  splitLink = split(
    (op) => {
      const endpoint = op.getContext().endpoint;
      return endpoint === "p2e";
    },
    authLink.concat(p2eEndpoint),
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      authLink.concat(wsLink),
      authLink.concat(httpLink)
    )
  );
}

let countGqlErrNetwork = 0;
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((e) => {
      const { message, path, extensions } = e;
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path},  extensions: ${extensions?.message}`
      );
      if (message === "Unauthorized") {
        // Clean auth info in case of auth error
        // Might be JWT is expired
        // We do clear info only if there was a logged-in user
        if (_getAuthToken() != null) {
          clearLocalAuthInfo();
          AuthStore.resetStates();
        }
      }
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    countGqlErrNetwork += 1;
  }
});

const client = new ApolloClient({
  link: from([errorLink, splitLink != null ? splitLink : httpLink]),
  cache,
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  }
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
  onLogicError: (e: GraphQLError) => void,
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
        onLogicError(e);
      }
    });
}

export enum CommonError {
  Network = "Network",
  UnAuth = "UnAuth",
}

function onSingleError(
  e: any,
  onError: (code: string, message: string, path?: string[]) => void
) {
  const { message, locations, path } = e;

  // Inside graphQLErrors
  if (message === "Unauthorized") {
    onError(CommonError.UnAuth, message);
  }

  // @ts-ignore
  if (e.code) {
    // @ts-ignore
    onError(e.code, message);
  } else {
    onError(e.extensions?.code as string, message);
  }
}

export function handleGraphqlErrors(
  e: ApolloError,
  onError: (code: string, message: string, path?: string[]) => void
) {
  const { graphQLErrors, networkError, clientErrors } = e;
  // console.dir(e)
  // console.log('{handleGraphqlErrors.handleGraphqlErrors} graphQLErrors, networkError: ', graphQLErrors, networkError);

  if (networkError) {
    // @ts-ignore
    if (!networkError.result) {
      onError(CommonError.Network, e.message);
    }

    // @ts-ignore
    networkError.result && networkError.result.errors.forEach((e) => onSingleError(e, onError));
  }

  if (graphQLErrors) {
    graphQLErrors.forEach((e) => onSingleError(e, onError));
  }
  if (clientErrors) {
    clientErrors.forEach((e) => onSingleError(e, onError));
  }
}
