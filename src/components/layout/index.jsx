import { Col, Row } from "react-bootstrap";
import BackToTop from "../BackToTop";
import Footer from "./footer";
import Header from "./header";
import {useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
   const location = useLocation();
   const isHomePage = location.pathname === "/";
  return (
    <>
      <Col className="col-12">
        <Header />
      </Col>
      <Col className="col-12">
        <BackToTop />

        {children}
      </Col>
      {isHomePage ? null : (
        <Col className="col-12">
          <Footer />
        </Col>
      )}
    </>
  );
};
export default MainLayout;