import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

function PageHead({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />
    </Head>
  );
}

export default PageHead;
