import { Col, Container, Row } from "react-bootstrap";
import React, { Suspense, lazy } from "react";

const CouponsList = lazy(() => import("@/components/modal-history-coupons"));

const Coupons = () => {
  return (
    <>
      <Container className="my-3">
        <Suspense fallback={<div>Loading...</div>}>
          <CouponsList />
        </Suspense>
        <hr />
      
      </Container>
    </>
  );
};
export default Coupons;
