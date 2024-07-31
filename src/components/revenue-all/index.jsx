import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "@/context";
import {
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {  DARKBLUE } from "@/constants";
import { Col, Form, Row } from "react-bootstrap";
import { BiMoneyWithdraw } from "react-icons/bi";
import revenueimg from "@/assets/image/revenue.png";

const timeZone = "Asia/Ho_Chi_Minh";

const RevenueAll = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState("thisMonth");
  const today = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");
  const { token } = useAuth();
  const [startDate, setStartDate] = useState(
    format(startOfMonth(today), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(
    format(endOfMonth(today), "yyyy-MM-dd")
  );

  const handleDateRangeChange = (event) => {
    const value = event.target.value;
    setDateRange(value);

    if (value === "thisWeek") {
      setStartDate(
        format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd")
      );
      setEndDate(format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"));
    } else if (value === "thisMonth") {
      setStartDate(format(startOfMonth(today), "yyyy-MM-dd"));
      setEndDate(format(endOfMonth(today), "yyyy-MM-dd"));
    } else if (value === "last3Months") {
      setStartDate(format(startOfMonth(subMonths(today, 3)), "yyyy-MM-dd"));
      setEndDate(format(endOfMonth(today), "yyyy-MM-dd"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  };
  useEffect(() => {
    const fetchRevenue = async () => {
      if (startDate && endDate) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}/revenue-all`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: { startDate, endDate },
            }
          );
          setTotalRevenue(response.data.totalRevenue);
        } catch (error) {
          console.error("Error fetching revenue:", error);
          setTotalRevenue(null);
        }
      }
    };
    fetchRevenue();
  }, [startDate, endDate]);

  const totalPriceInt = parseInt(totalRevenue, 10);
  const price = totalPriceInt - (totalPriceInt * 10) / 100;
  const priceservice = (totalPriceInt * 10) / 100;

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <Row className="mt-3">
        <Col className="col-lg-8 col-12">
          <h4 className="fw-bold ">
            <img
              src={revenueimg}
              style={{
                width: "4rem",
                height: "4rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />{" "}
            TỔNG DOANH THU
          </h4>
        </Col>
        <Col className="col-lg-4 col-12">
          <div style={{ display: "grid", placeItems: "end" }}>
            <FormControl fullWidth sx={{ background: "white" }}>
              <InputLabel id="demo-simple-select-label">Thời gian</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Thời gian"
                value={dateRange}
                onChange={handleDateRangeChange}
              >
                <MenuItem value="thisWeek">Trong Tuần Này</MenuItem>
                <MenuItem value="thisMonth">Trong Tháng Này</MenuItem>
                <MenuItem value="last3Months">
                  Trong Vòng 3 Tháng Trước
                </MenuItem>
                <MenuItem value="custom">Chọn Theo Ngày</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Col>
      </Row>

      {dateRange === "custom" && (
        <>
          <Row className="mt-3">
            <p className="fw-bold">Chọn ngày bắt đầu - kết thúc: </p>
            <Col>
              <div>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </Col>
            <Col className="col-lg-1 col-12 text-center"> - </Col>
            <Col>
              {" "}
              <div>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col className="col-12 col-lg-6">
          {" "}
          <div
            style={{ background: DARKBLUE, border: "0px" }}
            className="shadow-sm rounded-2 p-3 mt-4"
          >
            <span className=" text-light fw-bold">
              <BiMoneyWithdraw className="fs-4" /> TỔNG DOANH THU: <br />{" "}
              <span className="fs-2">{formatPrice(totalPriceInt)}</span>
            </span>
          </div>
        </Col>
        <Col className="col-12 col-lg-6">
          {" "}
          <div
            style={{ background: DARKBLUE, border: "0px" }}
            className="shadow-sm rounded-2 p-3 mt-4"
          >
            <span className=" text-light fw-bold">
              <BiMoneyWithdraw className="fs-4" /> LỢI NHUẬN: <br />
              <span className="fs-2">{formatPrice(priceservice)}</span>
            </span>
          </div>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default RevenueAll;
