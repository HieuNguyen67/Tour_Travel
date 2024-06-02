import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { useAuth } from "@/context";
import { BASE_URL } from "@/constants";
import { Col, Row } from "react-bootstrap";
import coin from "@/assets/image/coin.png";
import LoadingBackdrop from "../backdrop";

interface Coupon {
  coupon_id: number;
  customer_id: number;
  points: number;
  description: string;
  created_at: string;
  expires_at: string;
  is_used: boolean;
}

interface CouponResponse {
  coupons: Coupon[];
  totalUsedPoints: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const CouponsList: React.FC= () => {
    const{customerId}=useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [totalUsedPoints, settotalUsedPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get<CouponResponse>(
          `${BASE_URL}/coupons/${customerId}`
        );
        setCoupons(response.data.coupons);
        settotalUsedPoints(response.data.totalUsedPoints);
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

  return (
    <>
      <Row>
        <Col className="col-lg-1 col-4">
          <img
            src={coin}
            style={{
              width: "7rem",
              height: "7rem",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col>
          <p className=" mt-4">
            <span className="fs-4 fw-bold text-warning">
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
      <div style={{ marginTop: 20 }}>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" gutterBottom>
              All Coupons
            </Typography>
            {coupons.map((coupon) => (
              <Box
                key={coupon.coupon_id}
                border={1}
                borderRadius={4}
                padding={2}
                marginBottom={2}
                boxShadow={1}
              >
                <Typography variant="h6">
                  Coupon ID: {coupon.coupon_id}
                </Typography>
                <Typography>Points: {coupon.points}</Typography>
                <Typography>Description: {coupon.description}</Typography>
                <Typography>
                  Created At: {new Date(coupon.created_at).toLocaleDateString()}
                </Typography>
                <Typography>
                  Expires At: {new Date(coupon.expires_at).toLocaleDateString()}
                </Typography>
                <Typography>Used: {coupon.is_used ? "Yes" : "No"}</Typography>
              </Box>
            ))}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CouponsList;
