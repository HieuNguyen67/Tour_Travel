import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import businessimg from "@/assets/image/business1.png";
import adminimg from "@/assets/image/admin.png";
import { BASE_URL_BUSINESS, RED_COLOR } from "@/constants";
import { BASE_URL_ADMIN } from "@/constants";
import { GrUserAdmin } from "react-icons/gr";

const RegisterUser = () => {
  const { role_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    birth_of_date: "",
    phone_number: "",
    address: "",
    email: "",
    role: "",
  });
  const { isLoggedIn, token, adminId } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role_id == 3) {
        await axios.post(
          `${BASE_URL_BUSINESS}/register-business/${adminId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Đăng ký thành công !");
        navigate("/admin/list-business");
      } else {
        await axios.post(
          `${BASE_URL_ADMIN}/register-admin/${adminId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Đăng ký thành công !");
        navigate("/admin/list-admin");
      }
    } catch (error) {
      error.response.data.errors.forEach((errorMsg) => toast.error(errorMsg));
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
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
            {role_id == 3 ? (
              <>
                <Link to="/admin/list-business">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin/list-admin">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            )}

            <h3 className=" fw-bold my-3">
              {role_id == 3 ? (
                <>
                  <img
                    src={businessimg}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />{" "}
                  ĐĂNG KÝ DOANH NGHIỆP
                </>
              ) : (
                <>
                  <img
                    src={adminimg}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />{" "}
                  ĐĂNG KÝ ADMIN
                </>
              )}
            </h3>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form className=" mt-3 col-12 mx-auto" onSubmit={handleSubmit}>
            <Row>
              {role_id == 2 ? (
                <>
                  <Col className="col-12">
                    <Form.Group className="mb-lg-4 mb-3 ">
                      <Form.Label className=" ">
                        <GrUserAdmin className="fs-4" /> Quyền hạn{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        required
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">Chọn quyền</option>
                        <option value="4">Account Management</option>
                        <option value="5">News Management</option>
                        <option value="6">Support Management</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </>
              ) : (
                <></>
              )}

              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className=" ">
                    <ImProfile className="fs-4" />{" "}
                    {role_id == 3 ? <>Tên doanh nghiệp</> : <>Họ và tên</>}
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
                  <Form.Label className=" ">
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
                  <Form.Label className=" ">
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
                  <Form.Label className=" ">
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
                  <Form.Label className=" ">
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
                    max={getMaxDate()}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className=" ">
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
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3">
                  <Form.Label className=" ">
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

              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                style={{ background: RED_COLOR, border: "0px" }}
                className="col-12 col-lg-3 py-3 mt-4"
                type="submit"
              >
                <span className=" ">
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
