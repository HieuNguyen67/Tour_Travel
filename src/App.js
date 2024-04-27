import Apps from './components/App';
import MainLayout from './components/layout';
import { AuthProvider } from './context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css"
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Lora", serif;

  }
`;
function App() {

  return (
    <>
      {" "}
      
      <GlobalStyle />
      <AuthProvider>
        <ToastContainer />
        <MainLayout>
          <Apps />
        </MainLayout>
      </AuthProvider>
    </>
  );
}

export default App;
