import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";

const ChangePassword = () => {
      const { accountId, isLoggedIn,token } = useAuth();
        const navigate = useNavigate();

 useEffect(() => {
   if (isLoggedIn === false) {
     navigate("/");
   }
 }, [isLoggedIn, navigate]);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://localhost:5020/v1/api/admin/account/change-password/${accountId}`,
        passwords,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
                  toast.success("Mật khẩu đã được thay đổi.");
          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.error("Failed to change password:", error);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <>
      <Container className="my-5 pb-5">
        <form onSubmit={handleSubmit}>
          <Row className="d-flex flex-column">
            <Col className="col-lg-5 col-12 mx-auto">
              {error && <div style={{ color: "red" }}>{error}</div>}
              <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  <MdOutlinePassword className="fs-4" /> Mật khẩu cũ:
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  placeholder="Mật khẩu cũ"
                  className="py-3"
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-5 col-12  mx-auto">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  <MdOutlinePassword className="fs-4" /> Mật khẩu mới:
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  placeholder="Mật khẩu mới"
                  className="py-3"
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-5 col-12  mx-auto">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  <MdOutlinePassword className="fs-4" /> Nhập lại mật khẩu mới:
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu mới"
                  className="py-3"
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-5 col-12  mx-auto">
              <Button
                variant="warning"
                type="submit"
                className="col-12 py-3 mt-3"
              >
                <TbPasswordUser className="fs-4"/> Thay đổi mật khẩu
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default ChangePassword;
