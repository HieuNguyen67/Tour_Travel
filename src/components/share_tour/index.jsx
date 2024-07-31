import React, { useState } from "react";
import axios from "axios";
import {  RED_COLOR } from "@/constants";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

const ShareTour = ({ tourId, customerId }) => {
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, token } = useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShareTour = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    setShow(true);
    try {
      if (customerId) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/share-tour/${tourId}/${customerId}`
        );
        const { shareLink } = response.data;
        setShareLink(shareLink);
      }
    } catch (error) {
      setError("Lỗi khi tạo link chia sẻ tour. Vui lòng thử lại sau.");
      console.error("Lỗi khi gọi API tạo link chia sẻ:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link đã được sao chép vào clipboard!");
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <Button
        className="col-12 py-3 col-lg-9 mt-3 mt-lg-0"
        style={{ background: RED_COLOR, border: "0px" }}
        onClick={handleShareTour}
      >
        <FaShareAlt className="fs-4" /> Chia sẻ tour nhận xu
      </Button>

      {shareLink && (
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <FaShareAlt className="fs-2" />
            <span className="fw-bold fs-5 ms-3">QUY ĐỊNH CHIA SẺ TOUR</span>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div>
              <p className="fw-bold">Đã tạo link chia sẻ tour thành công:</p>
              <InputGroup>
                <FormControl value={shareLink} readOnly />
                <Button variant="outline-dark" onClick={handleCopyLink}>
                  Sao chép
                </Button>
              </InputGroup>
            </div>
            <div
              className="mt-3 rounded-3"
              style={{
                background: "rgb(236, 248, 255)",
                border: "2px solid rgb(1, 148, 243)",
                padding: "1rem",
                color: "black",
              }}
            >
              <h5 className="fw-bold">
                Hướng Dẫn Chia Sẻ Link Tour và Nhận Điểm Thưởng
              </h5>
              <ul>
                <li>
                  <strong>Bước 1: Truy cập trang tour bạn muốn chia sẻ</strong>
                  <ul>
                    <li>Đăng nhập vào tài khoản của bạn trên trang web.</li>
                    <li>Chọn tour bạn muốn chia sẻ.</li>
                  </ul>
                </li>
                <li>
                  <strong>Bước 2: Tạo link chia sẻ</strong>
                  <ul>
                    <li>
                      Tại trang chi tiết tour, tìm và nhấn vào nút "Chia sẻ
                      tour".
                    </li>
                    <li>
                      Hệ thống sẽ tạo một link chia sẻ duy nhất cho tour này.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Bước 3: Chia sẻ link</strong>
                  <ul>
                    <li>Sao chép link chia sẻ vừa tạo.</li>
                    <li>
                      Gửi link này cho bạn bè qua email, tin nhắn hoặc chia sẻ
                      trên mạng xã hội.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Bước 4: Nhận xu</strong>
                  <ul>
                    <li>
                      Khi bạn bè của bạn nhấn vào link chia sẻ và đặt tour thanh
                      toán thành công, hệ thống sẽ tự động cộng xu vào tài khoản
                      của bạn.
                    </li>
                    <li>
                      Xu thưởng sẽ hiển thị trong phần "Xu" trong tài khoản của
                      bạn.
                    </li>
                  </ul>
                </li>
              </ul>
              <h5 className="fw-bold">Lưu ý</h5>
              <ul>
                <li>
                  Đảm bảo bạn bè của bạn sử dụng link chia sẻ để truy cập trang
                  tour và đặt tour.
                </li>
                <li>
                  Xu thưởng chỉ được cộng khi việc đặt tour thanh toán hoàn tất.
                </li>
              </ul>
              <p>Chúc bạn chia sẻ thành công và nhận nhiều xu thưởng!</p>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ShareTour;
