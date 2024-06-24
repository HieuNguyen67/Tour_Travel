import { Button, Col, Container } from "react-bootstrap";
import verifiedimg from "@/assets/image/verified.png";
import cancleimg from "@/assets/image/cancle.png";
import { Link, useLocation, useParams } from "react-router-dom";
import head from "@/assets/image/heading-border.png";

const Checkout =()=>{
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const partnerCode = params.get("partnerCode");
    const orderId = params.get("orderId");
    const amount = params.get("amount");
    const orderInfo = params.get("orderInfo");
    const resultCode = params.get("resultCode");
    const message = params.get("message");
    const payType = params.get("payType");
    const responseTime = params.get("responseTime");
    const extraData = params.get("extraData");
    const signature = params.get("signature");
    const totalPriceInt = parseInt(amount, 10);
 const formatPrice = (price) => {
   if (typeof price !== "number") {
     return price;
   }
   return new Intl.NumberFormat("vi-VN", {
     style: "currency",
     currency: "VND",
   }).format(price);
 };
    return (
      <>
        <Container className="mt-5 pt-5">
          <div
            style={{ display: "grid", placeItems: "center" }}
            className="mt-5"
          >
            {resultCode == 0 ? (
              <>
                <img
                  src={verifiedimg}
                  className="mb-2"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                  }}
                />{" "}
                <h3 className="fw-bold mt-4">THANH TOÁN THÀNH CÔNG</h3>
              </>
            ) : (
              <>
                {" "}
                <img
                  src={cancleimg}
                  className="mb-2"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                  }}
                />{" "}
                <h3 className="fw-bold mt-4">THANH TOÁN THẤT BẠI</h3>
              </>
            )}

            <p className="text-center">
              Mã Booking: <span className="fw-bold">{orderId}</span>
              <br />
              Tổng tiền:{" "}
              <span className="fw-bold text-danger"> {formatPrice(totalPriceInt)}</span>
              <br />
              Nội dung: <span className="fw-bold"> {orderInfo}</span>
              <br />
              Hình thức: <span className="fw-bold"> {payType}</span>
            </p>
            <img src={head} className="col-lg-1 col-3 my-3" />
            <p className="fw-bold">Cảm ơn bạn đã đặt tour tại Tour Travel</p>
            <Col className="col-lg-6 col-12">
              <p className="text-center">
                {resultCode == 0 ? (
                  <>
                    Bạn đã đặt tour thành công. Để kiểm tra chi tiết về đơn đặt
                    tour. Vui lòng chọn "Theo dõi đơn đặt tour của bạn" hoặc
                    Quay lại trang chủ.
                  </>
                ) : (
                  <>
                    Bạn chưa thanh toán. Vui lòng chọn "Theo dõi đơn đặt tour
                    của bạn" và bấm vào chi tiết đơn đặt để tiếp tục thanh toán
                  </>
                )}
              </p>
            </Col>
            <Col className="col-lg-4 col-12 mt-4">
              <Link to="/information/list-order">
                <Button variant="outline-dark" className="col-12 ">
                  THEO DÕI ĐƠN HÀNG
                </Button>
              </Link>
            </Col>
            <Col className="col-lg-4 col-12 mt-3 mb-5 pb-5">
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