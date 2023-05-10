import React from "react";
//import { GoogleLoginButton } from "google-auth-library";
import { Fragment } from "@fullcalendar/core/preact";

export const GLogin = () => {
  // function handleCredentialResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }
  // window.onload = function () {
  //   google.accounts.id.initialize({
  //     client_id: "363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com",
  //     callback: handleCredentialResponse,
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     { theme: "outline", size: "large" } // customization attributes
  //   );
  //   google.accounts.id.prompt(); // also display the One Tap dialog
  // };
  return (
    <React.Fragment>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div
        id="g_id_onload"
        data-client_id="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/auth/login"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </React.Fragment>
  );
};
