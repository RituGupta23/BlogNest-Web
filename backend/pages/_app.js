import "@/styles/globals.css";
import "@/styles/loading.css";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import { SessionProvider } from "next-auth/react"
import { useState } from "react";
import Loading from "@/components/Loading";
import Aos from "@/components/Aos";

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const [loading, setLoading] = useState(false);

  return <>
    <SessionProvider session={session}>
      {loading ? (
        <div className="flex flex-col flex-center wh-100">
          <Loading />
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <Header />
          <Aside />
          <main>
            <Aos>
              <Component {...pageProps} />
            </Aos>

          </main>
        </>
      )}

    </SessionProvider>
  </>;
}
