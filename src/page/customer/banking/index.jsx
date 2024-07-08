import { Button, Col, Container, Row } from "react-bootstrap";
import vietcombankimg from "@/assets/image/vietcombank.png";
import { Link, useParams } from "react-router-dom";

const Banking=()=>{
    const {
      code_order,
      total_price,
      child_quantity,
      adult_quantity,
      infant_quantity,
      note,
    } = useParams();
    const totalPriceInt = parseInt(total_price, 10);
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
          <h4 className="mt-4 fw-bold">VUI LÒNG CHUYỂN KHOẢN ĐẾN</h4>
          <Row className="my-4 pb-5">
            <Col className="col-lg-8 col-12">
              <div
                style={{ background: "rgba(247,249,250,1.00)" }}
                className="p-3 shadow-sm rounded-3"
              >
                <div
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                  }}
                  className="p-3 shadow-sm rounded-3 text-dark fs-5 fw-bold"
                >
                  <Row>
                    <Col> Vietcombank</Col>
                    <Col>
                      <div style={{ display: "grid", placeItems: "end" }}>
                        <img
                          src={vietcombankimg}
                          style={{
                            width: "8rem",
                            height: "2rem",
                            objectFit: "contain",
                          }}
                          loading="lazy"
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row className="px-3 mt-4">
                  <Col className="col-lg-3 col-5">
                    <p className="fw-bold mt-2">Số tài khoản:</p>
                  </Col>
                  <Col>
                    <p
                      className="p-2 rounded-3 fw-bold"
                      style={{ background: "white" }}
                    >
                      0471000331055
                    </p>
                  </Col>
                </Row>
                <Row className="px-3 ">
                  <Col className="col-lg-3 col-5">
                    <p className="fw-bold mt-2">Chủ tài khoản:</p>
                  </Col>
                  <Col>
                    <p
                      className="p-2 rounded-3 fw-bold"
                      style={{ background: "white" }}
                    >
                      NGUYEN MINH HIEU
                    </p>
                  </Col>
                </Row>
                <Row className="px-3 ">
                  <Col className="col-lg-3 col-5">
                    <p className="fw-bold mt-2">Nội dung thanh toán:</p>
                  </Col>
                  <Col>
                    <p
                      className="p-2 rounded-3 fw-bold"
                      style={{ background: "white" }}
                    >
                      Thanh toán Booking {code_order}
                    </p>
                  </Col>
                </Row>
                <hr />
                <Row className="px-3 ">
                  <Col className="col-lg-3 col-5">
                    <p className="fw-bold mt-2">Số tiền chuyển khoản:</p>
                  </Col>
                  <Col>
                    <p
                      className="p-2 rounded-3 fw-bold text-danger"
                      style={{ background: "white" }}
                    >
                      {formatPrice(totalPriceInt)}
                    </p>
                  </Col>
                </Row>
                <div
                  style={{
                    background: "#ffc1074d",
                    border: "2px solid #ffc1074d",
                  }}
                  className="p-3 shadow-sm rounded-3 text-dark mt-3 "
                >
                  <p className="fw-bold">LƯU Ý QUAN TRỌNG!</p>
                  <p>
                    Vui lòng chuyển chính xác số tiền và ghi rõ nội dung thanh
                    toán.
                  </p>
                </div>
                <h5 className="my-3 fw-bold p-3">
                  ĐÃ HOÀN TẤT THANH TOÁN CỦA BẠN?
                </h5>
                <div
                  className="shadow-sm p-3 rounded-3"
                  style={{ background: "white", border: "0px" }}
                >
                  Sau khi xác nhận thanh toán của bạn, chúng tôi sẽ gửi xác nhận
                  thanh toán qua email.
                  <Link to="/information/list-order">
                    <Button variant="dark" className="col-12 my-3 py-2">
                      Vâng tôi đã thanh toán
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <div
                style={{ background: "rgba(247,249,250,1.00)" }}
                className="p-3 shadow-sm rounded-3"
              >
                <div
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                  }}
                  className="p-3 shadow-sm rounded-3 text-dark fw-bold "
                >
                  CHI TIẾT ĐẶT CHỖ
                </div>
                <div className="mt-3 px-3">
                  <p>
                    <strong>Người lớn:</strong> {adult_quantity}
                  </p>
                  <p>
                    {" "}
                    <strong> Trẻ em: </strong>
                    {child_quantity}
                  </p>
                  <p>
                    <strong>Trẻ nhỏ: </strong>
                    {infant_quantity}
                  </p>
                  <p>
                    <strong>Ghi chú: </strong>
                    {note}
                  </p>
                  <hr />
                  <p className=" fw-bold">
                    <strong>Tổng tiền: </strong>
                    <span className="text-danger">
                      {formatPrice(totalPriceInt)}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
}
export default Banking;