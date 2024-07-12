import { Link, useLocation, useParams } from "react-router-dom";
import groupimg from "@/assets/image/group.png";
import { IoArrowBackOutline } from "react-icons/io5";
import React, { Suspense, lazy } from "react";
import { Col, Row } from "react-bootstrap";
const ExportPassengers = lazy(() => import("@/components/export-excel"));
const PassengersListTour = lazy(() => import("@/components/list-passenger-tour"));

const PassengersListByTour = ()=>{
    const location= useLocation();
    const {tour_id}= location.state || {};
    return (
      <>
        <Link to={`/business/list-orders-by-tour/${tour_id}`}>
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <Row>
          <Col className="col-lg-6 col-12">
            {" "}
            <h3 className=" fw-bold">
              <img
                src={groupimg}
                className=""
                style={{
                  width: "3rem",
                  height: "3rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />{" "}
              DANH SÁCH HÀNH KHÁCH ĐI TOUR
            </h3>
          </Col>
          <Col className="col-lg-6 col-12">
            {" "}
            <Suspense fallback={<div>Loading...</div>}>
              <ExportPassengers tourId={tour_id} />
            </Suspense>
          </Col>
        </Row>

        <Suspense fallback={<div>Loading...</div>}>
          <PassengersListTour tourId={tour_id} />
        </Suspense>
      </>
    );
}
export default PassengersListByTour;