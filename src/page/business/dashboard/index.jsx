import { useAuth } from "@/context";
import { Col, Form, Row } from "react-bootstrap";
import dashboardimg from "@/assets/image/dashboard.png";
import { BASE_URL_BUSINESS, BLUE_COLOR, BORDER, DARKBLUE, GREY_COLOR, PURPLE_COLOR, RED1_COLOR, RED_COLOR } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaListAlt, FaStar } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import { subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';
import { formatInTimeZone } from "date-fns-tz";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Suspense, lazy } from "react";
const OrderStatusRatio = lazy(() => import("@/components/chart-ratio-orders"));
const MonthlyRevenueChart = lazy(() => import("@/components/monthly-revenue-chart"));
const CountTodo = lazy(() => import("@/components/count-todo"));

const timeZone = 'Asia/Ho_Chi_Minh';

const TodoItem = ({ endpoint, businessId, label }) => (
  <Col className="border-end">
    <p className="text-center">
      <span className="fs-5 fw-bold text-primary">
        <Suspense fallback={<div>Loading...</div>}>
          <CountTodo endpoint={endpoint} business_id={businessId} />
        </Suspense>
      </span>
      <br />
      {label}
    </p>
  </Col>
);

const SummaryBox = ({ backgroundColor, endpoint, businessId, label, icon }) => (
  <Col>
    <div
      style={{ background: backgroundColor, border: "0px" }}
      className="shadow-sm rounded-2 px-3 pt-3"
    >
      <p className="text-light">
        {icon} {label}
        <br />
        <span className="fs-1 fw-bold">
          {label === "ĐIỂM RATING TRUNG BÌNH" ? (
            <>
              {" "}
              <Suspense fallback={<div>Loading...</div>}>
                <CountTodo endpoint={endpoint} business_id={businessId} />
              </Suspense>
            </>
          ) : (
            <>
              {" "} <Suspense fallback={<div>Loading...</div>}>
                <CountTodo endpoint={endpoint} business_id={businessId} />
              </Suspense>
            </>
          )}
        </span>
      </p>
    </div>
  </Col>
);

