import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Alert,  } from "@mui/material";
import {
  BLUE_COLOR,
  GREEN1_COLOR,
  GREEN_COLOR,
  RED1_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@/constants";
import { Button } from "react-bootstrap";
import { useAuth } from "@/context";
import LoadingBackdrop from "../backdrop";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

const OrdersList = ({ customerId, status }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (role == 1) {
          if (status) {
            var response = await axios.get(
              `${process.env.REACT_APP_BASE_URL_CUSTOMER}/list-orders-customer/${customerId}/${status}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            var response = await axios.get(
              `${process.env.REACT_APP_BASE_URL_CUSTOMER}/list-orders-customer/${customerId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        } else {
          if (status) {
            var response = await axios.get(
              `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-orders-business/${customerId}/${status}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            var response = await axios.get(
              `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-orders-business/${customerId}`,
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

  if (role == 3) {
    var handleRowClick = (params) => {
      const data = { order_id: params.row.order_id };
      navigate(`/business/order-detail`, {state: data});
    };
  } else {
    var handleRowClick = (params) => {
       const data = { order_id: params.row.order_id };
      navigate(`/information/order-detail`, { state: data });
    };
  }
  const columns = [
    {
      field: "code_order",
      headerName: "Mã Booking",
      width: 120,
      renderCell: (params) => (
        <span className="fw-bold">{params.value}</span>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 160,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        let status_order;
        switch (params.value) {
          case "Pending":
            buttonColor = YELLOW_COLOR;
            buttonColor1 = "black";
status_order= "Chờ xác nhận";
            break;
          case "Confirm":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";
status_order = "Đã xác nhận";

            break;
          case "Complete":
            buttonColor = RED_COLOR;
            buttonColor1 = "white";
status_order = "Đã hoàn thành";

            break;
          case "Cancel":
            buttonColor = RED1_COLOR;
            buttonColor1 = "white";
status_order = "Đã huỷ";

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
            {status_order}
          </Button>
        );
      },
    },
    { field: "tour_name", headerName: "Tour", width: 200 },
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
      width: 160,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy HH:mm:ss")}
        </span>
      ),
    },

  ];

  return (
    <>
      {" "}
      <LazyLoad>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row.code_order}
            onRowClick={handleRowClick}
            getRowHeight={(params) => 80}
          />
        </div>
      </LazyLoad>
    </>
  );
};

export default OrdersList;
