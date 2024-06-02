import { Col, Container, Row } from "react-bootstrap";
import CouponsList from "@/components/modal-history-coupons";

const Coupons=()=>{
    return (
      <>
        <Container className="my-3">
          <CouponsList />
          <hr />
        </Container>
      </>
    );
}
export default Coupons;
