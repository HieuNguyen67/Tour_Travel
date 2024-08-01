import { ImProfile } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { LuCalendarDays } from "react-icons/lu";
import { MdLocationOn, MdOutlineBusinessCenter } from "react-icons/md";
import pricetagimg from "@/assets/image/pricetag.png";
import infocontactimg from "@/assets/image/infocontact.png";
import { FaChevronRight } from "react-icons/fa";
import {
  Col,
  Placeholder,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context";
import axios from "axios";

const DetailBooking = ({tour}) => {
  const { tour_id } = useParams();
  const { accountId, token } = useAuth();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [formData, setFormData] = useState([]);

  

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/get-all-tour-images/${tour_id}`
        );
        setImage(response.data);
        setLoading1(false);
      } catch (error) {
        console.error("Error fetching tour images:", error);
        setLoading1(false);
      }
    };

    fetchTourImages();
  }, [tour_id]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        var response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/account/${accountId}`,
          {
            params: { role: 1 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    fetchAccountData();
  }, [accountId]);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  };

  return (
    <>
      {" "}
      <div className="mt-5 pt-5">
        <div
          style={{ background: "#f9f9f9" }}
          className="rounded-3 mt-lg-3 shadow"
        >
          <Row>
            <Col className="col-lg-4 col-12">
              {loading1 ? (
                <Placeholder as="div" animation="wave">
                  <Placeholder className="rounded-3 sizeimgbooking col-12 mb-3 mb-lg-0" />
                </Placeholder>
              ) : (
                image[0] && (
                  <img
                    src={`data:image/jpeg;base64,${image[0].image}`}
                    alt={`Tour ${tour_id} Image 1`}
                    className="rounded-3 shadow sizeimgbooking col-12 mb-3 mb-lg-0"
                  />
                )
              )}
            </Col>
            <Col className="col-lg-8 col-12 py-2 px-lg-0 px-4">
              <h4 className="fw-bold mb-3">{tour.name}</h4>
              <p>
                <LuCalendarDays className=" text-dark" /> Ngày khởi hành: &nbsp;
                <span className="fw-bold">{formatDate(tour.start_date)}</span>
              </p>
              <p>
                <LuCalendarDays className="text-dark" /> Ngày kết thúc: &nbsp;
                <span className="fw-bold">{formatDate(tour.end_date)}</span>
              </p>
              <p>
                <MdLocationOn className="text-danger" /> Nơi khởi hành:{" "}
                <span className="fw-bold">{tour.departure_location_name}</span>
              </p>

              <p>
                <MdOutlineBusinessCenter /> Điều hành:{" "}
                <span className="fw-bold">{tour.account_name}</span>
              </p>
              <p>
                Số lượng còn nhận:{" "}
                <span className="fw-bold">{tour.quantity}</span>
              </p>
            </Col>
          </Row>
        </div>
        <h3 className="text-center fw-bold my-5">
          {" "}
          <img
            src={pricetagimg}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
          />{" "}
          BẢNG GIÁ TOUR
        </h3>
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Loại giá\Độ tuổi</th>
              <th>Người lớn (Trên 11 tuổi)</th>
              <th>Trẻ em (5 - 11 tuổi)</th>
              <th>Trẻ nhỏ ({"<"} 5 tuổi)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Giá</td>
              <td className="text-danger fw-bold">
                {formatPrice(tour.adult_price)}
              </td>
              <td className="text-danger fw-bold">
                {formatPrice(tour.child_price)}
              </td>
              <td className="text-danger fw-bold">
                {formatPrice(tour.infant_price)}
              </td>
            </tr>
          </tbody>
        </Table>
        <h3 className="text-center fw-bold my-5">
          {" "}
          <img
            src={infocontactimg}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />{" "}
          THÔNG TIN LIÊN HỆ
        </h3>
        <div>
          <Row>
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
            <Link
              to="/information/profile"
              className="text-end text-decoration-none text-dark"
            >
              Cập nhật lại thông tin <FaChevronRight />
            </Link>
          </Row>
        </div>{" "}
      </div>
    </>
  );
};
export default DetailBooking;
