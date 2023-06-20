"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import googleIcon from "../../public/googleIcon.png";
import { getGoogleSession } from "../redux/actions";
import { useEffect } from "react";
import Script from "next/script";

export default function GoogleLoginButton() {
  const boton = (
    <>
      <div
        id="g_id_onload"
        data-client_id="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3001/"
        data-auto_select="true"
        data-itp_support="true"
      ></div>
      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );

  let authCodeResponseText
  let responseCode

  function showauthCodeResponseText () {
    console.log(authCodeResponseText);
  }
  function showResponseCode() {
    console.log(responseCode);
  }
    // Scope es una cadena de scopes delimitados por espacios
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => {
          console.log("GSI Script has loaded");
          // const client = google.accounts.oauth2.initCodeClient({
          //   client_id: "363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com",
          //   scope:
          //     "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.calendarlist https://www.googleapis.com/auth/calendar.events",
          //   ux_mode: "popup",
          //   callback: (response) => {
          //     const xhr = new XMLHttpRequest();
          //     xhr.open("POST", code_receiver_uri, true);
          //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          //     // Set custom header for CRSF
          //     xhr.setRequestHeader("X-Requested-With", "XmlHttpRequest");
          //     xhr.onload = function () {
          //       console.log("Auth code response: " + xhr.responseText);
          //       authCodeResponseText = xhr.responseText;
          //     };
          //     xhr.send("code=" + response.code);
          //     responseCode = response.code
          //   },
          // });
          const client = google.accounts.oauth2.initCodeClient({
            client_id: '363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com',
            scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.calendarlist https://www.googleapis.com/auth/calendar.events",
            ux_mode: 'redirect',
            redirect_uri: "http://localhost:3001/oauth2callback",
            state: "YOUR_BINDING_VALUE"
          });

          client.requestCode();
        }}
      />
      <Button onClick={showResponseCode}>Show Response Code</Button>
      <Button onClick={showauthCodeResponseText}>Show Auth Stuff</Button>
    </>
  );
}
