import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id")
  );
  const isLoggedIn = !!token;

  const login = (token, role, username, accountId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("account_id", accountId);
    setToken(token);
    setRole(role);
    setUsername(username);
    setAccountId(accountId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("account_id");
    setToken(null);
    setRole(null);
    setUsername(null);
    setAccountId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, username, accountId, isLoggedIn, login, logout }}
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
