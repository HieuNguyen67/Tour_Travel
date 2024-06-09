import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "@/context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import LoadImage from "./load-image";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingBackdrop from "@/components/backdrop";
import { BLUE_COLOR, RED_COLOR } from "@/constants";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { RiBankCardFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa6";
import { BASE_URL } from "@/constants";

const EditProfile = () => {
  const { account_id, role_id } = useParams();
  const { isLoggedIn, token, accountId, adminId } = useAuth();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const [formData, setFormData] = useState({
    status: "",
    note: "",
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (role_id == 1) {
          var response = await axios.get(`${BASE_URL}/account/${account_id}`, {
            params: { role: 1 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (role_id == 3) {
          var response = await axios.get(`${BASE_URL}/account/${account_id}`, {
            params: { role: 3 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          var response = await axios.get(
            `${BASE_URL}/account/${account_id}?role=2`,
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
      await axios.put(
        `${BASE_URL}/update-status-accounts/${account_id}/${adminId}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Thông tin tài khoản đã được cập nhật!");
      {
        role_id == 3
          ? navigate("/admin/list-business")
          : role_id == 1
          ? navigate("/business/list-customer")
          : navigate("/admin/list-admin");
      }
    } catch (error) {
      console.error("Failed to update account data:", error);
      toast.error(
       error.response.data.message
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
        ) :role_id == 1 ?  (
          <Link to="/admin/list-customer">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
        ):(<><Link to="/admin/list-admin">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link></>)}

        {role_id == 3 ? (
          <>
            <h4 className="mb-lg-5 fw-bold">
              {" "}
              <ImProfile className="fs-3" /> THÔNG TIN DOANH NGHIỆP:
            </h4>
          </>
        ) : role_id == 1 ? (
          <>
            <h4 className="mb-lg-5 fw-bold">
              {" "}
              <ImProfile className="fs-3" /> THÔNG TIN KHÁCH HÀNG:
            </h4>
          </>
        ) : (
          <>
            {" "}
            <h4 className="mb-lg-5 fw-bold">
              {" "}
              <ImProfile className="fs-3" /> THÔNG TIN {formData.role_name} :
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
                {formData.role_name == "Super Admin" ||
                formData.account_id == accountId ? (
                  <></>
                ) : (
                  <>
                    <Col className="col-lg-6 col-12">
                      <Form.Group className="mb-lg-4 mb-3 ">
                        <Form.Select
                          as="select"
                          required
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="Inactive">Inactive</option>
                          <option value="Active">Active</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-lg-4 ">
                        <Form.Control
                          as="textarea"
                          style={{ height: "10rem" }}
                          name="note"
                          placeholder="Ghi chú"
                          value={formData.note}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-12 col-lg-3 my-3 my-lg-0">
                      <Button
                        style={{ background: RED_COLOR, border: "0px" }}
                        type="submit"
                        className="  col-12 "
                      >
                        <FaSave /> Cập nhật trạng thái
                      </Button>
                    </Col>
                  </>
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
                      value={formData.username}
                      placeholder="Tên đăng nhập"
                      readOnly
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
                      value={formData.name}
                      placeholder="Họ và tên"
                      readOnly
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
                      max="2008-12-31"
                      value={formData.birth_of_date}
                      readOnly
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
                      value={formData.phone_number}
                      placeholder="Số điện thoại"
                      readOnly
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
                      value={formData.address}
                      placeholder="Địa chỉ"
                      readOnly
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
                      value={formData.email}
                      placeholder="Email"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                {!role_id == 1 && !role_id == 3 ? (
                  <>
                    <Col className="col-lg-6 col-12">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="   fw-bold">
                          <RiBankCardFill className="fs-4" /> Tên tài khoản ngân
                          hàng:
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="bank_account_name"
                          value={formData.bank_account_name}
                          placeholder="chưa cập nhật"
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-lg-6 col-12">
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label className="   fw-bold">
                          <RiBankCardFill className="fs-4" /> STK ngân hàng:
                        </Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="bank_account_number"
                          value={formData.bank_account_number}
                          placeholder="chưa cập nhật"
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProfile;
