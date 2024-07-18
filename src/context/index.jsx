import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id")
  );
  const [businessId, setBusinessId] = useState(
    localStorage.getItem("business_id")
  );
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("customer_id")
  );
  const [adminId, setAdminId] = useState(localStorage.getItem("admin_id"));
  const [shareToken, setShareToken] = useState(
    localStorage.getItem("share_token")
  );

  const isLoggedIn = !!token;

  const login = (
    token,
    role,
    username,
    accountId,
    businessId,
    customerId,
    adminId
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("account_id", accountId);
    localStorage.setItem("business_id", businessId);
    localStorage.setItem("customer_id", customerId);
    localStorage.setItem("admin_id", adminId);
    setToken(token);
    setRole(role);
    setUsername(username);
    setAccountId(accountId);
    setBusinessId(businessId);
    setCustomerId(customerId);
    setAdminId(adminId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("account_id");
    localStorage.removeItem("business_id");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("tour_id");
    setToken(null);
    setRole(null);
    setUsername(null);
    setAccountId(null);
    setBusinessId(null);
    setCustomerId(null);
    setAdminId(null);
    navigate("/login");
  };

  const saveShareData = (shareToken, tourId) => {
    localStorage.setItem("share_token", shareToken);
    setShareToken(shareToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        username,
        accountId,
        businessId,
        customerId,
        adminId,
        shareToken,
        isLoggedIn,
        login,
        logout,
        saveShareData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
