import Footer from "@/components/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Morning News</title>
      <body className="bg-gray-50 ">
        <Main/>
        <NextScript />
        <Footer/>
      </body>
    </Html>
  );
}
