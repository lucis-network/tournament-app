import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout";
import { ApolloProvider } from "@apollo/client";
import client from "utils/apollo_client";
import "quill/dist/quill.snow.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <title></title>
        </Head>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
