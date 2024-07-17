import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useAuth } from "@/context";
import { BASE_URL_CUSTOMER, RED1_COLOR } from "@/constants";
import { MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const RateTour = ({ customerId, tourId,code_order, show, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const{token}= useAuth();
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL_CUSTOMER}/rate-tour/${customerId}/${tourId}/${code_order}`,
        { rating, review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setError("");
      setRating(0);
      setReview("");
      handleClose();
      window.location.reload();
    } catch (error) {
      setError("Lỗi khi ghi nhận đánh giá. Vui lòng thử lại sau.");
      setMessage("");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <FaStar className="fs-3 text-warning mb-2" />
          &nbsp;ĐÁNH GIÁ CHUYẾN ĐI
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label className="mb-2 fs-5 fw-bold">
              <FaStar className="fs-4 mb-2" />
              &nbsp; Đánh giá: &nbsp;
            </Form.Label>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              
            />
          </Form.Group>
          <Form.Group controlId="review">
            <Form.Label className="mb-2 fs-5 fw-bold">
              <MdRateReview className="fs-4" />
              &nbsp; Mô tả:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={handleReviewChange}
              required
              style={{ height: "10rem" }}
            />
          </Form.Group>
          <Button
            style={{ background: RED1_COLOR, border: "0px" }}
            className="py-2 mt-3 col-12"
            type="submit"
          >
            Đánh giá
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RateTour;
