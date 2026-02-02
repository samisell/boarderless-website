import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
                <meta name="theme-color" content="#000" />
                <link rel="icon" href="/favicon.png" />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Head>
        </Html>
    );
}