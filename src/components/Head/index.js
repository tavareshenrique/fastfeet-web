import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>FastFeet</title>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
}
