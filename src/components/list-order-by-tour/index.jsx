import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {   Alert } from "@mui/material";
import LoadingBackdrop from "../backdrop";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED1_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@/constants";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
const ListOrdersByTour = ({tourId}) => {
  const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState(null);
  const [tour, setTour] = useState("");
      const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-orders-by-tour/${tourId}`
        );
        setOrders(response.data);
         setTour(response.data[0].tour_name);
         setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
           setMessages(error.response.data.message);
              setLoading(false);
      }
    };
    fetchOrders();
  }, [tourId]);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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
     width: 135,
     renderCell: (params) => {
       let buttonColor;
       let buttonColor1;
       let status_order;

       switch (params.value) {
         case "Pending":
           buttonColor = YELLOW_COLOR;
           buttonColor1 = "black";
status_order = "Chờ xác nhận";

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
   const navigate = useNavigate();

  const handleRowClick = (params) => {
    const data = { order_id: params.row.order_id };
    navigate(`/business/order-detail`, {state: data});
  };

   if (loading)
     return (
       <>
         <LoadingBackdrop open={loading} />
       </>
     );

  return (
    <>
      <h5 className="fw-bold my-3">{tour}</h5>
      {messages && (
        <>
          <Alert variant="filled" severity="error" className="my-2">
            {messages}
          </Alert>
        </>
      )}{" "}
      <LazyLoad>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.order_id}
            onRowClick={handleRowClick}
          />
        </div>
      </LazyLoad>
    </>
  );
};

export default ListOrdersByTour;
