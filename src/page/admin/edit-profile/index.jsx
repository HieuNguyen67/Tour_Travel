import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../../../context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import LoadImage from "./load-image";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingBackdrop from "../../../components/backdrop";
import { BLUE_COLOR } from "../../../constants/color";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";

const EditProfile = () => {
    const {account_id,role_id}=useParams();
  const {  isLoggedIn,token } = useAuth();
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
          `http://localhost:5020/v1/api/admin/account/${account_id}`,
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Thông tin tài khoản đã được cập nhật!");
      {role_id == 3
        ? navigate("/admin/list-business")
        : role_id == 4
        ? navigate("/business/list-guide")
        : navigate("/admin/list-customer");};
            

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
      <Container className="my-lg-3 my-2   pb-5">
        {role_id == 3 ? (
          <Link to="/admin/list-business">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        ) : role_id == 4 ? (
          <Link to="/business/list-guide">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        ) : (
          <Link to="/admin/list-customer">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        )}

        {role_id == 3 ? (
          <>
            <h4 className="mb-lg-5 fw-bold">
              {" "}
              <ImProfile className="fs-3" /> THÔNG TIN DOANH NGHIỆP:
            </h4>
          </>
        ) : (
          <>
            <h4 className="mb-lg-5 fw-bold">
              {" "}
              <ImProfile className="fs-3" /> THÔNG TIN KHÁCH HÀNG:
            </h4>
          </>
        )}
        <Row>
          <Col className="col-lg-3 col-12">
            {" "}
            <LoadImage />
          </Col>
          <Col className="col-lg-9 col-12 ">
            {" "}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12">
                  <Form.Group className="mb-4 ">
                    <Form.Label className="fw-bold">
                      <RxUpdate className="fs-5" /> Trạng thái:
                    </Form.Label>
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family fw-bold">
                      <MdAccountBox className="fs-4" /> Username:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={formData.username}
                      placeholder="Tên đăng nhập"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      <ImProfile className="fs-4" /> Họ và Tên:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={formData.name}
                      placeholder="Họ và tên"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      <LiaBirthdayCakeSolid className="fs-4" /> Ngày sinh:
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      max="2008-12-31"
                      value={formData.birth_of_date}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      <FaPhoneSquareAlt className="fs-4" /> Số điện thoại:
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={formData.phone_number}
                      placeholder="Số điện thoại"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      <TiLocation className="fs-4" /> Địa chỉ:
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={formData.address}
                      placeholder="Địa chỉ"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-6 col-12">
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="font-family  fw-bold">
                      <HiOutlineMail className="fs-4" /> Email:
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={formData.email}
                      placeholder="Email"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 col-lg-3">
                  <Button
                    style={{ background: BLUE_COLOR }}
                    type="submit"
                    className="py-3  col-12 mt-2"
                  >
                    <FaSave /> Cập nhật trạng thái
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
