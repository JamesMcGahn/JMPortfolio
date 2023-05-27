import React from 'react';
import Head from 'next/head'

function PageHead({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title" />
        </Head>
    );
}

export default PageHead;