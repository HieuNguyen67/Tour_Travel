import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL_ADMIN, BLUE_COLOR, GREEN_COLOR, RED1_COLOR, RED_COLOR, TEXT_RED_COLOR } from "@/constants";
import { useAuth } from "@/context";
import { format } from "date-fns";
import { RiRefund2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { FaSave } from "react-icons/fa";

const RefundDetailsModal = ({ show, handleClose, refundId }) => {
  const [refundDetails, setRefundDetails] = useState([]);
  const [dateRefund, setDateRefund] = useState(null);
      const [status, setStatus] = useState("");
        const [loading, setLoading] = useState(false);


    const {token}= useAuth();
  useEffect(() => {
    if (refundId) {
      axios.get(`${BASE_URL_ADMIN}/refunds-detail/${refundId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then((response) => {
          setRefundDetails(response.data);
          setDateRefund(response.data.refund_date);
          setStatus(response.data.status)
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin hoàn tiền:", error);
        });
    }
  }, [refundId]);

    const formatPrice = (price) => {
      if (typeof price !== "number") {
        return price;
      }
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };
     const handleUpdate = async (e) => {
          e.preventDefault();

      setLoading(true);
       try {
         const response = await axios.put(
           `${BASE_URL_ADMIN}/update-status-refund/${refundId}`,
           {
             status,
           },
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
         toast.success(response.data.message);
         handleClose(false);

         window.location.reload();
       } catch (error) {
         toast.error(error.response.data.message);

       }
       setLoading(false);
     };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <RiRefund2Line className="text-warning  fs-3" /> Chi tiết hoàn tiền
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            <strong>Mã booking:</strong> {refundDetails.code_order}
          </p>
          <p>
            <strong>Trạng thái khách hàng thanh toán:</strong>{" "}
            <span className="fw-bold text-primary">
              {refundDetails.status_payment === "Paid" ? (
                <>
                  <Button
                    style={{ background: GREEN_COLOR, border: "0px" }}
                    className="text-dark mt-lg-0 mt-3"
                  >
                    Đã thanh toán
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="mt-lg-0 mt-3"
                    style={{ background: BLUE_COLOR, border: "0px" }}
                  >
                    Chưa thanh toán
                  </Button>
                </>
              )}
            </span>
          </p>
          <p>
            <strong>Số tiền cần hoàn:</strong>{" "}
            <span className="fw-bold fs-5" style={{ color: TEXT_RED_COLOR }}>
              {formatPrice(refundDetails.refund_amount)}
            </span>
          </p>

          <p>
            <strong>Trạng thái:</strong>{" "}
            {refundDetails.status === "Pending" ? (
              <>Chờ xác nhận</>
            ) : refundDetails.status === "Refunded" ? (
              <>Đã hoàn tiền</>
            ) : (
              <>Từ chối</>
            )}
          </p>
          {dateRefund ? (
            <>
              <p>
                <strong>Thời gian cập nhật:</strong>{" "}
                {format(
                  new Date(refundDetails.refund_date),
                  "yyyy-MM-dd HH:mm:ss"
                )}
              </p>
            </>
          ) : (
            <></>
          )}
          <p>
            <strong>Trạng thái hệ thống hoàn tiền:</strong>{" "}
            {refundDetails.status_refund === "No" ? (
              <>
                {" "}
                <Button
                  style={{ background: BLUE_COLOR, border: "0px" }}
                  className="mt-lg-0 mt-3"
                >
                  Chưa hoàn tiền
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  style={{ background: RED_COLOR, border: "0px" }}
                  className="mt-lg-0 mt-3"
                >
                  Đã hoàn tiền
                </Button>
              </>
            )}
          </p>
          <p>
            <strong>Ghi chú:</strong> {refundDetails.note}
          </p>

          <hr />
          <h5 className="mb-3 fw-bold">Thông tin hoàn tiền khách hàng</h5>
          <p>
            <strong>Ngân hàng:</strong> {refundDetails.bank_name}
          </p>
          <p>
            <strong>Tên tài khoản:</strong> {refundDetails.bank_account_name}
          </p>
          <p>
            <strong>Số tài khoản:</strong> {refundDetails.bank_account_number}
          </p>
          <p>
            <strong>Email:</strong> {refundDetails.email}
          </p>
        </div>

        {refundDetails.status === "Pending" ? (
          <>
            <div>
              <Form>
                <Form.Group className="my-4">
                  <Form.Label className="fw-bold">
                    {" "}
                    <RxUpdate className="fs-5" /> Trạng thái:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pendind">Pending</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Reject">Reject</option>
                  </Form.Control>
                </Form.Group>

                <Button
                  onClick={handleUpdate}
                  disabled={loading}
                  style={{ background: BLUE_COLOR, border: "0px" }}
                  className="mb-3"
                >
                  {loading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <FaSave /> Cập nhật
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </>
        ) : refundDetails.status === "Refunded" ? (
          <>
            <Button style={{ background: RED1_COLOR, border: "0px" }}>
              Bạn xác nhận đã hoàn tiền!
            </Button>
          </>
        ) : (
          <>
            <Button style={{ background: RED1_COLOR, border: "0px" }}>
              Bạn từ chối yêu cầu hoàn tiền!
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RefundDetailsModal;
