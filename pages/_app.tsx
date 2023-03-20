import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ display: "flex" }}>
        <div>woochans.com</div>
        <input type="text" placeholder="어디로 떠날래?" />
      </nav>
      <Component {...pageProps} />
    </>
  );
}
