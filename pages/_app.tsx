import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
// provider
import { SessionProvider } from "next-auth/react";
// Layout
import Layout from "../components/layouts/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        {router.route.search("login") === 1 ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
