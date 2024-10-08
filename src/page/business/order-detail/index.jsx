import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { format } from "date-fns";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context";
import {
  BLUE_COLOR,
  GREY_COLOR,
  RED1_COLOR,
  RED_COLOR,
  TEXT_MAIN_COLOR,
} from "@/constants";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import detailimg from "@/assets/image/detail.png";
import { Stepper, Step, StepLabel, Box, FormControl, InputLabel, Select, MenuItem, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaArrowCircleRight } from "react-icons/fa";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LoadingBackdrop from "@/components/backdrop";
import PaymentMethod from "@/components/payment-method";
import RateTour from "@/components/rate-tour";
import CancellationRequestModal from "@/components/request-cancellation";
import PassengersList from "@/components/list-passenger-order";
import ChangeOrderTour from "@/components/change-order-tour";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const steps = ["Chờ xác nhận", "Đã xác nhận", "Đã hoàn thành", "Đã huỷ"];

const getStatusIndex = (status) => {
  switch (status) {
    case "Pending":
      return 0;
    case "Confirm":
      return 1;
    case "Complete":
      return 2;
    case "Cancel":
      return 3;
    default:
      return 0;
  }
};
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: RED_COLOR,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: RED_COLOR,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: RED_COLOR,
  }),
  ...(ownerState.completed && {
    background: RED_COLOR,
  }),
}));

