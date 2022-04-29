import Head from "next/head";

type Props = {
  title?: string;
};

export default function DocHead(props: Props) {
  console.log(props.title);
  const titleSuffix =
    props.title ??
    "Buy NFT boxes easily from INO campaigns or create your INO campaign with us";
  const title = "Lucis Social Flatform - " + titleSuffix;
  // TODO:
  const desc =
    'One of the most effective investment platforms for investors. We create a hybrid platform to connect investors and skilled scholars in the world of "Play to Earn" gaming and metaverse.';
  const thumb = "https://lucis.network/assets/lucis_preview_169.jpg";

  return (
    <Head>
      <link rel="icon" href="/favicon.png" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
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

      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
    </Head>
  );
}
