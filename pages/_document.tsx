import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Script strategy="beforeInteractive" src="/scripts/darkModeScript.js" />
        <Script
          strategy="beforeInteractive"
          src="https://accounts.google.com/gsi/client"
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
