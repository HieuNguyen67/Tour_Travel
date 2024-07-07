import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Alert } from "@mui/material";
import { BASE_URL_BUSINESS } from "@/constants";
import { useAuth } from "@/context";
import LoadingBackdrop from "../backdrop";
import { format } from "date-fns";

const PassengersListTour =({tourId})=> {
  const [passengers, setPassengers] = useState([]);
  const [tour, setTour] = useState("");
  const {token}= useAuth();
    const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);


  const fetchPassengersByTour = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_BUSINESS}/list-passengers-tour/${tourId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassengers(response.data);
      setTour(response.data[0].tour_name);
              setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hành khách:", error);
        setMessages(error.response.data.message);
              setLoading(false);
    }
  };

  useEffect(() => {
    if (tourId) {
      fetchPassengersByTour();
    }
  }, [tourId]);

  const columns = [
    { field: "name", headerName: "Họ và Tên", width: 150 },
    {
      field: "birthdate",
      headerName: "Ngày sinh",
      width: 150,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "passport_number", headerName: "Số CCCD/Passport", width: 180 },
    { field: "type", headerName: "Loại KH", width: 120 },
    {
      field: "code_order",
      headerName: "Mã Booking",
      width: 120,
      renderCell: (params) => (
        <span className="fw-bold">
          {params.value}
        </span>
      ),
    },
  ];
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
      )}
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={passengers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.passenger_id}
        />
      </div>
    </>
  );
}
export default PassengersListTour;