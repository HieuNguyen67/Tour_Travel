import React, { useEffect, useState } from "react";
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
  const { accountId ,token} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    star: "",
    address: "",
    contact_info: "",
    tour_id:"",
  });
    const [tours, setTours] = useState([]);


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/select-option-tours/${accountId}`);
        setTours(response.data);

      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [accountId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/add-hotels/${accountId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: "",
        star: "",
        address: "",
        contact_info: "",
        tour_id: "",
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
                  Số điện thoại:
                </Form.Label>
                <Form.Control
                  type="number"
                  name="contact_info"
                  placeholder="SĐT"
                  value={formData.contact_info}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              <Form.Label className="font-family fw-bold">Tour:</Form.Label>
              <Form.Select
                className="mb-3"
                name="tour_id"
                value={formData.tour_id}
                onChange={handleChange}
                required
              >
                <option value="">Select a tour</option>
                {tours.map((tour) => (
                  <option key={tour.tour_id} value={tour.tour_id}>
                    {tour.name}
                  </option>
                ))}
              </Form.Select>
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
