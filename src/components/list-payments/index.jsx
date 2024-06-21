import paymentimg from "@/assets/image/payment.png";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Container, CircularProgress, Alert } from "@mui/material";
import { BASE_URL, BLUE_COLOR, GREEN_COLOR } from "@/constants";
import { Button } from "react-bootstrap";
import LoadingBackdrop from "@/components/backdrop";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

const PaymentsList = ({status}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/list-orders/${status}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  var handleRowClick = (params) => {
    navigate(`/admin/order-detail/${params.row.order_id}`);
  };

  const columns = [
    {
      field: "code_order",
      headerName: "Mã Booking",
      width: 150,
      renderCell: (params) => <span className="fw-bold ">{params.value}</span>,
    },
    { field: "customer_name", headerName: "Khách hàng", width: 170 },
    { field: "tour_name", headerName: "Tour Name", width: 400 },
    {
      field: "total_price",
      headerName: "Tổng giá",
      width: 120,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "status_payment",
      headerName: "Thanh toán",
      width: 170,
      renderCell: (params) => (
        <span>
          {params.value === "Unpaid" ? (
            <>
              <Button
                style={{ background: BLUE_COLOR, border: "0px" }}
                className="col-12"
              >
                Chưa thanh toán
              </Button>
            </>
          ) : (
            <Button
              style={{ background: GREEN_COLOR, border: "0px" }}
              className="col-12 text-dark"
            >
              Đã thanh toán
            </Button>
          )}
        </span>
      ),
    },
    {
      field: "booking_date_time",
      headerName: "Ngày đặt",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy HH:mm:ss")}
        </span>
      ),
    },
  ];

  if (loading) {
    return <LoadingBackdrop open={loading} />;
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Chưa có giao dịch !</Alert>
      </Container>
    );
  }
  return (
    <>
    
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.order_id}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};
export default PaymentsList;
