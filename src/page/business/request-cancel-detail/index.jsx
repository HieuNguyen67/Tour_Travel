import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import {BLUE_COLOR, GREEN_COLOR, RED1_COLOR, RED_COLOR } from "@/constants";
import { useAuth } from "@/context";
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";
import { RxUpdate } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const CancellationRequestDetail = ({ requestId, show, handleClose }) => {
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [statusold, setStatusold] = useState("");
  const {token, role}= useAuth();
  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/detail-cancellation-request/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequestDetail(response.data);
        setStatus(response.data.status);
        setStatusold(response.data.status);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (show) {
      fetchRequestDetail();
    }
  }, [requestId, show]);

  const handleUpdate = async () => {
    try {
     const response = await axios.post(
       `${process.env.REACT_APP_BASE_URL_BUSINESS}/update-cancellation-status/${requestId}`,
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
      console.error("Failed to update news status and note:", error);
            toast.error(error.response.data.message);

      setError(error.response.data.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <MdCancel className="fs-3 mb-1 text-danger" /> YÊU CẦU HUỶ BOOKING TỪ
          KHÁCH HÀNG
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requestDetail && (
          <>
            <div>
              <p>
                <strong>Mã booking:</strong> {requestDetail.code_order}
              </p>

              <p>
                <strong>Trạng thái thanh toán:</strong>{" "}
                <span className="fw-bold text-primary">
              
                  {requestDetail.status_payment === "Unpaid" ? (
                    <>
                      <Button
                        style={{ background: BLUE_COLOR, border: "0px" }}
                      >
                        Chưa thanh toán
                      </Button>
                    </>
                  ) : (
                    <Button
                      style={{ background: GREEN_COLOR, border: "0px" }}
                      className=" text-dark"
                    >
                      Đã thanh toán
                    </Button>
                  )}
                </span>
              </p>

              <p>
                <strong>Tour:</strong> {requestDetail.tour_name}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong>{" "}
                <span className="fw-bold text-primary">
                  {format(new Date(requestDetail.start_date), "yyyy-MM-dd")}{" "}
                </span>
              </p>
              <p>
                <strong>Ngày kết thúc:</strong>{" "}
                <span className="fw-bold text-primary">
                  {format(new Date(requestDetail.end_date), "yyyy-MM-dd")}{" "}
                </span>
              </p>
              <p>
                <strong>Ngày yêu cầu huỷ:</strong>{" "}
                {format(
                  new Date(requestDetail.request_date),
                  "yyyy-MM-dd HH:mm:ss"
                )}
              </p>
              <p>
                <strong>Khách hàng:</strong> {requestDetail.customer_name}
              </p>

              <p>
                <strong>Lý do:</strong> {requestDetail.reason}
              </p>

              <p>
                <strong>Trạng thái tiếp nhận:</strong>{" "}
                {requestDetail.status === "Pending" ? (
                  <>Chờ xác nhận</>
                ) : requestDetail.status === "Confirm" ? (
                  <>Đã xác nhận</>
                ) : (
                  <>Bị từ chối</>
                )}
              </p>
              <p>
                <strong>Trạng thái hoàn tiền:</strong>{" "}
                {requestDetail.status_refund === "No" ? (
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
                <strong>Ngày booking:</strong>{" "}
                {format(
                  new Date(requestDetail.booking_date_time),
                  "yyyy-MM-dd HH:mm:ss"
                )}
              </p>
            </div>
            {role == 3 ? (
              <>
                {" "}
                {statusold === "Confirm" ? (
                  <>
                    <Button style={{ background: RED1_COLOR, border: "0px" }}>
                      Bạn đã gửi yêu cầu hoàn tiền của khách hàng đến hệ thống!
                    </Button>
                  </>
                ) : statusold === "Reject" ? (
                  <>
                    <Button style={{ background: RED1_COLOR, border: "0px" }}>
                      Bạn đã từ chối yêu cầu huỷ của khách hàng!
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
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
                            <option value="Pending">Chờ xác nhận</option>
                            <option value="Confirm">Đã xác nhận</option>
                           
                          </Form.Control>
                        </Form.Group>

                        <Button
                          onClick={handleUpdate}
                          disabled={loading}
                          style={{ background: BLUE_COLOR, border: "0px" }}
                          className="mb-3"
                        >
                          <FaSave /> Cập nhật
                        </Button>
                      </Form>
                    </div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancellationRequestDetail;
