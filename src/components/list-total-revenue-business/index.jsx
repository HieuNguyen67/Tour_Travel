import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import axios from "axios";
import {
  format,
  startOfMonth,
  endOfMonth,
  getMonth,
  getYear,
  setMonth,
  setYear,
  subYears,
} from "date-fns";
import { BASE_URL_ADMIN, BLUE_COLOR, GREEN_COLOR } from "@/constants";
import LoadingBackdrop from "../backdrop";
import { useAuth } from "@/context";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DetailRevenueBusiness from "@/page/admin/detail-revenue-business";
import { formatInTimeZone } from "date-fns-tz";

const timeZone = "Asia/Ho_Chi_Minh";

const Revenue = () => {
  const [revenues, setRevenues] = useState([]);
  const [month, setMonthState] = useState(format(new Date(), "MM"));
  const [year, setYearState] = useState(format(new Date(), "yyyy"));
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
const [showModal, setShowModal] = useState(false);
const [selectedAccountId, setSelectedAccountId] = useState(null);
const [selectedBusinessId, setSelectedBusinessId] = useState(null);
const [selectedRevenue, setSelectedRevenue] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);


  const fetchRevenues = async () => {
    try {
            const currentDate = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");
      const selectedMonth = parseInt(month, 10) - 1;
      const selectedYear = parseInt(year, 10);

      const startDate = format(
        startOfMonth(
          setYear(setMonth(currentDate, selectedMonth), selectedYear)
        ),
        "yyyy-MM-dd"
      );
      const endDate = format(
        endOfMonth(setYear(setMonth(currentDate, selectedMonth), selectedYear)),
        "yyyy-MM-dd"
      );

      const response = await axios.get(
        `${BASE_URL_ADMIN}/list-total-revenue-business`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate,
            endDate,
          },
        }
      );

      setRevenues(response.data.total_revenue);

                 setLoading(false);

    } catch (error) {
      console.error("Error fetching revenues:", error);
                 setLoading(false);

    }
  };


  useEffect(() => {
    fetchRevenues();
  }, [month, year]);


  const handleMonthChange = (event) => {
    setMonthState(event.target.value);
  };

  const handleYearChange = (event) => {
    setYearState(event.target.value);
  };

   const formatPrice = (price) => {
     if (typeof price !== "number") {
       return price;
     }
     return new Intl.NumberFormat("vi-VN", {
       style: "currency",
       currency: "VND",
     }).format(price);
   };
     const navigate = useNavigate();

 const handleRowClick = (params) => {
   setSelectedAccountId(params.row.account_id);
   setSelectedBusinessId(params.row.business_id);
   setSelectedRevenue(params.row.net_revenue);
      setSelectedStatus(params.row.status_payment_business);

   setShowModal(true);
 };
  const columns = [
    {
      field: "business_name",
      headerName: "Doanh nghiệp",
      width: 250,
      renderCell: (params) => (
        <span className="fw-bold ">{params.value}</span>
      ),
    },
    {
      field: "total_revenue",
      headerName: "Tổng doanh thu",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "service_fee",
      headerName: "Phí dịch vụ (10%)",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "net_revenue",
      headerName: "Doanh thu thực nhận",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "status_payment_business",
      headerName: "Thanh toán",
      width: 200,
      renderCell: (params) => (
        <span>
          {params.value === "Unpaid" ? (
            <>
              <Button
                style={{ background: BLUE_COLOR, border: "0px" }}
                className="col-12 text-light"
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
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => <span>Xem chi tiết...</span>,
    },
  ];
   const Months = [
     "Tháng 1",
     "Tháng 2",
     "Tháng 3",
     "Tháng 4",
     "Tháng 5",
     "Tháng 6",
     "Tháng 7",
     "Tháng 8",
     "Tháng 9",
     "Tháng 10",
     "Tháng 11",
     "Tháng 12",
   ];

   if (loading)
     return (
       <div>
         <LoadingBackdrop open={loading} />
       </div>
     );


  return (
    <>
      <div className="mb-3">
        <Row>
          <Col className=" col-lg-10 col-6">
            <div style={{ display: "grid", placeItems: "end" }}>
              <TextField
                select
                label="Tháng"
                value={month}
                onChange={handleMonthChange}
                className="col-lg-2 col-12"
                style={{ background: "white" }}
              >
                {Months.map((m, index) => (
                  <MenuItem
                    key={index + 1}
                    value={String(index + 1).padStart(2, "0")}
                  >
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Col>
          <Col className=" col-lg-2 col-6">
            <TextField
              select
              label="Năm"
              value={year}
              onChange={handleYearChange}
              className="col-12"
              style={{ background: "white" }}
            >
              {[...Array(10).keys()].map((y) => (
                <MenuItem
                  key={y}
                  value={String(getYear(subYears(new Date(), y)))}
                >
                  {getYear(subYears(new Date(), y))}
                </MenuItem>
              ))}
            </TextField>
          </Col>
        </Row>
      </div>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={revenues}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.business_id}
          onRowClick={handleRowClick}
        />
      </Box>
      <DetailRevenueBusiness
        show={showModal}
        handleClose={() => setShowModal(false)}
        account_id={selectedAccountId}
        business_id={selectedBusinessId}
        month={month}
        year={year}
        revenue={selectedRevenue}
        statusPayment={selectedStatus}
      />
    </>
  );
};

export default Revenue;
