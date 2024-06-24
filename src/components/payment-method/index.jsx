import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import momoimg from "@/assets/image/momo.png";
import atmimg from "@/assets/image/atm.png";
import visaimg from "@/assets/image/visa.png";
import bankimg from "@/assets/image/bank.png";
const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const handleBoxClick = (method) => {
    setPaymentMethod(method);
  };

  return (
    <Form.Group controlId="paymentMethod">
      <Row>
        <Col className="col-12 mb-3">
          <div
            style={{
              background: "rgba(247,249,250,1.00)",
              padding: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            className="shadow-sm rounded-3"
            onClick={() => handleBoxClick("captureWallet")}
          >
            <Row>
              <Col className="col-8">
                <Form.Check
                  className="fs-5 fw-bold"
                  type="radio"
                  label="Quét mã MOMO"
                  name="paymentMethod"
                  id="captureWallet"
                  value="captureWallet"
                  checked={paymentMethod === "captureWallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
              <Col>
                <div style={{ display: "grid", placeItems: "end" }}>
                  <img
                    src={momoimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>
            </Row>
            {paymentMethod === "captureWallet" && (
              <>
                <div
                  className="mt-3 rounded-3"
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                    padding: "1rem",
                    color: "black",
                  }}
                >
                  <p>
                    Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang thanh
                    toán của MOMO:
                  </p>
                  <ol>
                    <li>
                      <strong>Mở ứng dụng MoMo:</strong>
                      <p>Mở ứng dụng MoMo trên điện thoại của bạn.</p>
                    </li>
                    <li>
                      <strong>Chọn mục "Quét mã":</strong>
                      <p>
                        Trên giao diện chính của ứng dụng, chọn mục "Quét mã".
                      </p>
                    </li>
                    <li>
                      <strong>Quét mã QR:</strong>
                      <p>
                        Di chuyển điện thoại của bạn sao cho mã QR nằm trong
                        khung quét của camera. Ứng dụng sẽ tự động nhận diện và
                        quét mã.
                      </p>
                    </li>
                    <li>
                      <strong>Kiểm tra thông tin thanh toán:</strong>
                      <p>
                        Sau khi quét mã, thông tin giao dịch sẽ hiển thị trên
                        màn hình. Kiểm tra lại số tiền và thông tin người nhận.
                      </p>
                    </li>
                    <li>
                      <strong>Xác nhận thanh toán:</strong>
                      <p>
                        Nếu mọi thông tin đều chính xác, nhấn vào nút "Thanh
                        toán" hoặc "Xác nhận".
                      </p>
                    </li>
                    <li>
                      <strong>Nhập mã PIN:</strong>
                      <p>
                        Nhập mã PIN của bạn để xác nhận giao dịch. Sau khi nhập
                        mã PIN, giao dịch sẽ được xử lý.
                      </p>
                    </li>
                    <li>
                      <strong>Hoàn tất:</strong>
                      <p>
                        Sau khi thanh toán thành công, bạn sẽ nhận được thông
                        báo và biên nhận trên ứng dụng MoMo.
                      </p>
                    </li>
                  </ol>
                  <p>Vậy là bạn đã hoàn tất thanh toán bằng mã QR MoMo!</p>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col className="col-12 mb-3">
          <div
            style={{
              background: "rgba(247,249,250,1.00)",
              padding: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            className="shadow-sm rounded-3"
            onClick={() => handleBoxClick("bank")}
          >
            <Row>
              <Col className="col-8">
                <Form.Check
                  className="fs-5 fw-bold"
                  type="radio"
                  label="Chuyển khoản ngân hàng"
                  name="paymentMethod"
                  id="bank"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
              <Col>
                <div style={{ display: "grid", placeItems: "end" }}>
                  <img
                    src={bankimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>
            </Row>
            {paymentMethod === "bank" && (
              <>
                <div
                  className="mt-3 rounded-3"
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                    padding: "1rem",
                    color: "black",
                  }}
                >
                  <p>
                    Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang thanh
                    toán:
                  </p>
                  <ol>
                    <li>
                      <strong>
                        Quý khách vui lòng chuyển khoản số tiền cần thanh toán
                        vào tài khoản ngân hàng của chúng tôi:
                      </strong>
                      <p>
                        Xin vui lòng ghi rõ họ tên, mã số booking trong phần ghi
                        chú khi chuyển khoản.
                      </p>
                    </li>
                    <li>
                      <strong>
                        Sau khi thanh toán, chờ chúng tôi xác nhận và cập nhật
                        thông tin thanh toán cho đơn hàng của bạn:
                      </strong>
                      <p>
                        Thời gian cập nhật thanh toán chỉ áp dụng từ 8 giờ sáng
                        tới 8 giờ tối, ngoài giờ trên quý khách vui lòng chờ đợi
                      </p>
                    </li>
                  </ol>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col className="col-12 mb-3">
          <div
            style={{
              background: "rgba(247,249,250,1.00)",
              padding: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            className="shadow-sm rounded-3"
            onClick={() => handleBoxClick("payWithATM")}
          >
            <Row>
              <Col className="col-8">
                <Form.Check
                  className="fs-5 fw-bold"
                  type="radio"
                  label="Thanh toán thẻ ATM nội địa"
                  name="paymentMethod"
                  id="payWithATM"
                  value="payWithATM"
                  checked={paymentMethod === "payWithATM"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
              <Col>
                <div style={{ display: "grid", placeItems: "end" }}>
                  <img
                    src={atmimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>
            </Row>
            {paymentMethod === "payWithATM" && (
              <>
                <div
                  className="mt-3 rounded-3"
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                    padding: "1rem",
                    color: "black",
                  }}
                >
                  <p>
                    Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang thanh
                    toán:
                  </p>
                  <ol>
                    <li>
                      <strong>Nhập thông tin thẻ ATM:</strong>
                      <p>
                        Điền đầy đủ thông tin thẻ ATM của bạn, bao gồm số thẻ,
                        tên chủ thẻ, ngày hết hạn .
                      </p>
                    </li>
                    <li>
                      <strong>Xác nhận thông tin giao dịch:</strong>
                      <p>
                        Kiểm tra lại thông tin giao dịch, đảm bảo rằng tất cả
                        thông tin đều chính xác.
                      </p>
                    </li>
                    <li>
                      <strong>Thực hiện thanh toán:</strong>
                      <p>
                        Nhấn vào nút "Thanh toán" để tiến hành giao dịch. Hệ
                        thống sẽ chuyển bạn đến trang xác thực của ngân hàng.
                      </p>
                    </li>
                    <li>
                      <strong>Nhập mã OTP:</strong>
                      <p>
                        Ngân hàng sẽ gửi mã OTP (One-Time Password) đến số điện
                        thoại của bạn. Nhập mã này để xác nhận giao dịch.
                      </p>
                    </li>
                    <li>
                      <strong>Hoàn tất giao dịch:</strong>
                      <p>
                        Sau khi nhập mã OTP và xác nhận, giao dịch sẽ được xử
                        lý. Bạn sẽ nhận được thông báo giao dịch thành công.
                      </p>
                    </li>
                  </ol>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col className="col-12 mb-3">
          <div
            style={{
              background: "rgba(247,249,250,1.00)",
              padding: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            className="shadow-sm rounded-3"
            onClick={() => handleBoxClick("payWithCC")}
          >
            <Row>
              <Col className="col-8">
                <Form.Check
                  className="fs-5 fw-bold"
                  type="radio"
                  label="Thẻ Visa/Mastercard/JCB"
                  name="paymentMethod"
                  id="payWithCC"
                  value="payWithCC"
                  checked={paymentMethod === "payWithCC"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
              <Col>
                <div style={{ display: "grid", placeItems: "end" }}>
                  <img
                    src={visaimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>
            </Row>
            {paymentMethod === "payWithCC" && (
              <>
                <div
                  className="mt-3 rounded-3"
                  style={{
                    background: "rgb(236, 248, 255)",
                    border: "2px solid rgb(1, 148, 243)",
                    padding: "1rem",
                    color: "black",
                  }}
                >
                  <p>
                    Sau khi bấm Đặt Ngay chúng tôi sẽ chuyển bạn đến trang thanh
                    toán:
                  </p>
                  <ol>
                    <li>
                      <strong>Nhập thông tin thẻ quốc tế:</strong>
                      <p>
                        Điền đầy đủ thông tin thẻ quốc tế của bạn, bao gồm số
                        thẻ, tên chủ thẻ, ngày hết hạn và mã CVV.
                      </p>
                    </li>
                    <li>
                      <strong>Xác nhận thông tin giao dịch:</strong>
                      <p>
                        Kiểm tra lại thông tin giao dịch, đảm bảo rằng tất cả
                        thông tin đều chính xác.
                      </p>
                    </li>
                    <li>
                      <strong>Thực hiện thanh toán:</strong>
                      <p>
                        Nhấn vào nút "Thanh toán" để tiến hành giao dịch. Hệ
                        thống sẽ xử lý thông tin và chuyển bạn đến trang xác
                        thực của ngân hàng (nếu cần).
                      </p>
                    </li>
                    <li>
                      <strong>Nhập mã OTP:</strong>
                      <p>
                        Nếu ngân hàng yêu cầu, mã OTP (One-Time Password) sẽ
                        được gửi đến số điện thoại của bạn. Nhập mã này để xác
                        nhận giao dịch.
                      </p>
                    </li>
                    <li>
                      <strong>Hoàn tất giao dịch:</strong>
                      <p>
                        Sau khi nhập mã OTP và xác nhận, giao dịch sẽ được xử
                        lý. Bạn sẽ nhận được thông báo giao dịch thành công.
                      </p>
                    </li>
                  </ol>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default PaymentMethod;
