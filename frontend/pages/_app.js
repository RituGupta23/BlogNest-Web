import Aos from "@/components/Aos";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main>
      <Aos>
      <Component {...pageProps} />;
      </Aos>     
    </main>
  </>
}
