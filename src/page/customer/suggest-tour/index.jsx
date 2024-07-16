import { BASE_URL_CUSTOMER, TEXT_MAIN_COLOR } from "@/constants";
import { useAuth } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { RiHotelFill } from "react-icons/ri";
import { FaCar, FaStar } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import suggestmanimg from "@/assets/image/suggestman.png";
import LoadingBackdrop from "@/components/backdrop";

const SuggestTourPage = ()=>{
      const [tours, setTours] = useState([]);
      const [loading, setLoading] = useState(true);
      const {customerId}= useAuth();
  const [page, setPage] = useState(1);
  const reviewsPerPage = 9;

      const formatPrice = (price) => {
        if (typeof price !== "number") {
          return price;
        }
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      };

      useEffect(() => {
        const fetchTours = async () => {
          try {
          if (customerId) {
              const response = await axios.get(
                `${BASE_URL_CUSTOMER}/suggest-tours/${customerId}`
              );
              setTours(response.data.suggestedTours);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching tours:", error);
             setLoading(false);
          }
        };

        fetchTours();
      }, [customerId]);

      const truncateString = (str, maxLength) => {
        if (str.length <= maxLength) {
          return str;
        }
        return str.substring(0, maxLength) + "...";
      };

       const handlePageClick = (event, value) => {
         setPage(value);
       };

       const currentItems = tours.slice(
         (page - 1) * reviewsPerPage,
         page * reviewsPerPage
       );

       if(loading) return <LoadingBackdrop open={loading} />;


    return (
      <>
        <Container className=" pt-4">
          <h3 className="fw-bold mt-5 pt-5">
            <img
              src={suggestmanimg}
              style={{
                width: "4.5rem",
                height: "4rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />{" "}
            GỢI Ý GIÀNH CHO BẠN
          </h3>
          <div className=" mt-4">
            {currentItems.length > 0 ? (
              <>
                <Row className="row-cols-3">
                  {currentItems.map((tour) => (
                    <Col className="col-lg-4 col-12 mb-3 mb-lg-3">
                      <LazyLoad key={tour.id}>
                        <Link
                          to={`/tour-details/${tour.tour_id}`}
                          className="text-decoration-none"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <div
                              style={{
                                border: "3px solid #ebecef",
                                cursor: "pointer",
                              }}
                              className="rounded-4  shadow-sm p-3"
                            >
                              {tour.image && (
                                <img
                                  src={`data:image/jpeg;base64,${tour.image}`}
                                  alt="Tour"
                                  className="rounded-4 col-12  sizei shadow mb-4"
                                />
                              )}
                              <div
                                style={{ fontSize: "14px", color: "#2d4271" }}
                                className="mb-2"
                              >
                                {format(
                                  new Date(tour.start_date),
                                  "dd/MM/yyyy"
                                )}{" "}
                                -{" "}
                                {format(new Date(tour.end_date), "dd/MM/yyyy")}
                              </div>

                              <div
                                className="fw-bold mb-3 sizepp"
                                style={{ color: "#475467", fontSize: "18px" }}
                              >
                                {truncateString(tour.tour_name, 60)}
                              </div>

                              <div className="mb-2">
                                <RiHotelFill className="fs-4 text-dark" />:{" "}
                                {[...Array(tour.hotel)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    className="text-warning"
                                  />
                                ))}
                                <span className="ms-4">
                                  {tour.vehicle == "Máy bay" ? (
                                    <>
                                      <IoAirplaneSharp className="text-dark" />
                                    </>
                                  ) : (
                                    <>
                                      <FaCar className="text-dark" />
                                    </>
                                  )}
                                </span>
                              </div>
                              <div
                                style={{ color: TEXT_MAIN_COLOR }}
                                className="mb-2"
                              >
                                Nơi khởi hành:{" "}
                                <span className="fw-bold">
                                  {tour.departure_location_name}
                                </span>
                              </div>
                              <div
                                className="fs-5 fw-bold mb-2"
                                style={{ color: "#e01600" }}
                              >
                                {formatPrice(tour.adult_price)}
                              </div>

                              <div className="text-end fw-bold">
                                <span
                                  style={{
                                    fontSize: "13px",
                                    color: TEXT_MAIN_COLOR,
                                  }}
                                  className="fw-bold text-decoration-underline"
                                >
                                  Số chỗ còn nhận:{" "}
                                </span>
                                <span
                                  style={{
                                    color: "#e01600",
                                    ontSize: "19px",
                                  }}
                                >
                                  {tour.quantity}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>{" "}
                      </LazyLoad>
                    </Col>
                  ))}
                </Row>
                <Pagination
                  count={Math.ceil(tours.length / reviewsPerPage)}
                  page={page}
                  onChange={handlePageClick}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  className="my-4 d-flex justify-content-center"
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </>
    );
}
export default SuggestTourPage;