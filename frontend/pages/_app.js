import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import TopLoadingLine from "@/components/TopLoadingLine";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main>
      <Aos>
      <Component {...pageProps} />;
      </Aos>    
      <ScrollToTopBtn /> 
    </main>
    <Footer />
  </>
}
