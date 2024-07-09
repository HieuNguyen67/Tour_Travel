import { Col, Container, Row } from "react-bootstrap";
import React, { Suspense, lazy } from "react";

const CouponsList = lazy(() => import("@/components/modal-history-coupons"));
const CheckIn = lazy(() => import("@/components/daily-checkin"));

const Coupons = () => {
  return (
    <>
      <Container className="my-3">
        <Suspense fallback={<div>Loading...</div>}>
          <CouponsList />
        </Suspense>
        <hr />
        <Suspense fallback={<div>Loading...</div>}>
          <CheckIn />
        </Suspense>
      </Container>
    </>
  );
};
export default Coupons;
