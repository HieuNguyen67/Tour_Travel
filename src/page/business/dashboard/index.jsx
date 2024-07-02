import CountTodo from "@/components/count-todo";
import { useAuth } from "@/context";
import { Col, Row } from "react-bootstrap";
import dashboardimg from "@/assets/image/dashboard.png";
import { BASE_URL_BUSINESS, BLUE_COLOR, BORDER, DARKBLUE, GREY_COLOR, PURPLE_COLOR, RED1_COLOR, RED_COLOR } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import MonthlyRevenueChart from "@/components/monthly-revenue-chart";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaListAlt, FaStar } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import OrderStatusRatio from "@/components/chart-ratio-orders";

const TodoItem = ({ endpoint, businessId, label }) => (
  <Col className="border-end">
    <p className="text-center">
      <span className="fs-5 fw-bold text-primary">
        <CountTodo endpoint={endpoint} business_id={businessId} />
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
              <CountTodo endpoint={endpoint} business_id={businessId} />
            </>
          ) : (
            <>
              {" "}
              <CountTodo endpoint={endpoint} business_id={businessId} />
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

    useEffect(() => {
      const fetchTotalRevenue = async () => {
        try {
          const response = await axios.get(`${BASE_URL_BUSINESS}/total-revenue/${businessId}`);
          setTotalRevenue(response.data.total_revenue);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTotalRevenue();
    }, [businessId]);
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
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
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
              label="Tour đang diễn ra"
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
                  <>0</>
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
                  <>0</>
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
                  <>0</>
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
              <MonthlyRevenueChart businessId={businessId} />
            </div>
          </Col>
          <Col className="col-lg-6 col-12">
            <div
              style={{ background: "white", border: BORDER }}
              className="rounded-2 shadow-sm p-3"
            >
              <OrderStatusRatio businessId={businessId} />
            </div>
          </Col>
        </Row>
      </>
    );
}
export default DashboardBusiness;