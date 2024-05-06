import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../../../context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Backdrop, CircularProgress } from "@mui/material";
import { FaSave } from "react-icons/fa";
import LoadImage from "./load-image";
import { IoArrowBackOutline } from "react-icons/io5";
import UpdateImageProfile from "./up-image";

const EditProfile = () => {
    const {account_id,role_id}=useParams();
  const {  isLoggedIn } = useAuth();
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
    status:"",
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/${account_id}`
        );
        const accountData = response.data;
        setFormData({
          ...accountData,
          birth_of_date: formatDate(accountData.birth_of_date),
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    fetchAccountData();
  }, [account_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = formatDate(formData.birth_of_date);
      await axios.put(
        `http://localhost:5020/v1/api/admin/account/${account_id}`,
        {
          ...formData,
          birth_of_date: formattedDate,
        }
      );

      toast.success("Thông tin tài khoản đã được cập nhật!");
      {role_id == 3
        ? navigate("/admin/list-business")
        : navigate("/admin/list-customer")};
            

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
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container className="my-lg-3 my-2   pb-5">
        {role_id == 3 ? (
          <Link to="/admin/list-business">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        ) : (
          <Link to="/admin/list-customer">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        )}

        {role_id == 3 ? (
          <>
            <h4 className="mb-lg-5 fw-bold">THÔNG TIN DOANH NGHIỆP:</h4>
          </>
        ) : (
          <>
            <h4 className="mb-lg-5 fw-bold">THÔNG TIN KHÁCH HÀNG:</h4>
          </>
        )}
        <Row>
          <Col className="col-lg-3 col-12">
            {" "}
            <LoadImage />
            <UpdateImageProfile />
          </Col>
          <Col className="col-lg-9 col-12 ">
            {" "}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>Trạng thái:</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Active</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
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
                      value={formData.email}
                      placeholder="Email"
                      readOnly
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

export default EditProfile;
