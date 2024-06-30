import CountTodo from "@/components/count-todo";
import { useAuth } from "@/context";
import { Col, Row } from "react-bootstrap";
import dashboardimg from "@/assets/image/dashboard.png";
import { BLUE_COLOR, BORDER, GREY_COLOR, PURPLE_COLOR, RED1_COLOR, RED_COLOR } from "@/constants";

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

const SummaryBox = ({ backgroundColor, endpoint, businessId, label }) => (
  <Col>
    <div
      style={{ background: backgroundColor, border: "0px" }}
      className="shadow-sm rounded-2 px-3 pt-3"
    >
      <p className="text-light">
        {label}
        <br />
        <span className="fs-1 fw-bold">
          <CountTodo endpoint={endpoint} business_id={businessId} />
        </span>
      </p>
    </div>
  </Col>
);

const DashboardBusiness = ()=>{
    const {businessId}= useAuth();
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
          <h5 className="fw-bold">Danh sách cần làm</h5>
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
            },
            {
              backgroundColor: GREY_COLOR,
              endpoint: "/count-booking-business",
              label: "TỔNG SỐ BOOKING",
            },
            {
              backgroundColor: PURPLE_COLOR,
              endpoint: "/count-news-business",
              label: "TỔNG SỐ BÀI VIẾT",
            },
            {
              backgroundColor: RED1_COLOR,
              endpoint: "/average-rating",
              label: "ĐIỂM RATING TRUNG BÌNH",
            },
          ].map(({ backgroundColor, endpoint, label }) => (
            <SummaryBox
              key={endpoint}
              backgroundColor={backgroundColor}
              endpoint={endpoint}
              businessId={businessId}
              label={label}
            />
          ))}
        </Row>
      </>
    );
}
export default DashboardBusiness;