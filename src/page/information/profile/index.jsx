import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "@/context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import UpdateImage from "@/components/up-images";
import LoadingBackdrop from "@/components/backdrop";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { RiBankCardFill } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import {
  RED1_COLOR,
} from "@/constants";
import { RiBankFill } from "react-icons/ri";
import CouponsList from "@/components/modal-history-coupons";

const Profile = () => {
  const { accountId, isLoggedIn, token, role } = useAuth();
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
    bank_account_name: "",
    bank_account_number: "",
    bank_name: "",
  });
  const [banknames, setBanknames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.vietqr.io/v2/banks");
        setBanknames(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (role == 1) {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
            {
              params: { role: 1 },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (role == 3) {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
            {
              params: { role: 3 },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
            {
              params: { role: 2 },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

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
      if (role == 1) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
          {
            ...formData,
            birth_of_date: formattedDate,
          },
          {
            params: { role: 1 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role == 3) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
          {
            ...formData,
            birth_of_date: formattedDate,
          },
          {
            params: { role: 3 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
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
      }

      toast.success("Thông tin tài khoản đã được cập nhật!");
    } catch (error) {
       if (error.response.data.errors){
      error.response.data.errors.forEach((errorMsg) => toast.error(errorMsg));}
      toast.error(error.response.data.message);
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
            {role == 1 ? (
              <>
                {" "}
                <CouponsList />
                <hr />
              </>
            ) : (
              <></>
            )}
            <form onSubmit={handleSubmit}>
              <Row>
                {role != 1 && role != 3 ? (
                  <>
                    {" "}
                    <Col className="col-12">
                      {" "}
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="  fw-bold">
                          <GrUserAdmin className="fs-4" /> Vai trò:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={formData.role_name}
                        />
                      </Form.Group>
                    </Col>
                  </>
                ) : (
                  <></>
                )}

                <Col className="col-lg-6 col-12">
                  {" "}
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="  fw-bold">
                      <MdAccountBox className="fs-4" /> Username:
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="   fw-bold">
                      <ImProfile className="fs-4" /> Họ và Tên:
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="   fw-bold">
                      <LiaBirthdayCakeSolid className="fs-4" /> Ngày sinh:
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="   fw-bold">
                      <FaPhoneSquareAlt className="fs-4" /> Số điện thoại:
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="   fw-bold">
                      <TiLocation className="fs-4" /> Địa chỉ:
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
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="   fw-bold">
                      <HiOutlineMail className="fs-4" /> Email:
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
                {role == 1 ? (
                  <>
                    <p className="my-3 mb-4">
                      (Quý khách vui lòng cung cấp STK Ngân hàng để thuận tiện
                      cho quá trình chuyển trả/ hoàn tiền)
                    </p>
                  </>
                ) : role == 3 ? (
                  <>
                    {" "}
                    <p className="my-3 mb-4">
                      (Vui lòng cung cấp STK Ngân hàng để thuận tiện cho quá
                      trình chuyển trả/ hoàn tiền)
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {role != 2 && role != 4 && role != 5 && role != 6 ? (
                  <>
                    {" "}
                    <Col className="col-lg-12 col-12">
                      {" "}
                      <Form.Group className="mb-4">
                        <Form.Label className="  fw-bold">
                          <RiBankFill className="fs-4" /> Chọn ngân hàng{" "}
                          <span className="text-danger">(*) </span>:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={formData.bank_name}
                          onChange={handleChange}
                          name="bank_name"
                        >
                          <option value="">Chọn ngân hàng</option>
                          {banknames.map((item) => (
                            <option key={item.id} value={item.name + item.code}>
                              {item.name} - ({item.code})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className="col-lg-6 col-12">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="   fw-bold">
                          <RiBankCardFill className="fs-4" /> Tên tài khoản ngân
                          hàng:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="bank_account_name"
                          value={formData.bank_account_name}
                          placeholder="chưa cập nhật"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-lg-6 col-12">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="   fw-bold">
                          <RiBankCardFill className="fs-4" /> STK ngân hàng:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="bank_account_number"
                          value={formData.bank_account_number}
                          placeholder="chưa cập nhật"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </>
                ) : (
                  <></>
                )}

                <Col className="col-12 col-lg-3">
                  <Button
                    style={{ background: RED1_COLOR, border: "0px" }}
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
