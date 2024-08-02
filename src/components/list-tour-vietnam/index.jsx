import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { RiHotelFill } from "react-icons/ri";
import { FaCar, FaStar } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { TEXT_MAIN_COLOR } from "@/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/page/customer/business-link/business-link.scss";
import LazyLoad from "react-lazyload";

const ListTourVietnam = ({ tour_category }) => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        var response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_CUSTOMER}/list-tours-filter/${tour_category}`
        );

        const sortedTours = response.data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        setTours(sortedTours);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tours", err);
        setError("Error fetching tours. Please try again.");
        setLoading(false);
      }
    };

    fetchTours();
  }, [tour_category]);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {loading ? (
        <>
          <Card
            style={{ width: "20rem", height: "25rem" }}
            className="rounded-4 p-3"
          >
            <div style={{ height: "13rem" }} className="">
              <Placeholder
                className="col-12 rounded-4"
                as="div"
                style={{ height: "13rem" }}
              />
            </div>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
          >
            {tours.slice(0, 3).map((tour) => (
              <div className="py-3 p-2">
                <LazyLoad key={tour.tour_id}>
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
                        className="rounded-4 shadow-sm p-3"
                      >
                        {tour.image && (
                          <img
                            src={`data:image/jpeg;base64,${tour.image}`}
                            alt="Tour"
                            className="rounded-4 col-12 sizei shadow mb-4"
                            loading="lazy"
                          />
                        )}
                        <div
                          style={{ fontSize: "14px", color: "#2d4271" }}
                          className="mb-2"
                        >
                          {format(new Date(tour.start_date), "dd/MM/yyyy")} -{" "}
                          {format(new Date(tour.end_date), "dd/MM/yyyy")}
                        </div>

                        <div
                          className="fw-bold mb-3 sizepp"
                          style={{ color: "#475467", fontSize: "18px" }}
                        >
                          {truncateString(tour.tour_name, 55)}
                        </div>

                        <div className="mb-2">
                          <RiHotelFill className="fs-4 text-dark" />:{" "}
                          {[...Array(tour.hotel)].map((_, index) => (
                            <FaStar key={index} className="text-warning" />
                          ))}
                          <span className="ms-4">
                            {tour.vehicle === "Máy bay" ? (
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
                          <span style={{ color: "#e01600", fontSize: "19px" }}>
                            {tour.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </LazyLoad>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ListTourVietnam;
