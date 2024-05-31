import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const navigate = useNavigate();
   
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [accountId, setAccountId] = useState(
    sessionStorage.getItem("account_id")
  );
   const [businessId, setBusinessId] = useState(
     sessionStorage.getItem("business_id")
   );
    const [customerId, setCustomerId] = useState(
      sessionStorage.getItem("customer_id")
    );

  
  const isLoggedIn = !!token;

  const login = (token, role, username, accountId, businessId, customerId) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("account_id", accountId);
    sessionStorage.setItem("business_id", businessId);
    sessionStorage.setItem("customer_id", customerId);
    setToken(token);
    setRole(role);
    setUsername(username);
    setAccountId(accountId);
    setBusinessId(businessId);
    setCustomerId(customerId);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("account_id");
     sessionStorage.removeItem("business_id");
      sessionStorage.removeItem("customer_id");
    setToken(null);
    setRole(null);
    setUsername(null);
    setAccountId(null);
    setBusinessId(null);
    setCustomerId(null);
     navigate("/login");
    
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
        isLoggedIn,
        login,
        logout,
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
