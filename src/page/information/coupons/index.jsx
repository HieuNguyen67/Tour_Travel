import { Col, Container, Row } from "react-bootstrap";
import CouponsList from "@/components/modal-history-coupons";
import CheckIn from "@/components/daily-checkin";

const Coupons=()=>{
    return (
      <>
        <Container className="my-3">
          <CouponsList />
          <hr />
          <CheckIn/>
        </Container>
      </>
    );
}
export default Coupons;