const ColorlibStepIcon = (props) => {
  const { active, completed, className } = props;

  const icons = {
    1: <MdPending className="fs-4" />,
    2: <MdIncompleteCircle className="fs-4" />,
    3: <GiConfirmed className="fs-4" />,
    4: <MdCancel className="fs-4" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, role, customerId, businessId } = useAuth();
  const [status, setStatus] = useState("");
  const [statuspayments, setStatuspayments] = useState("");
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("captureWallet");
  const [loading2, setLoading2] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
   const handleOpenModal1 = () => setShowModal1(true);
   const handleCloseModal1 = () => setShowModal1(false);

  const location= useLocation();
  const {order_id}= location.state || {};
 const[tourCode, setTourCode]= useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/order-detail/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       setTourCode(response.data.tour_id);
        setOrderDetail(response.data);
        setStatus(response.data.status);
        setStatuspayments(response.data.status_payment);
      } catch (error) {
        setError("Failed to fetch order detail");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [order_id]);

  


  useEffect(() => {
    const fetchPaymentDetail = async () => {
      if (orderDetail.status_payment === "Paid") {
        try {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/payment-detail/${order_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPaymentDetail(response.data);
        } catch (error) {
          setError("Failed to fetch payment detail");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPaymentDetail();
  }, [orderDetail.status_payment, order_id]);

  const navigate = useNavigate();


  const handleCancel= async()=>{
    try{
   
      const cancel= "Cancel";
      await axios.put(
        `${process.env.REACT_APP_BASE_URL_BUSINESS}/update-status-orders/${order_id}`,
        {
          status: cancel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        toast.success("Huỷ Booking thành công!");
        navigate("/information/list-order");
    }catch{
       toast.success("Lỗi!. Huỷ không thành công!");
          console.error("Failed to update orders status :", error);
      setError("Failed to update order status ");
    }
  };

  const handleUpdate = async () => {
     setLoading2(true);
    try {
      if (role == 3) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/update-status-orders/${order_id}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Cập nhật thành công!");
        navigate("/business/order-tour");
        window.location.reload();
      } else {
        const paid = "Paid";
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/update-status-payment-orders/${order_id}`,
          {
            statuspayments: paid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Cập nhật thành công!");
        navigate("/admin/list-payments");
      }
    } catch (error) {
      console.error("Failed to update orders status :", error);
      setError("Failed to update order status ");
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

  const handleBookTour = async () => {
    setLoading2(true);
    try {
      if (paymentMethod === "bank") {
       navigate(
         `/banking/${orderDetail.code_order}/${orderDetail.total_price}/${orderDetail.child_quantity}/${orderDetail.adult_quantity}/${orderDetail.infant_quantity}/*${orderDetail.note}`
       );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/payment-tour-momopay/${orderDetail.code_order}/${orderDetail.total_price}`,
          {
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
      }
    } catch (error) {
      console.error("Failed to payment:", error);
      toast.error(error.response.data.message);
    }
    setLoading2(false);
  };
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  if (loading) return <LoadingBackdrop open={loading} />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      {role == 3 ? (
        <>
          <Link to="/business/order-tour">
            <IoArrowBackOutline className="fs-3" />
          </Link>
        </>
      ) : role == 1 ? (
        <>
          {" "}
          <div className="mt-3">
            <Link
              to="/information/list-order"
              className="text-decoration-none text-dark "
            >
              <IoArrowBackOutline className="fs-5" /> Quay lại
            </Link>
          </div>
        </>
      ) : (
        <>
          {" "}
          <Link to="/admin/list-payments">
            <IoArrowBackOutline className="fs-3" />
          </Link>
        </>
      )}

      <h3 className="fw-bold my-4">
        <img
          src={detailimg}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        CHI TIẾT BOOKING
      </h3>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Stepper
          alternativeLabel
          activeStep={getStatusIndex(orderDetail.status)}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <h3 className=" fw-bold mt-5 ">
        <span
          className="fw-bold mt-4"
          style={{ border: "3px solid red", color: "red", padding: "1rem" }}
        >
          {orderDetail.status_payment === "Unpaid"
            ? "CHƯA THANH TOÁN"
            : "ĐÃ THANH TOÁN"}
        </span>
      </h3>
      {role == 1 ? (
        <>
          {orderDetail.status === "Complete" ? (
            <>
              {orderDetail.status_rating === "Not Rated" ? (
                <>
                  <Button
                    style={{ background: RED1_COLOR, border: "0px" }}
                    className="mt-5 py-3 col-lg-3 col-12"
                    onClick={handleShow}
                  >
                    ĐÁNH GIÁ TOUR
                  </Button>
                  <RateTour
                    customerId={customerId}
                    tourId={orderDetail.tour_id}
                    show={show}
                    handleClose={handleClose}
                    code_order={orderDetail.code_order}
                  />
                </>
              ) : (
                <>
                  <Button
                    style={{ background: RED1_COLOR, border: "0px" }}
                    className="mt-5"
                  >
                    Cảm ơn Quý khách đã đánh giá chuyến đi!
                  </Button>
                </>
              )}{" "}
              <div>
                <Link
                  to="/contact"
                  className="text-decoration-none text-primary"
                >
                  <Button variant="dark" className=" mt-3">
                    Nếu quý khách có thắc mắc/khiếu nại. Hãy liên hệ chúng tôi!{" "}
                    <FaArrowCircleRight />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <Row className="justify-content-md-center">
        <Col className="col-12">
          <Card className="my-4">
            <Card.Header>Chi tiết Booking</Card.Header>
            <Card.Body style={{ color: TEXT_MAIN_COLOR }}>
              <Card.Text>
                <strong>Mã Booking:</strong> {orderDetail.code_order}
              </Card.Text>
              <Card.Text>
                <strong>Mã tour:</strong>
                <span className="fw-bold text-dark">
                  {" "}
                  {orderDetail.tour_code}-{orderDetail.tour_id}
                </span>
              </Card.Text>
              <Card.Text>
                <strong>Tour:</strong>
                <span className="fw-bold text-dark">
                  {" "}
                  {orderDetail.tour_name} ({orderDetail.category_name})
                </span>
              </Card.Text>

              <Card.Text>
                <strong>Ngày bắt đầu:</strong>
                <span className="fw-bold text-info">
                  {" "}
                  {format(new Date(orderDetail.start_date), "yyyy-MM-dd")}
                </span>
              </Card.Text>
              <Card.Text>
                <strong>Ngày kết thúc:</strong>
                <span className="fw-bold text-info">
                  {" "}
                  {format(new Date(orderDetail.end_date), "yyyy-MM-dd")}
                </span>
              </Card.Text>

              <Card.Text>
                <strong>Số lượng người lớn:</strong>{" "}
                {orderDetail.adult_quantity}
              </Card.Text>
              <Card.Text>
                <strong>Số lượng trẻ em:</strong> {orderDetail.child_quantity}
              </Card.Text>
              <Card.Text>
                <strong>Số lượng trẻ nhỏ:</strong> {orderDetail.infant_quantity}
              </Card.Text>
              <Card.Text>
                <strong>Tổng giá:</strong>{" "}
                <span className="text-danger fw-bold">
                  {formatPrice(orderDetail.total_price)}
                </span>
              </Card.Text>
              <Card.Text>
                <strong>Trạng thái thanh toán:</strong>{" "}
                <span className="fw-bold text-primary">
                  {orderDetail.status_payment === "Unpaid"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </span>
              </Card.Text>
              <Card.Text>
                <strong>Ngày booking:</strong>{" "}
                <span className="text-primary fw-bold">
                  {format(
                    new Date(orderDetail.booking_date_time),
                    "yyyy-MM-dd HH:mm:ss"
                  )}
                </span>
              </Card.Text>
              <Card.Text>
                <strong>Ghi chú:</strong> {orderDetail.note}
              </Card.Text>
              <Card.Text className="text-danger">
                * Lưu ý đơn Booking sẽ tự động huỷ nếu không thanh toán trong 24
                giờ được tính từ thời gian ngày đặt tour !
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="col-12">
          <Card className="my-2">
            <Card.Header>Thông tin liên hệ</Card.Header>
            <Card.Body style={{ color: TEXT_MAIN_COLOR }}>
              <Card.Text>
                <strong>Tên khách hàng:</strong> {orderDetail.customer_name}
              </Card.Text>
              <Card.Text>
                <strong>Số điện thoại:</strong> {orderDetail.phone_number}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {orderDetail.email}
              </Card.Text>{" "}
              <Card.Text>
                <strong>Địa chỉ:</strong> {orderDetail.address}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {paymentDetail && (
        <Row className="justify-content-md-center">
          <Col className="col-12">
            <Card className="my-4">
              <Card.Header>Chi tiết Thanh toán</Card.Header>
              <Card.Body style={{ color: TEXT_MAIN_COLOR }}>
                <>
                  <Card.Text>
                    <strong>Mã booking:</strong>{" "}
                    <span className="fw-bold text-dark">
                      {paymentDetail.code_order}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>Khách hàng:</strong> {paymentDetail.customer_name}
                  </Card.Text>
                  <Card.Text>
                    <strong>
                      Thời gian thanh toán:{" "}
                      <span className="fw-bold text-primary">
                        {format(
                          new Date(paymentDetail.payment_date),
                          "yyyy-MM-dd HH:mm:ss"
                        )}
                      </span>
                    </strong>{" "}
                  </Card.Text>
                  <Card.Text>
                    <strong>Tổng giá:</strong>{" "}
                    <span className="text-danger fw-bold">
                      {formatPrice(paymentDetail.amount)}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>Hình thức thanh toán:</strong>{" "}
                    {paymentDetail.payment_method}
                  </Card.Text>
                  <Card.Text>
                    <strong>Trạng thái thanh toán:</strong>{" "}
                    {paymentDetail.payment_status == "Completed"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </Card.Text>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <h5 className="fw-bold ">DANH SÁCH HÀNH KHÁCH</h5>
      <PassengersList orderId={orderDetail.order_id} />
      {role == 3 ? (
        <>
          {orderDetail.status === "Cancel" ? (
            <></>
          ) : (
            <>
              {" "}
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      variant="fullWidth"
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Xác Nhận Booking" value="1" />
                      <Tab label="Ghép Tour Khác" value="2" />
                      <Tab label="Huỷ Hoàn Tiền" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ padding: "0px" }}>
                    <form>
                      <Form.Group className="my-3">
                        <Form.Label className="fw-bold">
                          {" "}
                          <RxUpdate className="fs-5" /> Trạng thái:
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Complete">Complete</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        onClick={handleUpdate}
                        disabled={loading}
                        style={{ background: RED1_COLOR, border: "0px" }}
                        className="mb-3 py-3 col-lg-3 col-12"
                      >
                        <FaSave /> Cập nhật
                      </Button>
                    </form>
                  </TabPanel>
                  <TabPanel value="2" sx={{ padding: "0px" }}>
                    {" "}
                    <ChangeOrderTour tourId={tourCode} order_id={order_id} />
                  </TabPanel>
                  <TabPanel value="3" sx={{ padding: "0px" }}>
                    {" "}
                    {orderDetail.status_request_cancel === "No" ? (
                      <>
                        <div style={{ display: "grid", placeItems: "end" }}>
                          <Button
                            style={{ background: RED1_COLOR, border: "0px" }}
                            className="mt-3 mb-5 py-3 col-lg-3 col-12"
                            onClick={handleOpenModal1}
                          >
                            <GiCancel className="fs-4" /> Yêu cầu huỷ
                          </Button>
                        </div>
                        <CancellationRequestModal
                          show={showModal1}
                          handleClose={handleCloseModal1}
                          orderId={orderDetail.order_id}
                          businessId={orderDetail.business_id}
                          customerId={orderDetail.customer_id}
                          status={"Cancel"}
                          start_date={orderDetail.start_date}
                          category={orderDetail.category_name}
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <div style={{ display: "grid", placeItems: "end" }}>
                          <Button
                            style={{ background: RED1_COLOR, border: "0px" }}
                            className="mt-3 mb-5 py-3col-12"
                          >
                            Đã có yêu cầu huỷ đơn booking!
                          </Button>
                        </div>
                      </>
                    )}
                  </TabPanel>
                </TabContext>
              </Box>
            </>
          )}
        </>
      ) : role == 1 ? (
        <>
          {orderDetail.status_payment === "Unpaid" &&
          (orderDetail.status === "Confirm" ||
            orderDetail.status === "Pending") ? (
            <>
              {" "}
              <div className="my-4">
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>
              <div
                style={{ display: "grid", placeItems: "end" }}
                className="my-4"
              >
                <Button
                  style={{ border: "0px", background: RED1_COLOR }}
                  onClick={handleBookTour}
                  disabled={loading2}
                  className="py-3 col-lg-3 col-12"
                >
                  {loading2 ? <>Loading...</> : <>Thanh toán</>}
                </Button>
              </div>
              <hr />
              <div
                style={{ display: "grid", placeItems: "end" }}
                className="my-4"
              >
                <Button
                  style={{ border: "0px", background: GREY_COLOR }}
                  onClick={handleCancel}
                  className="py-3 col-lg-3 col-12"
                >
                  HUỶ BOOKING
                </Button>
              </div>
            </>
          ) : orderDetail.status === "Complete" ? (
            <></>
          ) : orderDetail.status === "Cancel" ? (
            <></>
          ) : (
            <>
              {(orderDetail.status === "Confirm" &&
                orderDetail.status_request_cancel === "No") ||
              (orderDetail.status === "Pending" &&
                orderDetail.status_request_cancel === "No") ? (
                <>
                  {" "}
                  <div style={{ display: "grid", placeItems: "end" }}>
                    <Button
                      style={{ background: RED1_COLOR, border: "0px" }}
                      className="mt-3 mb-5 py-3 col-lg-3 col-12"
                      onClick={handleOpenModal}
                    >
                      <GiCancel className="fs-4" /> Yêu cầu huỷ
                    </Button>
                  </div>
                  <CancellationRequestModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    orderId={orderDetail.order_id}
                    businessId={orderDetail.business_id}
                    customerId={orderDetail.customer_id}
                    status={orderDetail.status}
                    start_date={orderDetail.start_date}
                    category={orderDetail.category_name}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <div style={{ display: "grid", placeItems: "end" }}>
                    <Button
                      style={{ background: RED1_COLOR, border: "0px" }}
                      className="mt-3 mb-5 py-3col-12"
                    >
                      Bạn đã gửi yêu cầu huỷ tour
                    </Button>
                  </div>
                </>
              )}{" "}
            </>
          )}
        </>
      ) : (
        <>
          {orderDetail.status === "Complete" ? (
            <></>
          ) : orderDetail.status === "Cancel" ? (
            <></>
          ) : orderDetail.status_payment === "Unpaid" ? (
            <>
              {" "}
              <div style={{ display: "grid", placeItems: "end" }}>
                <Button
                  onClick={handleUpdate}
                  disabled={loading2}
                  style={{ background: RED1_COLOR, border: "0px" }}
                  className="mb-3 py-3 col-lg-3 col-12"
                >
                  {loading2 ? <>Loading...</> : <>XÁC NHẬN ĐÃ THANH TOÁN</>}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button style={{ background: RED1_COLOR, border: "0px" }}>
                Khách hàng đã thanh toán !
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default OrderDetail;
