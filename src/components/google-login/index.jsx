import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = process.env.REACT_APP_CLIENT_ID;
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
        
          size="large"
          theme="filled_black"
          shape="pill"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
