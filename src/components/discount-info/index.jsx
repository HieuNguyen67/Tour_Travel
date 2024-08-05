import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDiscount from "../add-discount";
import saleimg from "@/assets/image/sale.png";
import { Button, Col, Row } from "react-bootstrap";
import { TEXT_RED_COLOR } from "@/constants";
import { MdDeleteForever } from "react-icons/md";
import { formatInTimeZone } from "date-fns-tz";

const DiscountInfo = ({ tourId, adult_price, child_price, infant_price, start_date_tour }) => {
  const [discounts, setDiscounts] = useState([]);
  const [error, setError] = useState(null);

  const timeZone = "Asia/Ho_Chi_Minh";
  const today = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd");

  useEffect(() => {
    const fetchDiscounts = async () => {
         if(tourId){
      try {
       
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/discounts/${tourId}`
        );
        setDiscounts(response.data.discounts);
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "Lỗi khi lấy thông tin giảm giá."
        );
      }}
    };

    fetchDiscounts();
  }, [tourId]);
  
    const handleDeleteDiscount = async (discountId) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/delete-discounts/${discountId}`
        );
        window.location.reload();
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Lỗi khi xoá discount."
        );
      }
    };


  const calculateDiscountedPrice = (price, discount) => {
    return (price * (1 - discount / 100));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {discounts.length > 0 ? (
        <>
          <h3 className="fw-bold ">
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
            THÔNG TIN GIẢM GIÁ
          </h3>{" "}
          {discounts.map((discount) => (
            <div
              key={discount.discount_id}
              className="fw-bold rounded-4 p-3 my-3"
              style={{ background: "white", border: "2px solid black" }}
            >
              <Row className="row-cols-lg-3 row-cols-1 mt-2">
                <Col>
                  {" "}
                  <h5>
                    <span
                      className="fw-bold p-1"
                      style={{
                        border: "2px solid red",
                        color: "red",
                      }}
                    >
                      GIẢM GIÁ {discount.discount_percentage}%
                    </span>
                  </h5>
                </Col>
                <Col>
                  {" "}
                  <p>
                    <strong>Thời gian bắt đầu:</strong>{" "}
                    {new Date(discount.start_date).toLocaleDateString()}
                  </p>
                </Col>
                <Col>
                  {" "}
                  <p>
                    <strong>Thời gian kết thúc:</strong>{" "}
                    {new Date(discount.end_date).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
              <Row className="row-cols-lg-3 row-cols-1">
                <Col>
                  {" "}
                  <p>
                    <strong>Giá người lớn:</strong>{" "}
                    <span style={{ color: TEXT_RED_COLOR }} className="fw-bold">
                      {calculateDiscountedPrice(
                        adult_price,
                        discount.discount_percentage
                      )}{" "}
                      VND
                    </span>
                  </p>
                </Col>
                <Col>
                  {" "}
                  <p>
                    <strong>Giá trẻ em:</strong>{" "}
                    <span style={{ color: TEXT_RED_COLOR }} className="fw-bold">
                      {calculateDiscountedPrice(
                        child_price,
                        discount.discount_percentage
                      )}{" "}
                      VND
                    </span>
                  </p>
                </Col>
                <Col>
                  {" "}
                  <p>
                    <strong>Giá em bé:</strong>{" "}
                    <span style={{ color: TEXT_RED_COLOR }} className="fw-bold">
                      {calculateDiscountedPrice(
                        infant_price,
                        discount.discount_percentage
                      )}{" "}
                      VND
                    </span>
                  </p>
                </Col>
              </Row>
              <div style={{ display: "grid", placeItems: "end" }}>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteDiscount(discount.discount_id)}
                >
                  <MdDeleteForever className="fs-4" /> Xoá giảm giá
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {" "}
          {start_date_tour > today ? (
            <>
              {" "}
              <AddDiscount
                tourId={tourId}
                adult_price={adult_price}
                child_price={child_price}
                infant_price={infant_price}
                start_date_tour={start_date_tour}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default DiscountInfo;
