import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";  
import { useAuth } from "../../../context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  Backdrop, CircularProgress} from "@mui/material";
import { FaSave } from "react-icons/fa";
import UpdateImage from "../../../components/up-images";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingBackdrop from "../../../components/backdrop";

const Profile = () => {
  const { accountId, isLoggedIn ,token} = useAuth();
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    birth_of_date: "",
    phone_number: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const accountData = response.data;
        setFormData({
          ...accountData,
          birth_of_date: formatDate(accountData.birth_of_date),
        });
              setLoading(false);

      } catch (error) {
        console.error("Failed to fetch account data:", error);
                      setLoading(false);

      }
    };

    fetchAccountData();
  }, [accountId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = formatDate(formData.birth_of_date);
      await axios.put(
        `http://localhost:5020/v1/api/admin/account/${accountId}`,
        {
          ...formData,
          birth_of_date: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

            toast.success("Thông tin tài khoản đã được cập nhật!");

    } catch (error) {
      console.error("Failed to update account data:", error);
        toast.error(
          "Cập nhật thông tin tài khoản không thành công. Vui lòng thử lại sau."
        );
     
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Container className="my-lg-5 my-2   pb-5">
        <Row>
          <Col className="col-lg-3 col-12">
            {" "}
            <UpdateImage />
          </Col>
          <Col className="col-lg-9 col-12 ">
            {" "}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family fw-bold">
                      Username:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Tên đăng nhập"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      Họ và Tên:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      Ngày sinh:
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      name="birth_of_date"
                      max="2008-12-31"
                      value={formData.birth_of_date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      Số điện thoại:
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      Địa chỉ:
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Địa chỉ"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      Email:
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      readOnly
                      value={formData.email}
                      placeholder="Email"
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-lg-3">
                  <Button
                    variant="warning"
                    type="submit"
                    className="py-3  col-12 mt-2"
                  >
                    <FaSave /> Cập nhật
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
