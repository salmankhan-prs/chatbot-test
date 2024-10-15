import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
