import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context";
import { BASE_URL_ADMIN, BASE_URL_CUSTOMER, BASE_URL_USER, RED1_COLOR, TEXT_RED_COLOR } from "@/constants";
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
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import momoimg from "@/assets/image/momo.png";
import atmimg from "@/assets/image/atm.png";
import visaimg from "@/assets/image/visa.png";
import zalopayimg from "@/assets/image/zalopay.png";

const BookTour = () => {
  const { tour_id } = useParams();
  const { customerId, isLoggedIn, accountId, token } = useAuth();
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(0);
  const [infantQuantity, setInfantQuantity] = useState(0);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [tour, setTour] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const [formData, setFormData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("bank");
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
      alert(`Tổng số lượng không được vượt quá ${tour.quantity}`);
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
  const handleBookTour = async () => {
    setLoading2(true);
    try {
      if (paymentMethod === "bank") {
        const response = await axios.post(
          `${BASE_URL_CUSTOMER}/book-tour/${tour_id}/${customerId}`,
          {
            adult_quantity: adultQuantity,
            child_quantity: childQuantity,
            infant_quantity: infantQuantity,
            note,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
        toast.success(response.data.message);
        navigate(`/checkout/1/${response.data.order.code_order}`);
      } else if (paymentMethod === "zalopay") {
        const response = await axios.post(
          `${BASE_URL_CUSTOMER}/book-tour-zalopay/${tour_id}/${customerId}`,
          {
            adult_quantity: adultQuantity,
            child_quantity: childQuantity,
            infant_quantity: infantQuantity,
            note: note,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.payment_url) {
          setPaymentUrl(response.data.payment_url);
        }
        setMessage(response.data.message);
      } else {
        const response = await axios.post(
          `${BASE_URL_CUSTOMER}/book-tour-momopay/${tour_id}/${customerId}`,
          {
            adult_quantity: adultQuantity,
            child_quantity: childQuantity,
            infant_quantity: infantQuantity,
            note: note,
            paymentMethod: paymentMethod,
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


   const handleBoxClick = (value) => {
     setPaymentMethod(value);
   };
    

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
            />{" "}
            HÀNH KHÁCH
          </h3>
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

          <Form.Group className="mt-4">
            <Form.Label>
              {" "}
              Ghi chú/ Nhập danh sách người đi cùng (Họ tên - Giới tính - Ngày
              sinh):
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
            />{" "}
            PHƯƠNG THỨC THANH TOÁN
          </h3>

          <Form.Group controlId="paymentMethod">
            <Row>
              <Col className="col-12  mb-3">
                <div
                  style={{
                    background: "rgba(247,249,250,1.00)",
                    padding: "1rem",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  className="shadow-sm rounded-3"
                  onClick={() => handleBoxClick("captureWallet")}
                >
                  <Row>
                    <Col className="col-8">
                      {" "}
                      <Form.Check
                        className="fs-5 fw-bold"
                        type="radio"
                        label="Quét mã MOMO"
                        name="paymentMethod"
                        id="captureWallet"
                        value="captureWallet"
                        checked={paymentMethod === "captureWallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Col>{" "}
                    <Col>
                      {" "}
                      <div style={{ display: "grid", placeItems: "end" }}>
                        <img
                          src={momoimg}
                          style={{
                            width: "3.5rem",
                            height: "3.5rem",
                            objectFit: "cover",
                          }}
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                  {paymentMethod === "captureWallet" && (
                    <>
                      <div
                        className="mt-3 rounded-3"
                        style={{
                          background: "rgb(236, 248, 255)",
                          border: "2px solid rgb(1, 148, 243)",
                          padding: "1rem",
                          color: "black",
                        }}
                      >
                        <p>
                          Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang
                          thanh toán của MOMO:
                        </p>
                        <ol>
                          <li>
                            <strong>Mở ứng dụng MoMo:</strong>
                            <p>Mở ứng dụng MoMo trên điện thoại của bạn.</p>
                          </li>
                          <li>
                            <strong>Chọn mục "Quét mã":</strong>
                            <p>
                              Trên giao diện chính của ứng dụng, chọn mục "Quét
                              mã".
                            </p>
                          </li>
                          <li>
                            <strong>Quét mã QR:</strong>
                            <p>
                              Di chuyển điện thoại của bạn sao cho mã QR nằm
                              trong khung quét của camera. Ứng dụng sẽ tự động
                              nhận diện và quét mã.
                            </p>
                          </li>
                          <li>
                            <strong>Kiểm tra thông tin thanh toán:</strong>
                            <p>
                              Sau khi quét mã, thông tin giao dịch sẽ hiển thị
                              trên màn hình. Kiểm tra lại số tiền và thông tin
                              người nhận.
                            </p>
                          </li>
                          <li>
                            <strong>Xác nhận thanh toán:</strong>
                            <p>
                              Nếu mọi thông tin đều chính xác, nhấn vào nút
                              "Thanh toán" hoặc "Xác nhận".
                            </p>
                          </li>
                          <li>
                            <strong>Nhập mã PIN:</strong>
                            <p>
                              Nhập mã PIN của bạn để xác nhận giao dịch. Sau khi
                              nhập mã PIN, giao dịch sẽ được xử lý.
                            </p>
                          </li>
                          <li>
                            <strong>Hoàn tất:</strong>
                            <p>
                              Sau khi thanh toán thành công, bạn sẽ nhận được
                              thông báo và biên nhận trên ứng dụng MoMo.
                            </p>
                          </li>
                        </ol>
                        <p>
                          Vậy là bạn đã hoàn tất thanh toán bằng mã QR MoMo!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Col>
              <Col className="col-12  mb-3">
                <div
                  style={{
                    background: "rgba(247,249,250,1.00)",
                    padding: "1rem",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  className="shadow-sm rounded-3"
                  onClick={() => handleBoxClick("payWithATM")}
                >
                  <Row>
                    <Col className="col-8">
                      {" "}
                      <Form.Check
                        className="fs-5 fw-bold"
                        type="radio"
                        label="Thanh toán thẻ ATM nội địa"
                        name="paymentMethod"
                        id="payWithATM"
                        value="payWithATM"
                        checked={paymentMethod === "payWithATM"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Col>{" "}
                    <Col>
                      {" "}
                      <div style={{ display: "grid", placeItems: "end" }}>
                        <img
                          src={atmimg}
                          style={{
                            width: "3.5rem",
                            height: "3.5rem",
                            objectFit: "contain",
                          }}
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                  {paymentMethod === "payWithATM" && (
                    <>
                      <div
                        className="mt-3 rounded-3"
                        style={{
                          background: "rgb(236, 248, 255)",
                          border: "2px solid rgb(1, 148, 243)",
                          padding: "1rem",
                          color: "black",
                        }}
                      >
                        <p>
                          Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang
                          thanh toán:
                        </p>
                        <ol>
                          <li>
                            <strong>Nhập thông tin thẻ ATM:</strong>
                            <p>
                              Điền đầy đủ thông tin thẻ ATM của bạn, bao gồm số
                              thẻ, tên chủ thẻ, ngày hết hạn .
                            </p>
                          </li>
                          <li>
                            <strong>Xác nhận thông tin giao dịch:</strong>
                            <p>
                              Kiểm tra lại thông tin giao dịch, đảm bảo rằng tất
                              cả thông tin đều chính xác.
                            </p>
                          </li>
                          <li>
                            <strong>Thực hiện thanh toán:</strong>
                            <p>
                              Nhấn vào nút "Thanh toán" để tiến hành giao dịch.
                              Hệ thống sẽ chuyển bạn đến trang xác thực của ngân
                              hàng.
                            </p>
                          </li>
                          <li>
                            <strong>Nhập mã OTP:</strong>
                            <p>
                              Ngân hàng sẽ gửi mã OTP (One-Time Password) đến số
                              điện thoại của bạn. Nhập mã này để xác nhận giao
                              dịch.
                            </p>
                          </li>
                          <li>
                            <strong>Hoàn tất giao dịch:</strong>
                            <p>
                              Sau khi nhập mã OTP và xác nhận, giao dịch sẽ được
                              xử lý. Bạn sẽ nhận được thông báo giao dịch thành
                              công.
                            </p>
                          </li>
                        </ol>
                      </div>
                    </>
                  )}
                </div>
              </Col>
              <Col className="col-12  mb-3">
                <div
                  style={{
                    background: "rgba(247,249,250,1.00)",
                    padding: "1rem",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  className="shadow-sm rounded-3"
                  onClick={() => handleBoxClick("payWithCC")}
                >
                  <Row>
                    <Col className="col-8">
                      {" "}
                      <Form.Check
                        className="fs-5 fw-bold"
                        type="radio"
                        label="Thẻ Visa/Mastercard/JCB"
                        name="paymentMethod"
                        id="payWithCC"
                        value="payWithCC"
                        checked={paymentMethod === "payWithCC"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Col>{" "}
                    <Col>
                      {" "}
                      <div style={{ display: "grid", placeItems: "end" }}>
                        <img
                          src={visaimg}
                          style={{
                            width: "3.5rem",
                            height: "3.5rem",
                            objectFit: "contain",
                          }}
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                  {paymentMethod === "payWithCC" && (
                    <>
                      <div
                        className="mt-3 rounded-3"
                        style={{
                          background: "rgb(236, 248, 255)",
                          border: "2px solid rgb(1, 148, 243)",
                          padding: "1rem",
                          color: "black",
                        }}
                      >
                        <p>
                          Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang
                          thanh toán:
                        </p>
                        <ol>
                          <li>
                            <strong>Nhập thông tin thẻ quốc tế:</strong>
                            <p>
                              Điền đầy đủ thông tin thẻ quốc tế của bạn, bao gồm
                              số thẻ, tên chủ thẻ, ngày hết hạn và mã CVV.
                            </p>
                          </li>
                          <li>
                            <strong>Xác nhận thông tin giao dịch:</strong>
                            <p>
                              Kiểm tra lại thông tin giao dịch, đảm bảo rằng tất
                              cả thông tin đều chính xác.
                            </p>
                          </li>
                          <li>
                            <strong>Thực hiện thanh toán:</strong>
                            <p>
                              Nhấn vào nút "Thanh toán" để tiến hành giao dịch.
                              Hệ thống sẽ xử lý thông tin và chuyển bạn đến
                              trang xác thực của ngân hàng (nếu cần).
                            </p>
                          </li>
                          <li>
                            <strong>Nhập mã OTP:</strong>
                            <p>
                              Nếu ngân hàng yêu cầu, mã OTP (One-Time Password)
                              sẽ được gửi đến số điện thoại của bạn. Nhập mã này
                              để xác nhận giao dịch.
                            </p>
                          </li>
                          <li>
                            <strong>Hoàn tất giao dịch:</strong>
                            <p>
                              Sau khi nhập mã OTP và xác nhận, giao dịch sẽ được
                              xử lý. Bạn sẽ nhận được thông báo giao dịch thành
                              công.
                            </p>
                          </li>
                        </ol>
                      </div>
                    </>
                  )}
                </div>
              </Col>
              <Col className="col-12  mb-3">
                <div
                  style={{
                    background: "rgba(247,249,250,1.00)",
                    padding: "1rem",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  className="shadow-sm rounded-3"
                  onClick={() => handleBoxClick("zalopay")}
                >
                  <Row>
                    <Col className="col-8">
                      {" "}
                      <Form.Check
                        className="fs-5 fw-bold"
                        type="radio"
                        label="Quét mã ZALOPAY"
                        name="paymentMethod"
                        id="zalopay"
                        value="zalopay"
                        checked={paymentMethod === "zalopay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Col>{" "}
                    <Col>
                      {" "}
                      <div style={{ display: "grid", placeItems: "end" }}>
                        <img
                          src={zalopayimg}
                          style={{
                            width: "3.5rem",
                            height: "3.5rem",
                            objectFit: "contain",
                          }}
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                  {paymentMethod === "zalopay" && (
                    <>
                      <div
                        className="mt-3 rounded-3"
                        style={{
                          background: "rgb(236, 248, 255)",
                          border: "2px solid rgb(1, 148, 243)",
                          padding: "1rem",
                          color: "black",
                        }}
                      >
                        <p>
                          Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang
                          thanh toán của ZaloPay:
                        </p>
                        <ol>
                          <li>
                            <strong>Quét mã QR:</strong>
                            <p>
                              Mã QR sẽ hiển thị trên màn hình. Mở ứng dụng
                              ZaloPay trên điện thoại của bạn.
                            </p>
                            <ul>
                              <li>
                                Chọn mục "Quét mã" trong ứng dụng ZaloPay.
                              </li>
                              <li>
                                Di chuyển điện thoại sao cho mã QR trên màn hình
                                máy tính nằm trong khung quét của camera.
                              </li>
                            </ul>
                          </li>
                          <li>
                            <strong>Kiểm tra thông tin thanh toán:</strong>
                            <p>
                              Sau khi quét mã, thông tin giao dịch sẽ hiển thị
                              trên màn hình điện thoại. Kiểm tra lại số tiền và
                              thông tin người nhận.
                            </p>
                          </li>
                          <li>
                            <strong>Xác nhận thanh toán:</strong>
                            <p>
                              Nếu mọi thông tin đều chính xác, nhấn vào nút
                              "Thanh toán" hoặc "Xác nhận" trên ứng dụng
                              ZaloPay.
                            </p>
                          </li>
                          <li>
                            <strong>Hoàn tất giao dịch:</strong>
                            <p>
                              Sau khi thanh toán thành công, bạn sẽ nhận được
                              thông báo và biên nhận trên ứng dụng ZaloPay cũng
                              như trên trang Webpay của ZaloPay.
                            </p>
                          </li>
                        </ol>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Form.Group>

          {/* {message && <p>{message}</p>} */}

          <div style={{ display: "grid", placeItems: "end" }} className="my-4">
            <Button
              style={{ border: "0px", background: RED1_COLOR }}
              onClick={handleBookTour}
              disabled={loading2}
              className="py-3 col-lg-3 col-12"
            >
              {loading2 ? <>Loading...</> : <>Đặt Ngay</>}
            </Button>
          </div>
          {paymentUrl && (
            <div>
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                Thanh toán
              </a>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default BookTour;
