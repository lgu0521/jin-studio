import "../styles/globals.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import theme from "../styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalFonts from "../styles/fonts";
import Layout from "../components/Layout";
import { useEffect } from "react";
import NProgress from 'nprogress';
import Router from "next/router";
import '../public/nprogress.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [Router])
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalFonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
