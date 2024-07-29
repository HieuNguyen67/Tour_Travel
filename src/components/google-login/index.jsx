import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "588978986693-2ebp0fe8ac36mtaopj70ju42sps8dq4m.apps.googleusercontent.com";

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const onSuccess = (response) => {
    console.log("Login Success:", response);
    onLoginSuccess(response.credential);
  };

  const onFailure = (error) => {
    console.log("Login failed:", error);
    alert("Failed to login. Please try again.");
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          useOneTap
          width={500}
          size="large"
          theme="filled_black"
          shape="pill"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
