import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "@/context";
import { formatInTimeZone } from "date-fns-tz";
import { Col, Row } from "react-bootstrap";
import saleimg from "@/assets/image/sale.png";
import { BLUE_COLOR, RED_COLOR, TEXT_RED_COLOR } from "@/constants";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const AddDiscount = ({
  tourId,
  adult_price,
  child_price,
  infant_price,
  start_date_tour,
}) => {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { token } = useAuth();
  const [discountedPrices, setDiscountedPrices] = useState({
    adultPrice: adult_price,
    childPrice: child_price,
    infantPrice: infant_price,
  });

  const timeZone = "Asia/Ho_Chi_Minh";
  const today = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");

  useEffect(() => {
    const discountMultiplier = 1 - discountPercentage / 100;

    setDiscountedPrices({
      adultPrice: adult_price * discountMultiplier,
      childPrice: child_price * discountMultiplier,
      infantPrice: infant_price * discountMultiplier,
    });
  }, [discountPercentage, adult_price, child_price, infant_price]);

  const handleDiscountChange = (e) => {
    setDiscountPercentage(Number(e.target.value));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddDiscount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_BUSINESS}/add-discount/${tourId}`,
        {
          discount_percentage: discountPercentage,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      toast.success("Giảm giá đã được thêm thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm giảm giá:", error);
       toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {" "}
      <div style={{ display: "grid", placeItems: "end" }}>
        <Button
          variant="contained"
          style={{ background: BLUE_COLOR, border: "0px" }}
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Ẩn Form Giảm Giá" : "Thêm Giảm Giá"}
        </Button>
      </div>
      {isFormVisible && (
        <div>
          <h3 className="fw-bold mt-3 mt-lg-0">
            {" "}
            <img
              src={saleimg}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                cursor: "pointer",
              }}
              loading="lazy"
            />{" "}
            THÊM GIẢM GIÁ
          </h3>{" "}
          <form onSubmit={handleAddDiscount}>
            <Row>
              <Col>
                <TextField
                  style={{ background: "white" }}
                  label="Tỷ lệ giảm giá (%)"
                  type="number"
                  value={discountPercentage}
                  onChange={handleDiscountChange}
                  margin="normal"
                  fullWidth
                  inputProps={{
                    min: 1,
                    max: 100,
                  }}
                  required
                />
              </Col>
              <Col>
                <TextField
                  style={{ background: "white" }}
                  label="Ngày bắt đầu"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: today,
                    max: start_date_tour,
                  }}
                  required
                />
              </Col>
              <Col>
                {" "}
                <TextField
                  style={{ background: "white" }}
                  label="Ngày kết thúc"
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: startDate,
                    max: start_date_tour,
                  }}
                  required
                />
              </Col>
            </Row>
            <Row className="mt-3 ">
              <Col className="col-lg-6 col-12">
                {" "}
                <div>
                  <h5 className="fw-bold">
                    <FaRegMoneyBillAlt className="fs-4" /> GIÁ GỐC:
                  </h5>
                  <p className="fw-bold mt-3">
                    Người lớn:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {adult_price} VND
                    </span>
                  </p>
                  <p className="fw-bold">
                    Trẻ em:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {child_price} VND
                    </span>
                  </p>
                  <p className="fw-bold">
                    Em bé:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {infant_price} VND
                    </span>
                  </p>
                </div>
              </Col>
              <Col className="col-lg-6 col-12">
                <div>
                  <h5 className="fw-bold">
                    <FaRegMoneyBillAlt className="fs-4" /> GIÁ SAU GIẢM:
                  </h5>
                  <p className="fw-bold mt-3">
                    Người lớn:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {discountedPrices.adultPrice} VND
                    </span>
                  </p>
                  <p className="fw-bold">
                    {" "}
                    Trẻ em:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {discountedPrices.childPrice} VND
                    </span>
                  </p>
                  <p className="fw-bold">
                    Em bé:{" "}
                    <span style={{ color: TEXT_RED_COLOR }}>
                      {discountedPrices.infantPrice} VND
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
            <div style={{ display: "grid", placeItems: "end" }}>
              <Button
                variant="contained"
                type="submit"
                style={{ background: RED_COLOR, border: "0px" }}
              >
                Thêm Giảm Giá
              </Button>
            </div>
          </form>
          <hr />
        </div>
      )}
    </>
  );
};

export default AddDiscount;
