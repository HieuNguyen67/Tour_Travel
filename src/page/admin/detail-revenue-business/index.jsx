import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { FaMoneyCheckAlt } from "react-icons/fa";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED1_COLOR,
  RED_COLOR,
  TEXT_RED_COLOR,
} from "@/constants";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const DetailRevenueBusiness = ({
  show,
  handleClose,
  account_id,
  business_id,
  month,
  year,
  revenue,
  statusPayment,
}) => {
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const { token } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (account_id) {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/account/${account_id}`,
            {
              params: { role: 3 },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setBusiness(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [account_id]);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const handleUpdatePaymentStatus = async (e) => {
    e.preventDefault();
    setLoading1(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL_ADMIN}/update-payment-status/${business_id}`,
        {
          month,
          year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      toast.success("Xác nhận thanh toán thành công!");
      handleClose(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
      setMessage(
        "Lỗi khi cập nhật trạng thái thanh toán. Vui lòng thử lại sau."
      );
    }
    setLoading1(false);
  };
  if (loading) return <p>Loading...</p>;
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <FaMoneyCheckAlt className=" fs-3" /> THANH TOÁN THÁNG {month}/{year}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {" "}
          <h5 className="mb-3 fw-bold">
            DOANH THU THÁNG {month}/{year}:{" "}
            <span className=" fw-bold text-danger fs-4">
              {formatPrice(revenue)}
            </span>
          </h5>
          {statusPayment === "Unpaid" ? (
            <>
              <Button
                style={{ background: BLUE_COLOR, border: "0px" }}
                className="col-lg-4 col-12 text-light"
              >
                CHƯA THANH TOÁN
              </Button>
            </>
          ) : (
            <Button
              style={{ background: GREEN_COLOR, border: "0px" }}
              className="col-lg-4 col-12 text-dark"
            >
              ĐÃ THANH TOÁN
            </Button>
          )}
        </div>
        <hr />
        <div>
          <h5 className="mb-3 fw-bold">THÔNG TIN THANH TOÁN DOANH NGHIỆP</h5>
          <p>
            <strong>Ngân hàng:</strong> {business.bank_name}
          </p>
          <p>
            <strong>Tên tài khoản:</strong> {business.bank_account_name}
          </p>
          <p>
            <strong>Số tài khoản:</strong> {business.bank_account_number}
          </p>
        </div>

        <div>
          {statusPayment === "Unpaid" ? (
            <>
              {" "}
              <Button
                onClick={handleUpdatePaymentStatus}
                disabled={loading1}
                style={{ background: RED1_COLOR, border: "0px" }}
                className="mb-3 py-2 col-12"
              >
                {loading1 ? (
                  <>Loading...</>
                ) : (
                  <>
                    <FaCheck className="fs-4" /> XÁC NHẬN ĐÃ THANH TOÁN CHO
                    DOANH NGHIỆP
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                className="mb-3 py-2 col-12"
                style={{ background: RED_COLOR, border: "0px" }}
              >
                Bạn đã thanh toán cho doanh nghiệp
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailRevenueBusiness;
