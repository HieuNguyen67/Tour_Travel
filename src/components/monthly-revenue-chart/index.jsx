import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,

} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Alert } from "react-bootstrap";
import { useAuth } from "@/context";
import chartbarimg from "@/assets/image/chartbar.png";


const MonthlyRevenueChart = ({ businessId }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const {token, role}= useAuth();
  
  const fetchMonthlyRevenue = async () => {
    setLoading(true);
    setError(null);

    try {
      if (businessId) {
        var response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/revenue-by-month/${year}/${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        var response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/revenue-by-month/${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setMonthlyRevenue(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyRevenue();
  }, [businessId, year]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  if(monthlyRevenue !== null){
 var labels = monthlyRevenue.map((item) => `Tháng ${item.month}`);
 if (businessId) {
   var data = monthlyRevenue.map((item) =>
     parseFloat(item.total_revenue - (item.total_revenue * 10) / 100)
   );
 } else {
   var data = monthlyRevenue.map((item) =>
     parseFloat((item.total_revenue * 10) / 100)
   );
 }

  }

 

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <>
      {" "}
      <h5 className="fw-bold mt-4">
        <img
          src={chartbarimg}
          style={{
            width: "4rem",
            height: "4rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        {businessId ? (
          <> DOANH THU THỰC NHẬN TRONG NĂM</>
        ) : (
          <> THỐNG KÊ LỢI NHUẬN TRONG NĂM</>
        )}
      </h5>
      <TextField
        label="Năm"
        type="number"
        value={year}
        onChange={handleYearChange}
        margin="normal"
      />
      {monthlyRevenue != null ? (
        <>
          <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
            {" "}
            <BarChart
              xAxis={[{ scaleType: "band", data: labels }]}
              series={[{ data, color: ["rgb(46, 150, 255)"] }]}
              height={500}
              style={{ width: "100%" }}
              margin={{ left: 100 }}
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <Alert className="mt-3" variant="danger">
            Chưa có dữ liệu!
          </Alert>
        </>
      )}
    </>
  );
};

export default MonthlyRevenueChart;
