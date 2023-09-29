import Context from "@/context/context";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </Context>
    </>
  );
}
