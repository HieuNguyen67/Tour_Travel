import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED1_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@/constants";
import { useAuth } from "@/context";
import LazyLoad from "react-lazyload";
import { TbCoinFilled } from "react-icons/tb";
import LoadingBackdrop from "../backdrop";
import { useNavigate } from "react-router-dom";

const ListRateTour = ({ statusRating }) => {
  const [orders, setOrders] = useState([]);
  const { customerId } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/list-rate-tour/${customerId}`,
        {
          params: { statusRating },
        }
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId && statusRating) {
      fetchOrders();
    }
  }, [customerId, statusRating]);

  const navigate= useNavigate();

   const handleRowClick = (params) => {
     const data = { order_id: params.row.order_id };
    navigate(`/information/order-detail`, { state: data });
   };

  const columns = [
    {
      field: "code_order",
      headerName: "Mã Booking",
      width: 120,
      renderCell: (params) => <span className="fw-bold">{params.value}</span>,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 170,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        let status_order;
        switch (params.value) {
          case "Complete":
            buttonColor = RED_COLOR;
            buttonColor1 = "white";
            status_order = "Đã hoàn thành";
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
    { field: "name", headerName: "Tour", width: 500 },
    {
      field: "status_rating",
      headerName: "Đánh giá",
      width: 170,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        let status_order;
        switch (params.value) {
          case "Not Rated":
            buttonColor = YELLOW_COLOR;
            buttonColor1 = "black";
            status_order = "Chưa đánh giá";
            break;
          case "Rated":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";
            status_order = "Đã đánh giá";
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
    {
      headerName: "Thưởng",
      width: 210,
      renderCell: (params) => (
        <span className="fw-bold">
          {" "}
          <Button
            className="col-12 py-2"
            style={{
              background: BLUE_COLOR,
              border: "0px",
              color: "white",
            }}
          >
            Đánh giá &nbsp;
            <TbCoinFilled className="fs-4" /> &nbsp;+ 4000 Xu
          </Button>
        </span>
      ),
    },
  ];
  if (loading) return <LoadingBackdrop open={loading} />;

  return (
    <>
      {" "}
      <LazyLoad>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.order_id}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            getRowHeight={(params) => 80}
            onRowClick={handleRowClick}
          />
        </Box>{" "}
      </LazyLoad>
    </>
  );
};

export default ListRateTour;
