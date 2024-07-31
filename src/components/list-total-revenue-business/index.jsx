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
import { BLUE_COLOR, DARKBLUE, GREEN_COLOR, RED1_COLOR } from "@/constants";
import LoadingBackdrop from "../backdrop";
import { useAuth } from "@/context";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DetailRevenueBusiness from "@/page/admin/detail-revenue-business";
import { formatInTimeZone } from "date-fns-tz";
import LazyLoad from "react-lazyload";
import { BiMoneyWithdraw } from "react-icons/bi";
import payrevenue from "@/assets/image/payrevenue.png";

const timeZone = "Asia/Ho_Chi_Minh";

const Revenue = () => {
  const [revenues, setRevenues] = useState([]);
  const [month, setMonthState] = useState(format(new Date(), "MM"));
  const [year, setYearState] = useState(format(new Date(), "yyyy"));
  const [loading, setLoading] = useState(true);
  const { token, role , businessId} = useAuth();
const [showModal, setShowModal] = useState(false);
const [selectedAccountId, setSelectedAccountId] = useState(null);
const [selectedBusinessId, setSelectedBusinessId] = useState(null);
const [selectedRevenue, setSelectedRevenue] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);
  const [paidRevenue, setPaidRevenue] = useState([]);
  const [unPaidRevenue, setUnPaidRevenue] = useState([]);

const currentDate = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");
const selectedMonth = parseInt(month, 10) - 1;
const selectedYear = parseInt(year, 10);
const startDate = format(
  startOfMonth(setYear(setMonth(currentDate, selectedMonth), selectedYear)),
  "yyyy-MM-dd"
);
const endDate = format(
  endOfMonth(setYear(setMonth(currentDate, selectedMonth), selectedYear)),
  "yyyy-MM-dd"
);

  const fetchRevenues = async () => {
    try {
      
      if(role ==2 ){
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/list-total-revenue-business`,
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
      }else{
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/total-revenue-business/${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              startDate,
              endDate,
              status_payment_business : "Paid",
            },
          }
        );
        setPaidRevenue(response.data.total_revenue);
      } 
               setLoading(false);

    } catch (error) {
      console.error("Error fetching revenues:", error);
                 setLoading(false);

    }
  };
  useEffect(() => {
    fetchRevenues();
  }, [month, year]);

   const fetchRevenuesUnpaid = async () => {
     try {
      if(role ==3 ){
         const response = await axios.get(
           `${process.env.REACT_APP_BASE_URL_BUSINESS}/total-revenue-business/${businessId}`,
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
             params: {
               startDate,
               endDate,
               status_payment_business: "Unpaid",
             },
           }
         );
         setUnPaidRevenue(response.data.total_revenue);
       setLoading(false);
      }
     } catch (error) {
       console.error("Error fetching revenues:", error);
       setLoading(false);
     }
   };
   useEffect(() => {
     fetchRevenuesUnpaid();
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
          <Col className="col-lg-8 col-12">
            {" "}
            <h4 className="fw-bold mb-lg-0 mb-3">
              {" "}
              {role == 3 ? (
                <>
                  <img
                    src={payrevenue}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />{" "}
                  THANH TOÁN HÀNG THÁNG
                </>
              ) : (
                <></>
              )}
            </h4>
          </Col>
          <Col className="col-lg-4 col-12">
            <Row>
              <Col className=" ">
                <div style={{ display: "grid", placeItems: "end" }}>
                  <TextField
                    select
                    label="Tháng"
                    value={month}
                    onChange={handleMonthChange}
                    className=" col-12"
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
              <Col className="">
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
          </Col>
        </Row>
      </div>
      {role == 2 ? (
        <>
          {" "}
          <LazyLoad>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={revenues}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.business_id}
                onRowClick={handleRowClick}
              />
            </Box>
          </LazyLoad>
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
      ) : (
        <>
          <Row>
            <Col className="col-12 col-lg-6">
              {" "}
              <div
                style={{ background: RED1_COLOR, border: "0px" }}
                className="shadow-sm rounded-2 p-3 mt-3"
              >
                <span className="text-light fw-bold">
                  <BiMoneyWithdraw className="fs-4" /> CHƯA THANH TOÁN: <br />
                  {unPaidRevenue.map((item, index) => (
                    <>
                      {" "}
                      <span className="fs-2" key={index}>
                        {formatPrice(item.net_revenue)}
                      </span>
                    </>
                  ))}{" "}
                </span>
              </div>
            </Col>
            <Col className="col-12 col-lg-6">
              {" "}
              <div
                style={{ background: RED1_COLOR, border: "0px" }}
                className="shadow-sm rounded-2 p-3 mt-3"
              >
                <span className="text-light fw-bold">
                  <BiMoneyWithdraw className="fs-4" /> ĐÃ THANH TOÁN: <br />
                  {paidRevenue.map((item, index) => (
                    <>
                      {" "}
                      <span className="fs-2" key={index}>
                        {formatPrice(item.net_revenue)}
                      </span>
                    </>
                  ))}{" "}
                </span>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Revenue;
