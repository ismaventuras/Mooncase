import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import ColorTheme from '../src/materialui/theme';
import createEmotionCache from '../src/materialui/createEmotionCache';
import styles from '../styles/globals.css'
import Router from "next/router";
import Wait from "../src/components/Wait"
import { Web3ReactProvider } from "@web3-react/core";
import {ethers} from "ethers";
import Layout from '../src/components/Layout';

function getLibrary(provider){
  //const library = new ethers.providers.InfuraProvider(4,provider)
  const library = new ethers.providers.Web3Provider(provider)
  return library
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      //console.log("start");
      setLoading(true);
    };
    const end = () => {
      //console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Web3ReactProvider getLibrary={getLibrary}>
        <ColorTheme>
          <CssBaseline />
          <Layout>
          {loading ? (
            <Wait message="loading..."/>
          ) : (
            <Component {...pageProps} />
          )}
          </Layout>
        </ColorTheme>
        </Web3ReactProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};