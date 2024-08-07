import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context";
import {
  RED1_COLOR,
  TEXT_RED_COLOR,
} from "@/constants";
import {
  Col,
  Container,
  Form,
  Button,
  Row,
} from "react-bootstrap";
import "./booking-tour.scss";
import { toast } from "react-toastify";
import customerimg from "@/assets/image/customer.png";
import paymentimg from "@/assets/image/payment.png";
import listimg from "@/assets/image/list.png";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { Suspense, lazy } from "react";
import DownloadExcelTemplate from "@/components/form-excel-passengers";
import uploadimg from "@/assets/image/upload.png";
import { Checkbox } from "@mui/material";
import { TbCoinFilled } from "react-icons/tb";
import DetailBooking from "@/components/detail-booking";
import LoadingBackdrop from "@/components/backdrop";

const PaymentMethod = lazy(() => import("@/components/payment-method"));

const BookTour = () => {
  const { tour_id } = useParams();
  const { customerId, isLoggedIn, token, shareToken } = useAuth();
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(0);
  const [infantQuantity, setInfantQuantity] = useState(0);
  const [note, setNote] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("captureWallet");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [file, setFile] = useState(null);
const [coupons, setCoupons] = useState([]);
const [selectedCouponIds, setSelectedCouponIds] = useState([]);
const [totalCoupons, setTotalCoupons] = useState(0);
  const [tour, setTour] = useState([]);

  const validateName = (name) => /^[A-Za-zÀ-ỹà-ỹ\s]+$/.test(name);

  const validatePassportNumber = (passportNumber) => {
    return passportNumber === "" || /^[\d]+$/.test(passportNumber);
  };

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
        `${process.env.REACT_APP_BASE_URL_USER}/get-tour/${tour_id}`
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
    const fetchCoupons = async () => {
      try {
        if (tour.business_id) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_CUSTOMER}/coupons/${customerId}/${tour.business_id}`
          );
          setCoupons(response.data.coupons);
          setTotalCoupons(response.data.total_points);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [customerId, tour.business_id]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCouponIds(coupons.map((coupon) => coupon.coupon_id));
    } else {
      setSelectedCouponIds([]);
    }
  };

  useEffect(() => {
    if (tour) {
      if(tour.discount_percentage >0){ var total =
        tour.adult_price_discount * adultQuantity +
        tour.child_price_discount * childQuantity +
        tour.infant_price_discount * infantQuantity;}else{ var total =
          tour.adult_price * adultQuantity +
          tour.child_price * childQuantity +
          tour.infant_price * infantQuantity;}
     
      if (selectedCouponIds.length > 0) {
        var discount = total - totalCoupons;
      } else {
        var discount = total;
      }
      setTotalPrice(discount);
    }
  }, [tour, adultQuantity, childQuantity, infantQuantity, selectedCouponIds]);

  const handleQuantityChange = (type, value) => {
    const totalQuantity =
      (type === "adult" ? value : adultQuantity) +
      (type === "child" ? value : childQuantity) +
      (type === "infant" ? value : infantQuantity);

    if (tour && totalQuantity > tour.quantity) {
      toast.error(`Số lượng KH còn nhận không được vượt quá ${tour.quantity}`);
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
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];

      const currentAdults = updatedPassengers.filter(
        (p) => p.type === "Người lớn"
      ).length;
      const currentChildren = updatedPassengers.filter(
        (p) => p.type === "Trẻ em"
      ).length;
      const currentInfants = updatedPassengers.filter(
        (p) => p.type === "Trẻ nhỏ"
      ).length;

      const adjustPassengers = (quantity, type, currentCount) => {
        if (quantity > currentCount) {
          for (let i = currentCount; i < quantity; i++) {
            updatedPassengers.push({
              name: "",
              birthdate: "",
              gender: "",
              passport_number: type === "Người lớn" ? "" : null,
              type: type,
            });
          }
        } else if (quantity < currentCount) {
          let countToRemove = currentCount - quantity;
          for (let i = updatedPassengers.length - 1; i >= 0; i--) {
            if (updatedPassengers[i].type === type && countToRemove > 0) {
              updatedPassengers.splice(i, 1);
              countToRemove--;
            }
          }
        }
      };

      adjustPassengers(adultQuantity, "Người lớn", currentAdults);
      adjustPassengers(childQuantity, "Trẻ em", currentChildren);
      adjustPassengers(infantQuantity, "Trẻ nhỏ", currentInfants);

      return updatedPassengers;
    });
  }, [adultQuantity, childQuantity, infantQuantity]);

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "name" && !validateName(value)) {
      alert("Tên không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    if (name === "passport_number" && !validatePassportNumber(value)) {
      toast.error("Số CCCD/Passport không hợp lệ.");
      return;
    }

    if (
      name === "passport_number" &&
      passengers.some(
        (passenger, i) => i !== index && passenger.passport_number === value
      )
    ) {
      toast.error("Số CCCD/Passport đã tồn tại. Vui lòng nhập số khác.");
      return;
    }

    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index][name] = value;
      return updatedPassengers;
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBookTour = async (e) => {
    e.preventDefault();
    setLoading2(true);
    try {
      if (paymentMethod === "bank") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("adult_quantity", adultQuantity);
        formData.append("child_quantity", childQuantity);
        formData.append("infant_quantity", infantQuantity);
        formData.append("note", note);
        formData.append("passengers", JSON.stringify(passengers));
          formData.append("coupon_ids", JSON.stringify(selectedCouponIds));

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/book-tour/${tour_id}/${customerId}/${shareToken}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMessage(response.data.message);
        toast.success(response.data.message);
        navigate(
          `/banking/${response.data.order.code_order}/${response.data.order.total_price}/${response.data.order.child_quantity}/${response.data.order.adult_quantity}/${response.data.order.infant_quantity}/*${response.data.order.note}`
        );
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("adult_quantity", adultQuantity);
        formData.append("child_quantity", childQuantity);
        formData.append("infant_quantity", infantQuantity);
        formData.append("note", note);
        formData.append("paymentMethod", paymentMethod);
        formData.append("passengers", JSON.stringify(passengers));
        formData.append("coupon_ids", JSON.stringify(selectedCouponIds));


        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/book-tour-momopay/${tour_id}/${customerId}/${shareToken}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
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
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <Container>
        <DetailBooking tour={tour} />
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
                {tour.discount_percentage > 0 ? (
                  <>{formatPrice(tour.adult_price_discount)}</>
                ) : (
                  <>{formatPrice(tour.adult_price)}</>
                )}
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
                {tour.discount_percentage > 0 ? (
                  <>{formatPrice(tour.child_price_discount)}</>
                ) : (
                  <>{formatPrice(tour.child_price)}</>
                )}
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
                {tour.discount_percentage > 0 ? (
                  <>{formatPrice(tour.infant_price_discount)}</>
                ) : (
                  <>{formatPrice(tour.infant_price)}</>
                )}
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
          <div style={{ display: "grid", placeItems: "end" }}>
            <label className="fw-bold">
              <Checkbox
                onChange={handleSelectAll}
                disabled={totalCoupons === 0}
              />
              &nbsp;
              <TbCoinFilled className="fs-4 text-warning" />
              &nbsp; Bạn đang có {totalCoupons} Xu của {tour.account_name}
            </label>
          </div>
          <div style={{ display: "none" }}>
            {coupons.map((coupon) => (
              <div key={coupon.coupon_id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCouponIds.includes(coupon.coupon_id)}
                    onChange={() => {
                      setSelectedCouponIds((prev) =>
                        prev.includes(coupon.coupon_id)
                          ? prev.filter((id) => id !== coupon.coupon_id)
                          : [...prev, coupon.coupon_id]
                      );
                    }}
                  />
                  {coupon.description} (Points: {coupon.points})
                </label>
              </div>
            ))}
          </div>
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

          {adultQuantity + childQuantity + infantQuantity <= 10 && (
            <>
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
                    {passenger.passport_number !== null && (
                      <Col>
                        {" "}
                        <Form.Group className="my-lg-3 mb-2 ">
                          <Form.Label className="fw-bold">
                            Số CCCD/Passport :
                            <span className="text-danger"></span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="passport_number"
                            value={passenger.passport_number}
                            onChange={(e) => handlePassengerChange(index, e)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    )}{" "}
                  </Row>
                </div>
              ))}
            </>
          )}
          {adultQuantity + childQuantity + infantQuantity > 10 && (
            <>
              {" "}
              <div style={{ display: "grid", placeItems: "end" }}>
                <DownloadExcelTemplate />
              </div>
              <p className="fw-bold text-danger">
                * Quý khách vui lòng tải về form Excel của chúng tôi và nhập
                danh sách hành khách đi cùng và bấm nút up file Excel lên trang
                web !{" "}
              </p>
              <div>
                <Form.Group controlId="formFile" className="mb-3">
                  <p className="fw-bold">
                    {" "}
                    <img
                      src={uploadimg}
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />{" "}
                    Vui lòng tải file Excel lên :
                  </p>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx,.xls"
                    required
                  />
                </Form.Group>
              </div>
            </>
          )}
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

          <div style={{ display: "grid", placeItems: "end" }} className="my-4">
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
      </Container>
    </>
  );
};

export default BookTour;
