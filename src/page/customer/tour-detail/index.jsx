import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/common";
import { Link, useParams } from "react-router-dom";
import HTMLContent from "../../../components/HTMLContent";
import { Button, Col, Container, Row } from "react-bootstrap";
import LoadingBackdrop from "../../../components/backdrop";
import { FaAngleRight } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";
import {
  GREY_COLOR,
  RED1_COLOR,
  RED_COLOR,
  TEXT_RED_COLOR,
} from "../../../constants/color";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import "./tour-detail.scss";
import { LuCalendarDays } from "react-icons/lu";
import { MdEmojiTransportation } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

const TourDetail = () => {
  const { tour_id } = useParams();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-tour/${tour_id}`);
        setTour(response.data);
        setDestination(response.data.destination_locations.join(", "));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };

    fetchTourData();
  }, [tour_id]);

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get-all-tour-images/${tour_id}`
        );
        setImage(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour images:", error);
        setLoading(false);
      }
    };

    fetchTourImages();
  }, [tour_id]);

  const  formatDate=(dateString)=> {
   const date = new Date(dateString);
   const options = { year: "numeric", month: "long", day: "numeric" };
   return date.toLocaleDateString("vi-VN", options);
  }

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <Container className="mt-5 pt-5 ">
        <div className="mt-lg-3">
          {" "}
          <Link to="/" className="text-decoration-none text-dark ">
            <RiHome6Line className="fs-4 hover" />
          </Link>{" "}
          &nbsp;&nbsp;
          <FaAngleRight /> &nbsp;&nbsp;
          {tour.tourcategory_id === 1 ? (
            <>
              <Link
                to="/list-tour-vietnam/1"
                className="text-decoration-none text-dark"
              >
                <span className="hover">Du lịch trong nước</span>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/list-tour-foreign/2"
                className="text-decoration-none text-dark"
              >
                <span className="hover">Du lịch nước ngoài</span>
              </Link>
            </>
          )}{" "}
          &nbsp;&nbsp;
          <FaAngleRight /> &nbsp;&nbsp;{" "}
          <span className="hover">{tour.name}</span>
        </div>
        <hr />
        <div className="mt-3">
          <Row>
            <Col className="col-12">
              <h2 className="fw-bold">{tour.name}</h2>
              <p className="mt-3">
                <span
                  style={{ color: TEXT_RED_COLOR }}
                  className="fs-3 fw-bold"
                >
                  {formatPrice(tour.adult_price)}
                </span>
                / khách
              </p>
            </Col>
            <Col className="col-12">
              <Button
                className="col-lg-2 col-12 me-2 py-3 mb-2 mb-lg-0"
                style={{ background: RED1_COLOR, border: "0px" }}
              >
                <MdOutlineShoppingCartCheckout className="fs-4" /> Đặt ngay
              </Button>
              <Button
                className="col-lg-2 col-12  py-3"
                style={{ background: GREY_COLOR, border: "0px" }}
              >
                Liên hệ tư vấn
              </Button>
            </Col>
          </Row>
          <div>
            <Row className="my-4">
              <Col className="col-lg-6 col-12">
                {image[0] && (
                  <img
                    src={`data:image/jpeg;base64,${image[0].image}`}
                    alt={`Tour ${tour_id} Image 1`}
                    className="rounded-3 shadow sizeimg1 col-12 mb-3 mb-lg-0"
                  />
                )}
              </Col>
              <Col className="col-lg-6 col-12">
                <Row className="d-flex flex-column">
                  <Col className="mb-lg-3">
                    <Row>
                      <Col className="col-lg-6 col-12">
                        {" "}
                        {image[1] && (
                          <img
                            src={`data:image/jpeg;base64,${image[1].image}`}
                            alt={`Tour ${tour_id} Image 1`}
                            className="rounded-3 shadow sizeimg2 col-12 mb-3 mb-lg-0"
                          />
                        )}
                      </Col>
                      <Col className="col-lg-6 col-12">
                        {image[2] && (
                          <img
                            src={`data:image/jpeg;base64,${image[2].image}`}
                            alt={`Tour ${tour_id} Image 1`}
                            className="rounded-2 shadow sizeimg2 col-12 mb-3 mb-lg-0"
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    {" "}
                    {image[3] && (
                      <img
                        src={`data:image/jpeg;base64,${image[3].image}`}
                        alt={`Tour ${tour_id} Image 1`}
                        className="rounded-3 shadow sizeimg3 col-12 mb-3 mb-lg-0"
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col className="col-lg-5 col-12 ">
                <div
                  style={{ border: "3px solid #ebecef", background: "white" }}
                  className="p-4 rounded-4"
                >
                  <p>
                    <LuCalendarDays className="fs-4 text-dark" /> Ngày khởi
                    hành: &nbsp;
                    <span className="fw-bold">
                      {formatDate(tour.start_date)}
                    </span>
                  </p>
                  <p>
                    <LuCalendarDays className="fs-4 text-dark" /> Ngày kết thúc:
                    &nbsp;
                    <span className="fw-bold">{formatDate(tour.end_date)}</span>
                  </p>
                  <p>
                    <MdEmojiTransportation className="fs-4 text-dark" /> Phương
                    tiện : <span className="fw-bold">{tour.vehicle}</span>
                  </p>
                  <p>
                    <RiHotelFill className="fs-4 text-dark" /> Khách sạn :
                    &nbsp;
                    {[...Array(tour.hotel)].map((_, index) => (
                      <FaStar key={index} className="text-warning" />
                    ))}
                  </p>
                  <p>
                    <MdLocationOn className="fs-4 text-danger" /> Nơi khởi hành:{" "}
                    {tour.departure_location_name}
                  </p>
                  <p>
                    <FaMapLocationDot className="fs-4 " /> Nơi đến:{" "}
                    {destination}
                  </p>
                </div>
              </Col>
              <Col className="col-lg-7 col-12"></Col>
            </Row>
          </div>

          {/* <HTMLContent htmlContent={tour.description} /> */}
          <p>Adult Price: {tour.adult_price}</p>
          <p>Child Price: {tour.child_price}</p>
          <p>Infant Price: {tour.infant_price}</p>
          <p>Quantity: {tour.quantity}</p>
          <p>Vehicle: {tour.vehicle}</p>
          <p>Hotel: {tour.hotel}</p>
          <p>Departure Location: {tour.departure_location_name}</p>
          <p>Destination Locations: {destination}</p>
        </div>
      </Container>
    </>
  );
};
export default TourDetail;
