import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../public/css/nprogress.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 400,
    showSpinner: false,
  });

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <title>James McGahn</title>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
