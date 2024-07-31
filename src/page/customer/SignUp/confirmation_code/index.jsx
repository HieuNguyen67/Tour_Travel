import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { BLUE_COLOR } from "@/constants";
import { Link, useNavigate } from "react-router-dom";

const ConfirmationForm = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/confirm/${confirmationCode}`
      );
      setMessage(response.data.message);
      toast.success("Tài khoản đã được kích hoạt thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Xác nhận không thành công:", error);
      setMessage(error.response.data.message);

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container className="my-5 pt-5">
        <Col className="col-lg-6 border mx-auto mt-5 shadow rounded-3">
          {" "}
          <p className="text-center p-4">
            <h3 className="fw-bold mt-3 mb-5">Nhập mã kích hoạt tài khoản</h3>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw-bold text-start mb-3">
                  Bạn vui lòng kiểm tra email đăng ký và nhập mã vào ô dưới đây
                </Form.Label>
                <Form.Control
                  className="mb-4"
                  required
                  type="text"
                  value={confirmationCode}
                  onChange={handleChange}
                  placeholder="Nhập mã kích hoạt tài khoản"
                />
              </Form.Group>
              <Button
                type="submit"
                className="col-12 py-2 mb-2"
                style={{ background: BLUE_COLOR, border: "0px" }}
              >
                Xác nhận
              </Button>
              <Link
                to="/login"
                className="text-decoration-none text-primary mb-5"
              >
                Quay lại đăng nhập
              </Link>
            </form>
            {message && (
              <p className="mt-3 fw-bold fs-5 text-danger">{message}</p>
            )}
          </p>
        </Col>
      </Container>
    </>
  );
};

export default ConfirmationForm;
