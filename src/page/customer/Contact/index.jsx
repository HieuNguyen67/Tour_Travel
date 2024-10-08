import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoIosSend } from "react-icons/io";
import Header from "@/components/layout/header";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  RED1_COLOR,
} from "@/constants";
import infoimg from "@/assets/image/info.png";
import contactimg from "@/assets/image/contact.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    message: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/send-contact`,
        formData
      );
      setSuccessMessage("Contact sent successfully");
      setFormData({
        fullname: "",
        email: "",
        phonenumber: "",
        message: "",
        address: "",
      });
      toast.success(response.data.message);
    } catch (error) {
       if (error.response.data.errors){
      error.response.data.errors.forEach((errorMsg) => toast.error(errorMsg));
       }
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mb-5 pb-5 mt-5 pt-5">
          <Row className="mt-5">
            <Col className="col-md-5 col-12">
              <p>
                <h3 className="fw-bold">
                  <img
                    src={infoimg}
                    className="mb-2"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "cover",
                    }}
                  />{" "}
                  THÔNG TIN LIÊN HỆ
                </h3>
                <hr className="hr" />

                <p>
                  Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn trong mọi vấn
                  đề liên quan đến bạn. Xin vui lòng liên hệ với chúng tôi qua
                  một trong những cách sau:
                  <br /> <br />
                  <strong>Điện thoại : </strong>(+84) 123 456 789
                  <br />
                  <strong>Email : </strong>info@tourdulich.com
                </p>
              </p>
            </Col>
            <Col className="mt-md-0 mt-4 ">
              <p>
                <h3 className="fw-bold">
                  {" "}
                  <img
                    src={contactimg}
                    className="mb-2"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "cover",
                    }}
                  />{" "}
                  LIÊN HỆ CHÚNG TÔI
                </h3>
                <hr className="hr" />
              </p>
              <Form onSubmit={handleSubmit}>
                <Row className="d-flex flex-row py-2">
                  <Col className="col-6 pe-2 ">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        placeholder="Tên"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="col-6 ps-2 ">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Địa chỉ"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex flex-row py-2 ">
                  <Col className="col-6 pe-2 ">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder="SĐT"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="col-6 ps-2">
                    <Form.Group>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex flex-row py-2 mb-4 ">
                  <Col className="col-12 ">
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        placeholder="Nội dung"
                        className="shadow-sm "
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ height: "10rem" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  style={{ background: RED1_COLOR, border: "0px" }}
                  className="shadow-sm py-2"
                >
                  <IoIosSend className="fs-4" />
                  GỬI THÔNG TIN LIÊN HỆ
                </Button>
              </Form>
              {error && (
                <div className="error text-danger fw-bold mt-3">{error}</div>
              )}
              {successMessage && (
                <div className="success text-danger fw-bold mt-3">
                  {successMessage}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </motion.div>
    </>
  );
};
export default Contact;
