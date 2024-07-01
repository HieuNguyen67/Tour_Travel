import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { BASE_URL_BUSINESS } from "@/constants";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Alert } from "react-bootstrap";
import { red } from "@mui/material/colors";

const MonthlyRevenueChart = ({ businessId }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchMonthlyRevenue = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL_BUSINESS}/revenue-by-month/${businessId}/${year}`
      );
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
  console.log(monthlyRevenue);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  if(monthlyRevenue !== null){
 var labels = monthlyRevenue.map((item) => `Tháng ${item.month}`);
 var data = monthlyRevenue.map((item) =>
   parseFloat(item.total_revenue - (item.total_revenue * 10) / 100)
 );
  }
const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
 

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <>
      <h5 className="fw-bold mt-4">THỐNG KÊ DOANH THU TRONG NĂM</h5>
      <TextField
        label="Năm"
        type="number"
        value={year}
        onChange={handleYearChange}
        margin="normal"
      />
      {monthlyRevenue != null ? (
        <>
          <div style={{ display: "grid", placeItems: "center" }}>
            <BarChart
              xAxis={[{ scaleType: "band", data: labels }]}
              series={[{ data }]}
              height={500}
              style={{ width: "100%" }}
              margin={{ left: 140, right:140 }}
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
