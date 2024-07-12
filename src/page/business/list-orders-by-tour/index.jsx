import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import listimg from "@/assets/image/list.png";
import React, { Suspense, lazy } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BLUE_COLOR, DARKBLUE, RED1_COLOR } from "@/constants";
import groupimg from "@/assets/image/group.png";
import excelimg from "@/assets/image/excel.png";
import { IoMdDownload } from "react-icons/io";
import ExportOrdersTour from "@/components/export-orders-tour";


const ListOrdersByTour = lazy(() =>
  import("@/components/list-order-by-tour")
);

const ListOrderTour = ()=>{
  const location= useLocation();
  const {tour_id}= location.state ||{};
  const navigate= useNavigate();
  const handleClick=()=>{
    const data= {tour_id: tour_id};
    navigate(`/business/list-passenger-tour`, { state: data });
  }
    return (
      <>
        <Link to="/business/list-tour">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <Row>
          <Col className="col-lg-6 col-12">
            <h3 className=" fw-bold">
              <img
                src={listimg}
                className=""
                style={{
                  width: "3rem",
                  height: "3rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />{" "}
              DANH SÁCH ĐƠN BOOKING{" "}
            </h3>
          </Col>
          <Col className="col-lg-6 col-12">
            {" "}
            <div style={{ display: "grid", placeItems: "end" }}>
              <Row>
                <Col>
                  <img
                    src={groupimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                    <Button onClick={handleClick} style={{ background: DARKBLUE, border: "0px" }}>
                      Xem DS Hành Khách
                    </Button>
                  <ExportOrdersTour tourId={tour_id} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Suspense fallback={<div>Loading...</div>}>
          <ListOrdersByTour tourId={tour_id} />
        </Suspense>
      </>
    );
}
export default ListOrderTour;