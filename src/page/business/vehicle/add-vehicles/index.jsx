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

const AddVehicleForm = () => {
  const { accountId ,token} = useAuth();
  const [formData, setFormData] = useState({
    type: "",
    description: ""
   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/add-vehicles/${accountId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: "",
        description: ""
      });
      toast.success("Thêm thành công !");
      navigate("/business/vehicle");
    } catch (err) {
      console.error("Error adding hotel:", err);
      toast.error("Thêm thất bại !");
    }
  };

  return (
    <>
      <Container>
        <Link to="/business/vehicle">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <h1 className="text-center fw-bold mb-5">THÊM PHƯƠNG TIỆN</h1>
        <br />

        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-12 ">
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">
                  Phương tiện:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  placeholder="Phương tiện"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family fw-bold">Mô tả:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Mô tả"
                  value={formData.description}
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
            <MdAddToPhotos /> Xác Nhận
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddVehicleForm;
