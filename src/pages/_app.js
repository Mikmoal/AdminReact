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
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme:"outline", size: "large" }
  //   )
  // }, [])

  return (
    <GoogleOAuthProvider clientId="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com">
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Racing</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
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
    </GoogleOAuthProvider>
  );
};

export default App;
