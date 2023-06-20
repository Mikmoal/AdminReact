import process from "process";
import React, { useEffect } from "react";
import GoogleLoginButton from "../components/login-btn";
import Script from "next/script";
import { Typography } from "@mui/material";

const login = () => {
  const boton = (
    <>
      <div
        id="g_id_onload"
        data-client_id="363684052179-ddqp5vv08v9rnfp3hq3f88qn8go4pote.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3001/api"
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

  return (
    <div>
      {/* <GoogleLoginButton /> */}
      <Typography>Racing Cargo Gestión de Minutas</Typography>
      {boton}
    </div>
  );
};

export default login;
