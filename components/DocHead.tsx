import Head from "next/head";
import {isClientDevMode} from "../utils/Env";
import { app_env } from "../utils/Env";

type Props = {
  title?: string;
  description?: string;
};

export default function DocHead(props: Props) {
  const titleSuffix = props.title ?? "LUCIS ARENA - Automated Gaming Tournaments ";
  const env_str = app_env !== "prod" ? `[${app_env}] ` : '';
  const title = env_str + "Lucis Tournament - " + titleSuffix;
  const desc = props.description ?? 'Join Lucis Arena to start, manage, and find your own Battlefield | Just Battle & Earn.';
  const thumb = "https://lucis.network/assets/lucis_preview_169.jpg?v=1656073943366";

  return (
    <Head>
      <link rel="icon" href="/favicon.png" />
      {isClientDevMode ? (
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      ) : (
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      )}
      <meta charSet="utf-8" />

      <title>{title}</title>
      <meta name="description" content={desc} />

      <meta data-hid="og:title" name="og:title" content={title} />
      <meta data-hid="og:description" name="og:description" content={desc} />
      <meta data-hid="og:type" property="og:type" content="website" />

      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="application-name" content="Lucis Gaming Guild" />

      <meta property="og:title" content={title} />
      <meta data-hid="description" name="description" content={desc} />
      <meta property="og:description" content={desc} />

      <meta data-hid="image" itemProp="image" content={thumb} />
      <meta data-hid="og:image" property="og:image" content={thumb} />
      <meta property="og:locale" content="en_US" />

      {/*<meta*/}
      {/*  httpEquiv="Content-Security-Policy"*/}
      {/*  content="upgrade-insecure-requests"*/}
      {/*></meta>*/}
    </Head>
  );
}
