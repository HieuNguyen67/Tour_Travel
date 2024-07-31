import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { useAuth } from "@/context";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Pagination from "@mui/lab/Pagination";
import coin from "@/assets/image/coin.png";
import coin1 from "@/assets/image/coin1.png";
import { TbCoinFilled } from "react-icons/tb";
import { format } from "date-fns";
import LoadingBackdrop from "../backdrop";

interface Coupon {
  coupon_id: number;
  customer_id: number;
  points: number;
  description: string;
  created_at: string;
  expires_at: string;
  is_used: string;
}

interface CouponResponse {
  coupons: Coupon[];
  totalUsedPoints: number;
}

const CouponsList: React.FC = () => {
  const { customerId } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [totalUsedPoints, setTotalUsedPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const couponsPerPage = 5;

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get<CouponResponse>(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/coupons/${customerId}`
        );
        setCoupons(response.data.coupons);
        setTotalUsedPoints(response.data.totalUsedPoints);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [customerId]);

  if (loading) {
    return <LoadingBackdrop open={loading} />;
  }

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

  return (
    <>
      <Row>
        <Col className="col-lg-1 col-md-2 col-4">
          <img
            src={coin1}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </Col>
        <Col>
          <p className="">
            <span className="fs-5 fw-bold text-warning">
              {totalUsedPoints} Xu đang có
            </span>
            <br />
            <span
              onClick={handleOpen}
              className="text-secondary"
              style={{ cursor: "pointer" }}
            >
              Xem lịch sử nhận xu {">"}
            </span>
          </p>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <TbCoinFilled className="fs-1 text-warning" />
        </Modal.Header>
        <Modal.Body>
          {currentCoupons.map((item) => (
            <div key={item.coupon_id}>
              <Row>
                <Col className="col-lg-2">
                  <img
                    src={coin}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </Col>
                <Col className="col-lg-8 col-12">
                  <p className="mt-lg-0 mt-2">
                    <span className="fs-5 fw-bold">
                      Nhận xu từ {item.description}
                    </span>
                    <br />
                    <span
                      style={{ fontSize: "0.9rem" }}
                      className="text-secondary"
                    >
                      Hạn sử dụng:&nbsp;
                      {format(new Date(item.created_at), "dd/MM/yyyy")} -{" "}
                      {format(new Date(item.expires_at), "dd/MM/yyyy")}
                    </span>
                    <br />
                    <span>
                      {item.is_used == "Unused" ? "Chưa dùng" : "Đã dùng"}
                    </span>
                  </p>
                </Col>
                <Col>
                  <p className="fs-4 text-warning mt-lg-4">+ {item.points}</p>
                </Col>
              </Row>
              <hr />
            </div>
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(coupons.length / couponsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CouponsList;
