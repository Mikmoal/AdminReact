import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
// import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Script from "next/script";
// import { getGoogleSession } from "../redux/actions";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = ({ Component, emotionCache, pageProps: { session, ...pageProps } }) => {
  emotionCache = clientSideEmotionCache;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    // <SessionProvider session={session}>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Racing</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* <Script src="https://accounts.google.com/gsi/client" async defer></Script> */}
        </Head>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </CacheProvider>
    </Provider>
    // </SessionProvider>
  );
};

export default App;
