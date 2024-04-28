import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const InformationLayout = ({ children }) => {
  return (
    <>
      <Container className="mt-5 mx-auto pt-lg-5 pt-3 ">
        <div className="mt-5">
          <Row>
            <Col></Col>
            <Col className="col-10 ">
              <h1 className="text-center text-break fw-bold font-family">
                HỒ SƠ
              </h1>
            </Col>
            <Col></Col>
          </Row>
        </div>
      </Container>
      <br />
      <Row>
        <Col className="col-12">
          <Nav fill>
            <Nav.Item>
              <NavLink
                className="nav-link "
                to="/information/profile"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    borderBottom: isActive ? "3px solid #f3c324" : "",
                  };
                }}
              >
                {" "}
                <span className="text-dark">THÔNG TIN CÁ NHÂN</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link "
                to="/information/change-password"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    borderBottom: isActive ? "3px solid #f3c324" : "",
                  };
                }}
              >
                {" "}
                <span className="text-dark">THAY ĐỔI MẬT KHẨU</span>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="col-12">{children}</Col>
      </Row>
    </>
  );
};
export default InformationLayout;