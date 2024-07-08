import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import {
  BASE_URL_ADMIN,
  BASE_URL_CUSTOMER,
  CHECKINDAILY,
  RED1_COLOR,
  YELLOW_COLOR,
} from "@/constants";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import coin from "@/assets/image/coin.png";

const CheckIn: React.FC = () => {
  const { customerId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await axios.post(
        `${BASE_URL_CUSTOMER}/daily-checkin/${customerId}`
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error: any) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div
        style={{ background: "white" }}
        className="text-center p-lg-3 shadow rounded-3 mb-4"
      >
        <p className="fw-bold fs-3 text-center py-4">ĐIỂM DANH NHẬN XU</p>
        <Row>
          {CHECKINDAILY.map((item) => (
            <Col key={item.id}>
              <div
                style={{ background: "#F5F5F5" }}
                className="rounded-3 py-2 mb-2 mb-lg-0"
              >
                <span className="fw-bold">+ {item.point}</span>
                <br />
                <span>
                  <img
                    className="my-2"
                    src={item.icon}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </span>
                <br />
                <span>{item.date}</span>
              </div>
            </Col>
          ))}
        </Row>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div className="text-center">
              {message && (
                <Alert className="mt-3" variant="success">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert className="mt-3" variant="danger">
                  {error}
                </Alert>
              )}
              <Button
                style={{ background: RED1_COLOR, border: "0px" }}
                onClick={handleCheckIn}
                className="py-3 my-3 mt-5"
              >
                Điểm danh nhận Xu
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
