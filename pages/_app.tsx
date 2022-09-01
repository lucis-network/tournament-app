import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout";
import { ApolloProvider } from "@apollo/client";
import client from "utils/apollo_client";
import "quill/dist/quill.snow.css";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AppEmitter} from "../services/emitter";
import AuthStore from "../components/Auth/AuthStore";
import UtmService from "../components/service/p2e/UtmService";
import { ErrorBoundary } from "../components/ErrorBoundary";
function MyApp({ Component, pageProps }: AppProps) {
  const [isCheckUtm, setIsCheckUtm] = useState(false);
  const route = useRouter();
  const authStore = AuthStore;

  //Save utm all pages in app
  useEffect(() => {
    let keysArr =  Object.entries(route?.query);
    if(route && keysArr.length > 0 && !isCheckUtm) {
      checkAndSaveUtmUrl(authStore?.id);
      setIsCheckUtm(true);
    }
  }, [route, isCheckUtm])

  //Save Utm affter login success
  useEffect(() => {
    const listener = AppEmitter.addListener("saveUtmAfterLoginSuccess", (res: any) => {
      if(res?.data && res?.data?.id) {
        checkAndSaveUtmUrl(res?.data?.id);
      }
    });
    return () => {
      listener.remove();
    };
  }, [route])

  const checkAndSaveUtmUrl = (userUid?: number) => {
    for (const [key, value] of Object.entries(route?.query)) {
      if(key.includes("utm_") || key.includes("fbclid") || key.includes("gclid")) {
        const res = UtmService.setUtm(Number(userUid), route.asPath).then((response) => {
          if (!response?.data) {
            console.warn("Save utm fail!")
          }
        });
        break;
      }
    }
  }

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
