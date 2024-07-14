import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import { BASE_URL_CUSTOMER } from "@/constants";
import { useAuth } from "@/context";
import { format } from "date-fns";
import LazyLoad from "react-lazyload";

const PassengersList = ({ orderId }) => {
  const [passengers, setPassengers] = useState([]);
    const {token}= useAuth();
  const fetchPassengers = async () => {
    try {
      const response = await axios.get(`${BASE_URL_CUSTOMER}/list-passengers/${orderId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      setPassengers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hành khách:", error);
    }
  };

  

  useEffect(() => {
    if (orderId) {
      fetchPassengers();
    }
  }, [orderId]);

  const columns = [
    {
      field: "name",
      headerName: "Họ tên",
      width: 200,
      renderCell: (params) => <span className="fw-bold">{params.value}</span>,
    },
    {
      field: "birthdate",
      headerName: "Ngày sinh",
      width: 200,
      renderCell: (params) => (
        <span
          className="fw-bold text-primary"
          style={{ cursor: "pointer" }}
        >
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "passport_number", headerName: "Số CCCD/Passport", width: 200 },
    { field: "type", headerName: "Loại khách hàng", width: 200 },
  ];

  return (
    <div>
      <LazyLoad>
        <div style={{ height: 300, width: "100%" }} className="my-3">
          <DataGrid
            rows={passengers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.passenger_id}
            style={{ background: "white" }}
          />
        </div>{" "}
      </LazyLoad>
    </div>
  );
};
export default PassengersList;