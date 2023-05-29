import Head from "next/head";
import Script from "next/script";
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

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Racing</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {/* <Script src="https://accounts.google.com/gsi/client" async defer /> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
              <CssBaseline />
              {
                getLayout(<Component {...pageProps} />)
              }
        </ThemeProvider>
          {/* <AuthProvider>
            
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : 
                }
              </AuthConsumer> */}
            
          {/* </AuthProvider> */}
        </LocalizationProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
