import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context";
import { BASE_URL, BLUE_COLOR, RED1_COLOR, RED_COLOR, TEXT_MAIN_COLOR } from "@/constants";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import listorderimg from "@/assets/image/listorder.png";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { styled } from "@mui/system";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LoadingBackdrop from "@/components/backdrop";

const steps = [
  "Pending",
  "Confirm",
  "Complete",
  "Cancle",
];

const getStatusIndex = (status) => {
  switch (status) {
    case "Pending":
      return 0;
    case "Confirm":
      return 1;
    case "Complete":
      return 2;
    case "Cancle":
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
  const { order_id } = useParams();
  const {token}= useAuth();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order-detail/${order_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetail(response.data);
         setStatus(response.data.status);
      } catch (error) {
        setError("Failed to fetch order detail");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [order_id]);

  const navigate = useNavigate();

   const handleUpdate = async () => {
     try {
       await axios.put(
         `${BASE_URL}/update-status-orders/${order_id}`,
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
     } catch (error) {
       console.error("Failed to update orders status :", error);
       setError("Failed to update order status ");
     }
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

  if (loading) return <LoadingBackdrop open={loading} />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Link to="/business/order-tour">
        <IoArrowBackOutline className="fs-3" />
      </Link>
      <h3 className="fw-bold my-4">
        <img
          src={listorderimg}
          style={{
            width: "3rem",
            height: "3rem",
            objectFit: "cover",
          }}
        />{" "}
        CHI TIẾT ORDER
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
      <Row className="justify-content-md-center">
        <Col className="col-12">
          <Card className="my-4">
            <Card.Header>Chi tiết Order</Card.Header>
            <Card.Body style={{ color: TEXT_MAIN_COLOR }}>
              <Card.Text>
                <strong>Mã Order:</strong> {orderDetail.code_order}
              </Card.Text>
              <Card.Text>
                <strong>Tour:</strong>
                <span className="fw-bold text-dark"> {orderDetail.tour_name}</span>
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
                <strong>Ngày đặt:</strong>{" "}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="col-12">
          <Card className="my-2">
            <Card.Header>Thông tin khách hàng</Card.Header>
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
          className="mb-3 py-3 col-3"
        >
          <FaSave /> Cập nhật
        </Button>
      </form>
    </Container>
  );
};

export default OrderDetail;
