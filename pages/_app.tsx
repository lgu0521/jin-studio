import "../styles/globals.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import theme from "../styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalFonts from "../styles/fonts";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";

type initialProps = {
  logoUrl: string;
};
const MyApp = (
  { Component, pageProps }: AppProps,
  { logoUrl }: initialProps
) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export const getStaticPros: GetStaticProps = async () => {
  return {
    props: {
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/jin-studio.appspot.com/o/Logo%2Flogo.png?alt=media&token=060f16b5-fe29-460f-8a3e-a788e3b956f1",
    },
  };
};

export default MyApp;
