import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import { BASE_URL } from "../../../../constants/common";
import { toast } from "react-toastify";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { BLUE_COLOR } from "../../../../constants/color";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../../../../context";


const UpdateVehicle = () => {
    const{vehicle_id}=useParams();
    const{token}=useAuth();
  const [formData, setFormData] = useState({
    type: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/select-vehicle/${vehicle_id}`,
         
        );
        const vehicleDetails = response.data;
        setFormData({
          type: vehicleDetails.type,
          description: vehicleDetails.description,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch vehicle details:", error);
        setError("Failed to fetch vehicle details");
        setIsLoading(false);
      }
    };

    fetchVehicleDetails();

    return () => {
    };
  }, [vehicle_id]);

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
      await axios.put(`${BASE_URL}/update-vehicle/${vehicle_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Vehicle updated successfully");
        toast.success("Cập nhật thành công !");
        navigate("/business/vehicle");
    } catch (error) {
      console.error("Failed to update vehicle:", error);
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
            <FaSave /> Cập nhật
          </Button>
        </form>
      </Container>
    </>
  );
};

export default UpdateVehicle;
