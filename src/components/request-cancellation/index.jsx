import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '@/context';
import { BASE_URL_BUSINESS, BASE_URL_CUSTOMER, RED1_COLOR, TEXT_MAIN_COLOR } from '@/constants';
import { MdCancel } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaCaretSquareDown } from 'react-icons/fa';
import { toast } from "react-toastify";

const CancellationRequestModal = ({ show, handleClose, orderId, businessId, customerId }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const{token}= useAuth();
  const [policy_cancellation, setPolicyCancellation] = useState([]);


  
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (businessId) {
          const response = await axios.get(
            `${BASE_URL_BUSINESS}/list-policies-cancellation/${businessId}`
          );
          setPolicyCancellation(response.data);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [businessId]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL_CUSTOMER}/request-cancellation/${orderId}/${businessId}/${customerId}`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(response.data.message);
      setReason('');
      setError('');
     
        setSuccess('');
        handleClose();
        toast.success(response.data.message);
        window.location.reload();
      
    } catch (err) {
      setError(err.response.data.message);
      toast.error(
        err.response.data.message
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <MdCancel className="fs-3 text-danger mb-1" />
          &nbsp;YÊU CẦU HUỶ BOOKING
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Accordion sx={{ background: "#f9f9f9" }} className="my-3">
          <AccordionSummary
            expandIcon={<FaCaretSquareDown className="fs-4" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span
              className="fw-bold"
              style={{ color: TEXT_MAIN_COLOR }}
            >
              Chính sách huỷ tour của doanh nghiệp
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
                    <span className="fw-bold">{item.refund_percentage}%</span>{" "}
                    giá vé
                  </p>
                </div>
              </>
            ))}
          </AccordionDetails>
        </Accordion>
        <Form>
          <Form.Group controlId="formReason">
            <Form.Label className="fw-bold">
              <MdRateReview className="fs-4" /> Lý do hủy:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ background: RED1_COLOR, border: "0px" }}
          className="col-12 py-3"
          onClick={handleSubmit}
        >
          Gửi yêu cầu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancellationRequestModal;
