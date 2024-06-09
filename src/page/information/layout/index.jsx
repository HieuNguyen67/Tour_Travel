import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbCoinFilled } from "react-icons/tb";
import profile1img from "@/assets/image/profile1.png";

const InformationLayout = ({ children }) => {
  const { role } = useAuth();

  return (
    <>
      <Container>
        <Container className="mt-5 mx-auto pt-lg-3 pt-3 ">
          <div className="mt-5">
           
            {role == 1 ? (
              <>
                {" "}
                <Link to="/">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            ) : role == 3 ? (
              <>
                {" "}
                <Link to="/business/list-tour">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/admin/list-customer">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            )}

            <h1 className="text-center text-break fw-bold ">
              <img
                src={profile1img}
                className="mb-2"
                style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
              />{" "}
              HỒ SƠ
            </h1>
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
              {role == 1 && (
                <>
                  <Nav.Item>
                    <NavLink
                      className="nav-link "
                      to="/information/list-order"
                      style={({ isActive }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          borderBottom: isActive ? "3px solid #f3c324" : "",
                        };
                      }}
                    >
                      {" "}
                      <span className="text-dark">ĐƠN ĐẶT TOUR</span>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink
                      className="nav-link "
                      to="/information/coupons"
                      style={({ isActive }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          borderBottom: isActive ? "3px solid #f3c324" : "",
                        };
                      }}
                    >
                      {" "}
                      <span className="text-dark">
                        <TbCoinFilled className="fs-3 text-warning" /> XU
                      </span>
                    </NavLink>
                  </Nav.Item>
                </>
              )}
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
      </Container>
    </>
  );
};
export default InformationLayout;
