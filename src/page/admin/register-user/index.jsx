import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "../../../context";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoBusinessSharp } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import {  RED_COLOR } from "../../../constants/color";
import { BASE_URL } from "../../../constants/common";

const RegisterUser = () => {
  const {role_id}=useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    birth_of_date: "",
    phone_number: "",
    address: "",
    email: "",
    id_card: "",
  });
  const { isLoggedIn, token } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
       await axios.post(`${BASE_URL}/register-business`, formData, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
     toast.success("Đăng ký thành công !");
     navigate("/admin/list-business");
    
       
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Tên đăng nhập hoặc email đã tồn tại.");
        setError("Tên đăng nhập hoặc email đã tồn tại.");
      } else {
        console.error("Đăng ký không thành công:", error);
        toast.error("Đăng ký không thành công. Vui lòng thử lại sau.");
      }
    }
  };
 

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className=" mx-auto">
          <div className="mt-2">
            {" "}
            <Link to="/admin/list-business">
              <IoArrowBackOutline className="fs-3 mb-3" />
            </Link>
                <h3 className=" fw-bold my-3">
                  <IoBusinessSharp className="fs-3" /> ĐĂNG KÝ
                  DOANH NGHIỆP
                </h3>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form className=" mt-3 col-12 mx-auto" onSubmit={handleSubmit}>
            <Row>
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="font-family">
                    <ImProfile className="fs-4" /> Tên doanh nghiệp:{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      role_id == 3 ? "Tên doanh nghiệp" : "Họ và tên"
                    }
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <MdAccountBox className="fs-4" /> UserName{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <MdOutlinePassword className="fs-4" /> Password{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <HiOutlineMail className="fs-4" /> Email{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <LiaBirthdayCakeSolid className="fs-4" /> Ngày sinh{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ngày sinh"
                    required
                    name="birth_of_date"
                    value={formData.birth_of_date}
                    onChange={handleChange}
                    max="2008-12-31"
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <FaPhoneSquareAlt className="fs-4" /> Số điện thoại (Nhập đủ
                    10 số)
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    required
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    <TiLocation className="fs-4" /> Địa chỉ{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Địa chỉ"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Form.Group className="mb-4">
                  <Form.Label className="font-family">
                    <FaAddressCard className="fs-4" /> CCCD/ CMND{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CCCD/ CMND"
                    required
                    name="id_card"
                    value={formData.id_card}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
               style={{background:RED_COLOR,  border:'0px'}}
                className="col-12 col-lg-3 py-3 mt-4"
                type="submit"
              >
                <span className="font-family">
                  Đăng Ký <IoLogInSharp className="fs-4" />
                </span>
              </Button>
            </Row>
          </form>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterUser;