const DashboardBusiness = ()=>{
    const {businessId}= useAuth();
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState("thisWeek");
      const today = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");

    const [startDate, setStartDate] = useState(
      format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd")
    );
    const [endDate, setEndDate] = useState(
      format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd")
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
       const fetchTotalRevenue = async () => {
         if (businessId && startDate && endDate) {
           setError(null);
           setTotalRevenue(null);

           try {
             const response = await axios.get(
               `${BASE_URL_BUSINESS}/total-revenue/${businessId}?startDate=${startDate}&endDate=${endDate}`
             );
                      setTotalRevenue(response.data.total_revenue);
                      console.log(response.data.total_revenue);                      

           } catch (error) {
             setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
           }
         }
       };

       fetchTotalRevenue();
     }, [businessId, startDate, endDate]);

        const totalPriceInt = parseInt(totalRevenue, 10);
        const price = totalPriceInt - (totalPriceInt * 10) / 100;
        const priceservice =(totalPriceInt * 10) / 100; 

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
        <h3 className="fw-bold">
          {" "}
          <img
            src={dashboardimg}
            style={{
              width: "4rem",
              height: "4rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />{" "}
          TỔNG QUAN
        </h3>
        <div
          style={{ background: "white", border: BORDER }}
          className="rounded-2 shadow-sm p-3"
        >
          <h5 className="fw-bold">
            <FaClipboardList className="fs-4" /> Danh sách cần làm
          </h5>
          <p style={{ fontSize: "0.8rem", color: " #999" }}>
            Những việc bạn sẽ phải làm
          </p>
          <Row className="row-cols-lg-4 row-cols-2 mt-4">
            <TodoItem
              endpoint={`/pending-count-status-orders`}
              businessId={businessId}
              label="Chờ xác nhận"
            />
            <TodoItem
              endpoint={`/pending-count-status-request-cancel`}
              businessId={businessId}
              label="Yêu cầu huỷ"
            />
            <TodoItem
              endpoint={`/pending-count-status-tour`}
              businessId={businessId}
              label="Tour đã diễn ra"
            />
            <TodoItem
              endpoint={`/pending-count-status-contact-business`}
              businessId={businessId}
              label="Liên hệ tư vấn"
            />
          </Row>
        </div>
        <Row className="row-cols-lg-4 row-cols-2 mt-4">
          {[
            {
              backgroundColor: BLUE_COLOR,
              endpoint: "/count-tour-business",
              label: "TỔNG SỐ LƯỢNG TOUR",
              icon: <MdTour className="fs-4" />,
            },
            {
              backgroundColor: GREY_COLOR,
              endpoint: "/count-booking-business",
              label: "TỔNG SỐ BOOKING",
              icon: <FaListAlt className="fs-4" />,
            },
            {
              backgroundColor: PURPLE_COLOR,
              endpoint: "/count-news-business",
              label: "TỔNG SỐ BÀI VIẾT",
              icon: <ImNewspaper className="fs-4" />,
            },
            {
              backgroundColor: RED1_COLOR,
              endpoint: "/average-rating",
              label: "ĐIỂM RATING TRUNG BÌNH",
              icon: <FaStar className="fs-4" />,
            },
          ].map(({ backgroundColor, endpoint, label, icon }) => (
            <SummaryBox
              key={endpoint}
              backgroundColor={backgroundColor}
              endpoint={endpoint}
              businessId={businessId}
              label={label}
              icon={icon}
            />
          ))}
        </Row>
        <div style={{ display: "grid", placeItems: "end" }} className="mt-3">
          <div className="col-lg-2">
            <FormControl fullWidth>
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
        </div>
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
          <Col className="col-12 col-lg-4">
            {" "}
            <div
              style={{ background: DARKBLUE, border: "0px" }}
              className="shadow-sm rounded-2 p-3 mt-4"
            >
              <span className=" text-light fw-bold">
                <BiMoneyWithdraw className="fs-4" /> TỔNG DOANH THU: <br />
                {totalRevenue === "NaN" ? (
                  <>
                    {" "}
                    <span className="fs-2">0 VNĐ</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span className="fs-2">{formatPrice(totalPriceInt)}</span>
                  </>
                )}
              </span>
            </div>
          </Col>
          <Col className="col-12 col-lg-4">
            {" "}
            <div
              style={{ background: DARKBLUE, border: "0px" }}
              className="shadow-sm rounded-2 p-3 mt-4"
            >
              <span className=" text-light fw-bold">
                <BiMoneyWithdraw className="fs-4" /> PHÍ DỊCH VỤ (10%): <br />
                {totalRevenue === "NaN" ? (
                  <>
                    {" "}
                    <span className="fs-2">0 VNĐ</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span className="fs-2">{formatPrice(priceservice)}</span>
                  </>
                )}
              </span>
            </div>
          </Col>
          <Col className="col-12 col-lg-4">
            {" "}
            <div
              style={{ background: DARKBLUE, border: "0px" }}
              className="shadow-sm rounded-2 p-3 mt-4"
            >
              <span className="text-light fw-bold">
                <BiMoneyWithdraw className="fs-4" /> DOANH THU THỰC NHẬN: <br />
                {totalRevenue === "NaN" ? (
                  <>
                    {" "}
                    <span className="fs-2">0 VNĐ</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span className="fs-2">{formatPrice(price)}</span>
                  </>
                )}
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-lg-6 col-12">
            <div
              style={{ background: "white", border: BORDER }}
              className="rounded-2 shadow-sm p-3"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <MonthlyRevenueChart businessId={businessId} />
              </Suspense>
            </div>
          </Col>
          <Col className="col-lg-6 col-12">
            <div
              style={{ background: "white", border: BORDER }}
              className="rounded-2 shadow-sm p-3"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <OrderStatusRatio businessId={businessId} />{" "}
              </Suspense>
            </div>
          </Col>
        </Row>
      </>
    );
}
export default DashboardBusiness;