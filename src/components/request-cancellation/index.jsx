import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '@/context';
import {  RED1_COLOR, TEXT_MAIN_COLOR } from '@/constants';
import { MdCancel } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaCaretSquareDown } from 'react-icons/fa';
import { toast } from "react-toastify";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

const CancellationRequestModal = ({ show, handleClose, orderId, businessId, customerId, status , start_date, category}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const{token, role}= useAuth();
  const [policy_cancellation, setPolicyCancellation] = useState([]);
  const [loading, setLoading] = useState(false);


  
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (businessId) {
          if(category ==="Du lịch trong nước"){
            var type='Trong nước';
          }else{
            var type = "Nước ngoài";
          }
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-policies-cancellation/${businessId}?type=${type}`
          );
          setPolicyCancellation(response.data);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [businessId]);

   const timeZone = "Asia/Ho_Chi_Minh";

   const today = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");
  const Navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
        setLoading(true);

    try {
       if (new Date(start_date) <= new Date(today)) {
         toast.error("Không thể huỷ tour đang hoặc đã diễn ra!");
          setLoading(false);
         return;
       }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/request-cancellation/${orderId}/${businessId}/${customerId}`,
        { reason,
           statusOrder: status
           },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 if (role == 1) {
   Navigate("/information/refunds");
 } else {
   Navigate("/business/list-request-cancel");
 }
      toast.success(response.data.message);
      
    } catch (err) {
      setError(err.response.data.message);
      toast.error(
        err.response.data.message
      );
    }
            setLoading(false);

  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <MdCancel className="fs-3 text-danger mb-1" />
          &nbsp;YÊU CẦU HUỶ BOOKING
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {status === "Confirm" ? (
            <>
              <Accordion sx={{ background: "#f9f9f9" }} className="my-3">
                <AccordionSummary
                  expandIcon={<FaCaretSquareDown className="fs-4" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <span className="fw-bold" style={{ color: TEXT_MAIN_COLOR }}>
                    Chính sách huỷ tour của doanh nghiệp (
                    {category === "Du lịch trong nước" ? (
                      <> Áp Dụng Tour Trong Nước </>
                    ) : (
                      <> Áp Dụng Tour Nước Ngoài </>
                    )}
                    )
                  </span>
                </AccordionSummary>
                <AccordionDetails style={{ color: TEXT_MAIN_COLOR }}>
                  {policy_cancellation.map((item, index) => (
                    <>
                      <div key={item.index}>
                        <p>
                          - Nếu huỷ chuyến du lịch trong vòng{" "}
                          <span className="fw-bold">
                            {item.days_before_departure}
                          </span>{" "}
                          ngày trước khởi hành: Hoàn{" "}
                          <span className="fw-bold">
                            {item.refund_percentage}%
                          </span>{" "}
                          giá vé
                        </p>
                      </div>
                    </>
                  ))}
                </AccordionDetails>
              </Accordion>
            </>
          ) : status === "Cancel" ? (
            <> Xác Nhận Huỷ Booking Hoàn Tiền 100% Lại Cho Khách Hàng !</>
          ) : (
            <>
              <p className="fw-bold">
                Bạn sẽ được hoàn 100% vì doanh nghiệp chưa xác nhận đơn này. Sau
                khi huỷ chờ chúng tôi hoàn tiền, để xem chi tiết vui lòng truy
                cập mục HOÀN TIỀN.
              </p>
            </>
          )}
          {status === "Confirm" ? (
            <>
              {" "}
              <Form.Group controlId="formReason">
                <Form.Label className="fw-bold">
                  <MdRateReview className="fs-4" /> Lý do hủy:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}
            </>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: RED1_COLOR, border: "0px" }}
            className="col-12 py-3"
            type="submit"
            disabled={loading}
          >
            {loading ? <>Loading...</> : <>Gửi yêu cầu</>}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CancellationRequestModal;
