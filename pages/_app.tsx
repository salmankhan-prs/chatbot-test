import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeToggle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
