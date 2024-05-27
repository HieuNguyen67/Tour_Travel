import { Col, Row } from "react-bootstrap";
import BackToTop from "../BackToTop";
import Footer from "./footer";
import Header from "./header";
import {useLocation } from "react-router-dom";
import { useAuth } from "../../context";

const MainLayout = ({ children }) => {
  const {role}=useAuth();
   const location = useLocation();
   const isHomePage = location.pathname === "/";
      const isHomePage1 =
        location.pathname === "/" ||
        location.pathname === "/introduce" ||
        location.pathname === "/business-link" ||
        location.pathname === "/image" ||
        location.pathname === "/contact" ||
        location.pathname === "/login" ||
        location.pathname === "/information/profile" ||
        location.pathname === "/signup";

  return (
    <>
      {isHomePage1 ? null : (
        <Col className="col-12">
          <Header />
        </Col>
      )}
      <Col className="col-12">
        <BackToTop />

        {children}
      </Col>
      {isHomePage ? null : 
      role==2||role==3||role==4?null:(
        <Col className="col-12">
          <Footer />
        </Col>
      )}
    </>
  );
};
export default MainLayout;