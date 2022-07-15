import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout";
import { ApolloProvider } from "@apollo/client";
import client from "utils/apollo_client";
import "quill/dist/quill.snow.css";
import Head from "next/head";
import { ErrorBoundary } from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        {/* @ts-ignore */}
        <ErrorBoundary>
        {/* @ts-ignore */}
        <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
