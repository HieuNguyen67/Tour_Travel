import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_ADMIN, RED1_COLOR, GREY_COLOR, BASE_URL_CUSTOMER } from "@/constants";

const ContactModal = ({ accountId, tourId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    message: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL_CUSTOMER}/send-contact-business/${accountId}/${tourId}`,
        contactData
      );
      handleClose();
      toast.success("Gửi tư vấn thành công !");
    } catch (error) {
      console.error("Error sending contact:", error);
      toast.error("Gửi tư vấn thất bại !");
    }
  };

  return (
    <>
      <Button
        className="col-lg-2 col-12  py-3"
        style={{ background: GREY_COLOR, border: "0px" }}
        onClick={handleShow}
      >
        Liên hệ tư vấn
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">GỬI THÔNG TIN TƯ VẤN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Quý khách vui lòng nhập thông tin bên dưới, doanh nghiệp sẽ liên hệ
            lại sau ít phút
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fullname" className="my-3">
              <Form.Label>
                Họ tên<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={contactData.fullname}
                onChange={handleChange}
                required
                placeholder="Nhập họ tên quý khách"
              />
            </Form.Group>
            <Form.Group controlId="phonenumber" className="my-3">
              <Form.Label>
                Điện thoại<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phonenumber"
                placeholder="Nhập số điện thoại"
                value={contactData.phonenumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>
                Email<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </Form.Group>
            <Form.Group controlId="message" className="my-3">
              <Form.Label>
                Thông tin cần tư vấn<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={contactData.message}
                onChange={handleChange}
                required
                placeholder="Quý khách cần tư vấn về vấn đề gì"
              />
            </Form.Group>
            <p className="text-end">
              <Button
                style={{ background: RED1_COLOR, border: "0px" }}
                type="submit"
              >
                Gửi đi
              </Button>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactModal;
