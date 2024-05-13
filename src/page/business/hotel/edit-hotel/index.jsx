import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../constants/common";
import { toast } from "react-toastify";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BLUE_COLOR } from "../../../../constants/color";
import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../../../../context";

const UpdateHotel = () => {
    const{hotel_id}=useParams();
    const{token}=useAuth();
  const [formData, setFormData] = useState({
    name: "",
    star: "",
    address: "",
    contact_info: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/select-hotel/${hotel_id}`,
        
        );
        const hotelDetails = response.data;
        setFormData({
          name: hotelDetails.name,
          star: hotelDetails.star,
          address: hotelDetails.address,
          contact_info: hotelDetails.contact_info,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
        setError("Failed to fetch hotel details");
        setIsLoading(false);
      }
    };

    fetchHotelDetails();

    return () => {
    };
  }, [hotel_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/update-hotel/${hotel_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hotel updated successfully");
        toast.success("Cập nhật thành công !");
        navigate("/business/hotel");
    } catch (error) {
      console.error("Failed to update hotel:", error);
        toast.error("Cập nhật thất bại !");
    }
  };

  if (isLoading) {
    return (
      <Backdrop open={isLoading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <FaSave /> Cập nhật
          </Button>
        </form>
      </Container>
    </>
  );
};

export default UpdateHotel;
