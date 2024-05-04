import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const NewsLayout = ({ children }) => {
const location = useLocation();
const isHomePage =
  location.pathname === "/news/1/Tin%20t%E1%BB%A9c%20du%20l%E1%BB%8Bch" ||
  location.pathname === "/news/2/C%E1%BA%A9m%20nang%20du%20l%E1%BB%8Bch";
  return (
    <>
    
      <Container className="mt-5 mx-auto pt-lg-5 pt-3 ">
        <div className="mt-3">
          <Row>
            {isHomePage ? (
              <>
                <Col className="col-12">
                  <Nav fill>
                    <Nav.Item>
                      <NavLink
                        className="nav-link "
                        to="/news/1/Tin tức du lịch"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            borderBottom: isActive ? "3px solid #f3c324" : "",
                            background: isActive ? "#ffc107" : "",
                          };
                        }}
                      >
                        {" "}
                        <span className="text-dark">TIN TỨC DU LỊCH</span>
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink
                        className="nav-link "
                        to="/news/2/Cẩm nang du lịch"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "bold" : "",
                            borderBottom: isActive ? "3px solid #f3c324" : "",
                            background: isActive ? "#ffc107" : "",
                          };
                        }}
                      >
                        {" "}
                        <span className="text-dark">CẨM NANG DU LỊCH</span>
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                </Col>
              </>
            ) : (
              <></>
            )}

            <Col className="col-12">{children}</Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default NewsLayout;
