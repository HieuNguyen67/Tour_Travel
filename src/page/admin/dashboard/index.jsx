import dashboardimg from "@/assets/image/dashboard.png";
import { Col, Row } from "react-bootstrap";
import {
  BASE_URL_BUSINESS,
  BLUE_COLOR,
  BORDER,
  DARKBLUE,
  GREY_COLOR,
  PURPLE_COLOR,
  RED1_COLOR,
  RED_COLOR,
} from "@/constants";
import { MdTour } from "react-icons/md";
import { FaClipboardList, FaListAlt, FaStar } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import React, { Suspense, lazy } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import RevenueAll from "@/components/revenue-all";
import MonthlyRevenueChart from "@/components/monthly-revenue-chart";
import LazyLoad from "react-lazyload";

const CountTodo = lazy(() => import("@/components/count-todo"));

const TodoItem = ({ endpoint, label }) => (
  <Col className="border-end">
    <p className="text-center">
      <span className="fs-5 fw-bold text-primary">
        <Suspense fallback={<div>Loading...</div>}>
          <CountTodo endpoint={endpoint} />
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
              {" "}
              <Suspense fallback={<div>Loading...</div>}>
                <CountTodo endpoint={endpoint} business_id={businessId} />
              </Suspense>
            </>
          )}
        </span>
      </p>
    </div>
  </Col>
);

const DashboardAdmin = () => {
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
            endpoint={`/pending-count-status-refunds`}
            label="Hoàn tiền"
          />
          <TodoItem
            endpoint={`/pending-count-status-news`}
            label="Duyệt tin tức"
          />
          <TodoItem
            endpoint={`/pending-count-status-report`}
            label="Xử lý tố cáo"
          />
          <TodoItem
            endpoint={`/pending-count-status-contact`}
            label="Liên hệ tư vấn"
          />
        </Row>
      </div>
      <Row className="row-cols-lg-4 row-cols-2 mt-4">
        {[
          {
            backgroundColor: DARKBLUE,
            endpoint: "/count-customers",
            label: "SỐ LƯỢNG KHÁCH HÀNG",
            icon: <FaUserGroup className="fs-4" />,
          },
          {
            backgroundColor: GREY_COLOR,
            endpoint: "/count-business",
            label: "SỐ LƯỢNG DOANH NGHIỆP",
            icon: <MdBusinessCenter className="fs-4" />,
          },
          {
            backgroundColor: PURPLE_COLOR,
            endpoint: "/count-admin",
            label: "SỐ LƯỢNG ADMIN",
            icon: <FaUserGroup className="fs-4" />,
          },
          {
            backgroundColor: RED1_COLOR,
            endpoint: "/count-tours-active",
            label: "TOUR ĐANG HOẠT ĐỘNG",
            icon: <MdTour className="fs-4" />,
          },
        ].map(({ backgroundColor, endpoint, label, icon }) => (
          <LazyLoad>
            <SummaryBox
              key={endpoint}
              backgroundColor={backgroundColor}
              endpoint={endpoint}
              label={label}
              icon={icon}
            />
          </LazyLoad>
        ))}
      </Row>
      <RevenueAll />
      <div className="rounded-3 " style={{ background: "white" }}>
        <MonthlyRevenueChart />
      </div>
    </>
  );
};
export default DashboardAdmin;
