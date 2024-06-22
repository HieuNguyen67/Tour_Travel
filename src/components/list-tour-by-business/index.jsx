import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL_ADMIN, BASE_URL_BUSINESS } from "@/constants";
import { TEXT_MAIN_COLOR } from "@/constants";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { RiHotelFill } from "react-icons/ri";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TourListBusiness = ({ accountId }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (accountId) {
          const response = await axios.get(
            `${BASE_URL_BUSINESS}/list-tours/${accountId}`
          );
          setTours(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, [accountId]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
      >
        {tours.map((tour) => (
          <div key={tour.tour_id} className="p-2 py-3">
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
                      {tour.vehicle == "Máy bay" ? (
                        <IoAirplaneSharp className="text-dark" />
                      ) : (
                        <FaCar className="text-dark" />
                      )}
                    </span>
                  </div>
                  <div style={{ color: TEXT_MAIN_COLOR }} className="mb-2">
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
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default TourListBusiness;
