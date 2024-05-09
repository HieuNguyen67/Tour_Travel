import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context";
import { BASE_URL } from "../../../../constants/common";
import { toast } from "react-toastify";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BLUE_COLOR } from "../../../../constants/color";
import { MdAddToPhotos } from "react-icons/md";

const AddHotelForm = () => {
  const { accountId } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    star: "",
    address: "",
    contact_info: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/add-hotels/${accountId}`, formData);
      setFormData({
        name: "",
        star: "",
        address: "",
        contact_info: "",
      });
      toast.success("Thêm thành công !");
      navigate("/business/hotel");
    } catch (err) {
      console.error("Error adding hotel:", err);
      toast.error("Thêm thất bại !");
    }
  };

  return (
    <>
      <Container>
        <Link to="/business/hotel">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <h1 className="text-center fw-bold mb-5">THÊM KHÁCH SẠN</h1>
        <br />

        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-12 col-lg-6">
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">Tên KS:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Tên khách sạn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12 col-lg-6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  Đánh giá sao (<FaStar className="text-warning" />
                  ):
                </Form.Label>
                <Form.Control
                  type="number"
                  name="star"
                  placeholder="Star Rating"
                  value={formData.star}
                  onChange={handleChange}
                  max={5}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  Địa chỉ:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  Thông tin liên hệ:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="contact_info"
                  placeholder="Thông tin liên hệ"
                  value={formData.contact_info}
                  onChange={handleChange}
                  required
                  style={{ height: "10rem" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            style={{ background: BLUE_COLOR, border: "0px" }}
            className="py-3 col-lg-2 col-12 fs-5 mb-5"
          >
            <MdAddToPhotos /> Thêm KS
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddHotelForm;
