import React from 'react';
import MainLayout from './components/layout';
import { AuthProvider } from './context';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle } from "styled-components";
import Apps from './components/App';

const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Lora", serif;
      color:  #2d4271;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ToastContainer />
        <MainLayout>
          <Apps />
        </MainLayout>
      </AuthProvider>
    </>
  );
};

export default App;
