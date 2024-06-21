import { Button, Col, Container } from "react-bootstrap";
import verifiedimg from "@/assets/image/verified.png";
import { Link, useLocation, useParams } from "react-router-dom";

const Checkout =()=>{
    const{code_order, page }=useParams();
      const location = useLocation();


    return (
      <>
        <Container className="mt-5 pt-5">
          <div
            style={{ display: "grid", placeItems: "center" }}
            className="mt-5"
          >
            <img
              src={verifiedimg}
              className="mb-2"
              style={{
                width: "8rem",
                height: "8rem",
                objectFit: "cover",
              }}
            />{" "}
            <h3 className="fw-bold mt-4">
              {page == 1 ? <>ĐẶT TOUR THÀNH CÔNG</> : <>THANH TOÁN THÀNH CÔNG</>}
            </h3>
            <p>
              Mã Booking: <span className="fw-bold">{code_order}</span>
            </p>
            <hr style={{ width: "40rem" }} />
            <p className="fw-bold">Cảm ơn bạn đã đặt tour tại Tour Travel</p>
            <Col className="col-6">
              <p className="text-center">
                Bạn đã đặt tour thành công. Để kiểm tra chi tiết về đơn đặt
                tour. Vui lòng chọn "Theo dõi đơn đặt tour của bạn" hoặc Quay
                lại trang chủ.
              </p>
            </Col>
            <Col className="col-4 mt-4">
              <Link to="/information/list-order">
                <Button variant="outline-dark" className="col-12 ">
                  THEO DÕI ĐƠN HÀNG
                </Button>
              </Link>
            </Col>
            <Col className="col-4 mt-3 mb-5 pb-5">
              <Link to="/">
                <Button variant="dark" className="col-12 ">
                  TRANG CHỦ
                </Button>
              </Link>
            </Col>
          </div>
        </Container>
      </>
    );
}
export default Checkout;