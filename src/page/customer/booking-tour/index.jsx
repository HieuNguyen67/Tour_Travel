import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context";
import {
  BASE_URL_ADMIN,
  BASE_URL_CUSTOMER,
  BASE_URL_USER,
  BORDER,
  RED1_COLOR,
  TEXT_RED_COLOR,
} from "@/constants";
import {
  Col,
  Container,
  Placeholder,
  Form,
  Button,
  Row,
  Table,
} from "react-bootstrap";
import LoadingBackdrop from "@/components/backdrop";
import { LuCalendarDays } from "react-icons/lu";
import { MdLocationOn, MdOutlineBusinessCenter } from "react-icons/md";
import "./booking-tour.scss";
import { ImProfile } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import pricetagimg from "@/assets/image/pricetag.png";
import infocontactimg from "@/assets/image/infocontact.png";
import customerimg from "@/assets/image/customer.png";
import paymentimg from "@/assets/image/payment.png";
import listimg from "@/assets/image/list.png";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { Suspense, lazy } from "react";

const PaymentMethod = lazy(() => import("@/components/payment-method"));

const BookTour = () => {
  const { tour_id } = useParams();
  const { customerId, isLoggedIn, accountId, token } = useAuth();
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(0);
  const [infantQuantity, setInfantQuantity] = useState(0);
  const [note, setNote] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [message, setMessage] = useState("");
  const [tour, setTour] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [formData, setFormData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("captureWallet");
  const [paymentUrl, setPaymentUrl] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/get-tour/${tour_id}`
        );
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [tour_id]);

  useEffect(() => {
    if (tour) {
      const total =
        tour.adult_price * adultQuantity +
        tour.child_price * childQuantity +
        tour.infant_price * infantQuantity;
      setTotalPrice(total);
    }
  }, [tour, adultQuantity, childQuantity, infantQuantity]);

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/get-all-tour-images/${tour_id}`
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
          `${BASE_URL_USER}/account/${accountId}`,
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

  const handleQuantityChange = (type, value) => {
    const totalQuantity =
      (type === "adult" ? value : adultQuantity) +
      (type === "child" ? value : childQuantity) +
      (type === "infant" ? value : infantQuantity);

    if (tour && totalQuantity > tour.quantity) {
      toast.error(`Tổng số lượng không được vượt quá ${tour.quantity}`);
    } else {
      if (type === "adult") {
        setAdultQuantity(value);
      } else if (type === "child") {
        setChildQuantity(value);
      } else if (type === "infant") {
        setInfantQuantity(value);
      }
    }
  };
  const handleIncrement = (type) => {
    handleQuantityChange(
      type,
      (type === "adult"
        ? adultQuantity
        : type === "child"
        ? childQuantity
        : infantQuantity) + 1
    );
  };

  const handleDecrement = (type) => {
    const currentQuantity =
      type === "adult"
        ? adultQuantity
        : type === "child"
        ? childQuantity
        : infantQuantity;
    if (currentQuantity > 0) {
      handleQuantityChange(type, currentQuantity - 1);
    }
  };
  const handleDecrement1 = (type) => {
    const currentQuantity =
      type === "adult"
        ? adultQuantity
        : type === "child"
        ? childQuantity
        : infantQuantity;
    if (currentQuantity > 1) {
      handleQuantityChange(type, currentQuantity - 1);
    }
  };

  useEffect(() => {
    const updatedPassengers = [];

    for (let i = 0; i < adultQuantity; i++) {
      updatedPassengers.push({
        name: "",
        birthdate: "",
        gender: "",
        passport_number: "",
        type: "Người lớn",
      });
    }
    for (let i = 0; i < childQuantity; i++) {
      updatedPassengers.push({
        name: "",
        birthdate: "",
        gender: "",
        passport_number: "",
        type: "Trẻ em",
      });
    }
    for (let i = 0; i < infantQuantity; i++) {
      updatedPassengers.push({
        name: "",
        birthdate: "",
        gender: "",
        passport_number: "",
        type: "Trẻ nhỏ",
      });
    }

    setPassengers(updatedPassengers);
  }, [adultQuantity, childQuantity, infantQuantity]);

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index][name] = value;
      return updatedPassengers;
    });
  };

  const handleBookTour = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (paymentMethod === "bank") {
        const response = await axios.post(
          `${BASE_URL_CUSTOMER}/book-tour/${tour_id}/${customerId}`,
          {
            adult_quantity: adultQuantity,
            child_quantity: childQuantity,
            infant_quantity: infantQuantity,
            note: note,
            passengers: passengers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
        toast.success(response.data.message);
        navigate(
          `/banking/${response.data.order.code_order}/${response.data.order.total_price}/${response.data.order.child_quantity}/${response.data.order.adult_quantity}/${response.data.order.infant_quantity}/*${response.data.order.note}`
        );
      } else {
        const response = await axios.post(
          `${BASE_URL_CUSTOMER}/book-tour-momopay/${tour_id}/${customerId}`,
          {
            adult_quantity: adultQuantity,
            child_quantity: childQuantity,
            infant_quantity: infantQuantity,
            note: note,
            paymentMethod: paymentMethod,
            passengers: passengers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
          setPaymentUrl(response.data.payment_url);
        }
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to book tour:", error);
      setMessage("Đặt tour không thành công. Vui lòng thử lại sau.");
      toast.error(error.response.data.message);
    }
    setLoading2(false);
  };
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

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Container>
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
              <Col className="col-lg-8 col-12 py-2">
                <h4 className="fw-bold mb-3">{tour.name}</h4>
                <p>
                  <LuCalendarDays className=" text-dark" /> Ngày khởi hành:
                  &nbsp;
                  <span className="fw-bold">{formatDate(tour.start_date)}</span>
                </p>
                <p>
                  <LuCalendarDays className="text-dark" /> Ngày kết thúc: &nbsp;
                  <span className="fw-bold">{formatDate(tour.end_date)}</span>
                </p>
                <p>
                  <MdLocationOn className="text-danger" /> Nơi khởi hành:{" "}
                  <span className="fw-bold">
                    {tour.departure_location_name}
                  </span>
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
          </div>
          <h3 className="text-center fw-bold my-5">
            {" "}
            <img
              src={customerimg}
              style={{
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />{" "}
            HÀNH KHÁCH
          </h3>
          <form onSubmit={handleBookTour}>
            <Row>
              <Col className="col-lg-9 col-5">
                <h5>Người lớn</h5>
                <h3 className="fw-bold" style={{ color: TEXT_RED_COLOR }}>
                  {" "}
                  {formatPrice(tour.adult_price)}
                </h3>
                <p>Trên 11 tuổi</p>
              </Col>
              <Col className="col-lg-3 col-7 mt-4">
                <Row>
                  <Col>
                    {" "}
                    <div style={{ display: "grid", placeItems: "end" }}>
                      <Button
                        style={{ border: "0px", background: RED1_COLOR }}
                        onClick={() => handleDecrement1("adult")}
                        className="col-lg-7 col-md-7 col-12"
                      >
                        <IoMdRemove className="fs-4" />
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Control
                      type="number"
                      value={adultQuantity}
                      onChange={(e) =>
                        handleQuantityChange("adult", parseInt(e.target.value))
                      }
                      min={1}
                      className=" col-12"
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ border: "0px", background: RED1_COLOR }}
                      onClick={() => handleIncrement("adult")}
                      className="col-lg-7 col-md-7 col-12"
                    >
                      <IoMdAdd className="fs-4" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col className="col-lg-9 col-5">
                <h5>Trẻ em</h5>
                <h3 className="fw-bold" style={{ color: TEXT_RED_COLOR }}>
                  {" "}
                  {formatPrice(tour.child_price)}
                </h3>
                <p>Từ 5 - 11 tuổi</p>
              </Col>
              <Col className="col-lg-3 mt-4 col-7">
                <Row>
                  <Col>
                    {" "}
                    <div style={{ display: "grid", placeItems: "end" }}>
                      <Button
                        style={{ border: "0px", background: RED1_COLOR }}
                        onClick={() => handleDecrement("child")}
                        className="col-lg-7 col-md-7 col-12"
                      >
                        <IoMdRemove className="fs-4" />
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Control
                      type="number"
                      value={childQuantity}
                      onChange={(e) =>
                        handleQuantityChange("child", parseInt(e.target.value))
                      }
                      min={0}
                      className="col-12"
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ border: "0px", background: RED1_COLOR }}
                      onClick={() => handleIncrement("child")}
                      className="col-lg-7 col-md-7 col-12"
                    >
                      <IoMdAdd className="fs-4" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="col-lg-9 col-5">
                <h5>Trẻ nhỏ</h5>
                <h3 className="fw-bold" style={{ color: TEXT_RED_COLOR }}>
                  {" "}
                  {formatPrice(tour.infant_price)}
                </h3>
                <p>{"<"} 5 tuổi</p>
              </Col>
              <Col className="col-lg-3 mt-4 col-7">
                <Row>
                  <Col>
                    {" "}
                    <div style={{ display: "grid", placeItems: "end" }}>
                      <Button
                        style={{ border: "0px", background: RED1_COLOR }}
                        onClick={() => handleDecrement("infant")}
                        className="col-lg-7 col-md-7 col-12"
                      >
                        <IoMdRemove className="fs-4" />
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Control
                      type="number"
                      value={infantQuantity}
                      onChange={(e) =>
                        handleQuantityChange("infant", parseInt(e.target.value))
                      }
                      min={0}
                      className="col-12"
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ border: "0px", background: RED1_COLOR }}
                      onClick={() => handleIncrement("infant")}
                      className="col-lg-7 col-md-7 col-12"
                    >
                      <IoMdAdd className="fs-4" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <h4 className="text-end">
              TỔNG TIỀN: &nbsp;
              <span className="fw-bold fs-2" style={{ color: TEXT_RED_COLOR }}>
                {formatPrice(totalPrice)}
              </span>
            </h4>

            <h3 className="text-center fw-bold my-5">
              {" "}
              <img
                src={listimg}
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />{" "}
              DANH SÁCH KHÁCH HÀNG ĐI TOUR
            </h3>
            {passengers.map((passenger, index) => (
              <div
                key={index}
                style={{ border: "2px solid black", background: "white" }}
                className="rounded-4 shadow-sm p-3 mb-3"
              >
                <h5>
                  <FaUser /> Khách hàng {index + 1} (
                  {passenger.type.charAt(0).toUpperCase() +
                    passenger.type.slice(1)}{" "}
                  )
                </h5>
                <Row className="row-cols-lg-4 row-cols-1">
                  <Col>
                    {" "}
                    <Form.Group className="my-lg-3 mb-2">
                      <Form.Label className="fw-bold">
                        Họ tên:<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, e)}
                        required
                        placeholder="Nhập họ tên hành khách"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-lg-3 mb-2">
                      <Form.Label className="fw-bold">
                        Ngày sinh:<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="birthdate"
                        value={passenger.birthdate}
                        onChange={(e) => handlePassengerChange(index, e)}
                        required
                        max={today}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group className="my-lg-3 mb-2">
                      <Form.Label className="fw-bold">
                        Giới tính:<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="gender"
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, e)}
                        required
                      >
                        <option value="">Giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group className="my-lg-3 mb-2 ">
                      <Form.Label className="fw-bold">
                        Số CCCD/Passport (Nếu có):
                        <span className="text-danger"></span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="passport_number"
                        value={passenger.passport_number}
                        onChange={(e) => handlePassengerChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Group className="mt-4">
              <Form.Label className="fw-bold">
                {" "}
                Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi ! :
              </Form.Label>

              <Form.Control
                as="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ height: "8rem" }}
              />
            </Form.Group>
            <h3 className="text-center fw-bold my-5">
              {" "}
              <img
                src={paymentimg}
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />{" "}
              PHƯƠNG THỨC THANH TOÁN
            </h3>
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </Suspense>

            {/* {message && <p>{message}</p>} */}

            <div
              style={{ display: "grid", placeItems: "end" }}
              className="my-4"
            >
              <Button
                style={{ border: "0px", background: RED1_COLOR }}
                disabled={loading2}
                className="py-3 col-lg-3 col-12"
                type="submit"
              >
                {loading2 ? <>Loading...</> : <>Đặt Ngay</>}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default BookTour;
