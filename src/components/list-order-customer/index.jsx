import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Alert, CircularProgress, Container } from "@mui/material";
import { BASE_URL, BLUE_COLOR, GREEN1_COLOR, GREEN_COLOR, RED1_COLOR, RED_COLOR, YELLOW_COLOR } from "@/constants";
import { Button } from "react-bootstrap";
import { useAuth } from "@/context";
import LoadingBackdrop from "../backdrop";
import { useNavigate } from "react-router-dom";

const OrdersList = ({ customerId, status }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const{token, role}= useAuth();
const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if(role==1){
          if (status) {
            var response = await axios.get(
              `${BASE_URL}/list-orders-customer/${customerId}/${status}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            var response = await axios.get(
              `${BASE_URL}/list-orders-customer/${customerId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        }else{
            if (status) {
              var response = await axios.get(
                `${BASE_URL}/list-orders-business/${customerId}/${status}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            } else {
              var response = await axios.get(
                `${BASE_URL}/list-orders-business/${customerId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
        }
        
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, status]);

  if (loading) return <LoadingBackdrop open={loading} />;
  if (error) return <Alert severity="error">Không tìm thấy giao dịch</Alert>;

const formatPrice = (price) => {
  if (typeof price !== "number") {
    return price;
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};


if(role==3){
    var handleRowClick = (params) => {
      navigate(`/business/order-detail/${params.row.order_id}`);
    };
}
  const columns = [
    { field: "code_order", headerName: "Mã đơn", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 135,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        switch (params.value) {
          case "Pending":
            buttonColor = YELLOW_COLOR;
            buttonColor1 = "black";

            break;
          case "Confirm":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";

            break;
          case "Complete":
            buttonColor = BLUE_COLOR;
            buttonColor1 = "white";

            break;
          case "Cancle":
            buttonColor = RED1_COLOR;
            buttonColor1 = "white";

            break;
          default:
            buttonColor = "gray";
        }
        return (
          <Button
            className="col-12 py-2"
            style={{
              background: buttonColor,
              border: "0px",
              color: buttonColor1,
            }}
          >
            {params.value}
          </Button>
        );
      },
    },
    { field: "tour_name", headerName: "Tour Name", width: 200 },
    { field: "adult_quantity", headerName: "Người lớn", width: 100 },
    { field: "child_quantity", headerName: "Trẻ em", width: 100 },
    { field: "infant_quantity", headerName: "Trẻ nhỏ", width: 100 },
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
        <Button style={{ background: GREEN1_COLOR, border: "0px" }}>
          {params.value === "Unpaid" ? "Chưa thanh toán" : "Đã thanh toán"}
        </Button>
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

    { field: "status_rating", headerName: "Đánh giá", width: 150 },
    { field: "note", headerName: "Ghi chú", width: 200 },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row.code_order}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

export default OrdersList;
