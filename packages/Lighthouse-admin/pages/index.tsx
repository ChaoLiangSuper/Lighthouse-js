import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { CssBaseline } from '@material-ui/core';
import Page from '../components/Page';

const Home: NextPage = () => (
  <Page>
    <CssBaseline />
    <Head>
      <title>Home</title>
    </Head>
  </Page>
);

export default Home;
