import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_ADMIN, BASE_URL_USER } from "@/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Placeholder } from "react-bootstrap";
import LoadingBackdrop from "@/components/backdrop";
import { FaAngleRight } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";
import {
  BORDER,
  GREY_COLOR,
  RED1_COLOR,
  RED_COLOR,
  TEXT_RED_COLOR,
} from "@/constants";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import "./tour-detail.scss";
import { LuCalendarDays } from "react-icons/lu";
import { MdEmojiTransportation } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiPriceTag } from "react-icons/gi";
import { IoManSharp } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import TourImagesCarousel from "@/components/image-tour-multi-carousel";
import HTMLContent from "@/components/HTMLContent";
import PolicesTour from "@/components/policies-tour";
import TourReviews from "@/components/rating-tour";
import { Box, Rating } from "@mui/material";
import { MdOutlineBusinessCenter } from "react-icons/md";
import TourListBusiness from "@/components/list-tour-by-business";
import ReportTour from "@/components/report-tour";
import { useAuth } from "@/context";
import ContactModal from "@/components/contact-business";
import picturetourimg from "@/assets/image/picturetour.png";
import scheduleimg from "@/assets/image/schedule.png";
import ratingimg from "@/assets/image/feedback.png";
import policyimg from "@/assets/image/policy.png";
import tourimg from "@/assets/image/tour.png";

const TourDetail = () => {
  const { tour_id } = useParams();
  const { accountId, customerId } = useAuth();
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [image, setImage] = useState([]);
  const [destination, setDestination] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/get-tour/${tour_id}`
        );
        setTour(response.data);
        setDestination(response.data.destination_location_name.join(", "));
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
          `${BASE_URL_USER}/get-all-tour-images/${tour_id}`
        );
        setImage(response.data);
        setLoading1(false);
      } catch (error) {
        console.error("Error fetching tour images:", error);
        setLoading1(false);
      }
    };

    fetchTourImages();
  }, [tour_id]);

  const tourCode = tour.tour_code;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/get-ratings-tour/${tourCode}`
        );
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tourCode]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/booking-tour/${tour_id}`);
  };

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Container className="mt-5 pt-5 ">
        <div className="mt-lg-3">
          <Link to="/" className="text-decoration-none text-dark ">
            <RiHome6Line className="fs-4 hover" />
          </Link>
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
              <Link
                to="/list-tour-foreign/2"
                className="text-decoration-none text-dark"
              >
                <span className="hover">Du lịch nước ngoài</span>
              </Link>
            </>
          )}
          &nbsp;&nbsp;
          <FaAngleRight /> &nbsp;&nbsp;{" "}
          <span className="hover">{tour.name}</span>
        </div>
        <hr />
        <div className="mt-3">
          <Row>
            <Col className="col-12">
              <h2 className="fw-bold">{tour.name}</h2>
              <Row>
                <Col className="col-10">
                  {" "}
                  <Box display="flex" alignItems="center">
                    {totalRatings !== 0 ? (
                      <>
                        <span className="fs-5 fw-bold text-decoration-underline">
                          {averageRating}&nbsp;
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <Rating
                      value={parseFloat(averageRating)}
                      precision={0.1}
                      readOnly
                      className="text-warning"
                    />
                    <span>&nbsp;({totalRatings} lượt đánh giá)</span>
                  </Box>
                </Col>
                <Col>
                  <ReportTour accountId={customerId} tourId={tour_id} />
                </Col>
              </Row>
              <p className="">
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
                onClick={handleClick}
                className="col-lg-2 col-12 me-2 py-3 mb-2 mb-lg-0"
                style={{ background: RED1_COLOR, border: "0px" }}
              >
                <MdOutlineShoppingCartCheckout className="fs-4" /> Đặt ngay
              </Button>

              <ContactModal accountId={tour.business_id} tourId={tour_id} />
            </Col>
          </Row>
          <div>
            <Row className="my-4">
              <Col className="col-lg-6 col-12">
                {loading1 ? (
                  <Placeholder as="div" animation="wave">
                    <Placeholder className="rounded-3 sizeimg1 col-12 mb-3 mb-lg-0" />
                  </Placeholder>
                ) : (
                  image[0] && (
                    <img
                      src={`data:image/jpeg;base64,${image[0].image}`}
                      alt={`Tour ${tour_id} Image 1`}
                      className="rounded-3 shadow sizeimg1 col-12 mb-3 mb-lg-0"
                      loading="lazy"
                    />
                  )
                )}
              </Col>
              <Col className="col-lg-6 col-12">
                <Row className="d-flex flex-column">
                  <Col className="mb-lg-3">
                    <Row>
                      <Col className="col-lg-6 col-12">
                        {loading1 ? (
                          <Placeholder as="div" animation="wave">
                            <Placeholder className="rounded-3 sizeimg2 col-12 mb-3 mb-lg-0" />
                          </Placeholder>
                        ) : (
                          image[1] && (
                            <img
                              src={`data:image/jpeg;base64,${image[1].image}`}
                              alt={`Tour ${tour_id} Image 1`}
                              className="rounded-3 shadow sizeimg2 col-12 mb-3 mb-lg-0"
                              loading="lazy"
                            />
                          )
                        )}
                      </Col>
                      <Col className="col-lg-6 col-12">
                        {loading1 ? (
                          <Placeholder as="div" animation="wave">
                            <Placeholder className="rounded-3 sizeimg2 col-12 mb-3 mb-lg-0" />
                          </Placeholder>
                        ) : (
                          image[2] && (
                            <img
                              src={`data:image/jpeg;base64,${image[2].image}`}
                              alt={`Tour ${tour_id} Image 1`}
                              className="rounded-2 shadow sizeimg2 col-12 mb-3 mb-lg-0"
                              loading="lazy"
                            />
                          )
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    {loading1 ? (
                      <Placeholder as="div" animation="wave">
                        <Placeholder className="rounded-3 sizeimg3 col-12 mb-3 mb-lg-0" />
                      </Placeholder>
                    ) : (
                      image[3] && (
                        <img
                          src={`data:image/jpeg;base64,${image[3].image}`}
                          alt={`Tour ${tour_id} Image 1`}
                          className="rounded-3 shadow sizeimg3 col-12 mb-3 mb-lg-0"
                          loading="lazy"
                        />
                      )
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="pt-lg-3">
            <Row>
              <Col className="col-lg-5 col-12">
                <div
                  style={{
                    border: "3px solid #ffc107",
                    background: "white",
                  }}
                  className="p-4 rounded-4 shadow"
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
                    <span className="fw-bold">
                      {tour.departure_location_name}
                    </span>
                  </p>
                  <p className="mb-lg-4">
                    <FaMapLocationDot className="fs-4 " /> Nơi đến:{" "}
                    <span className="fw-bold">{destination}</span>
                  </p>
                  <p className="pb-lg-2">
                    <MdOutlineBusinessCenter className="fs-4 " /> Điều hành:{" "}
                    <span className="fw-bold">{tour.account_name}</span>
                  </p>
                </div>
              </Col>
              <Col className="col-lg-7 col-12 mt-3 mt-lg-0">
                <div
                  style={{
                    border: "3px solid var(--gray-600, #475467)",
                  }}
                  className="p-4 rounded-4 shadow"
                >
                  <h5 className="fw-bold">
                    <GiPriceTag className="fs-4 text-dark" /> Bảng giá tour:{" "}
                  </h5>
                  <Row className="mt-4">
                    <Col className="col-lg-5 col-7">
                      <p className="fw-bold">
                        <IoManSharp className="fs-4 text-dark" /> Loại khách
                      </p>
                      <p className="mt-4 fw-bold fontp">
                        Người lớn ({">"} 12 tuổi) :
                      </p>
                      <p className="mt-4   fw-bold fontp">
                        Trẻ em ( 5 - 11 tuổi ) :
                      </p>
                      <p className="mt-4   fw-bold fontp">
                        Trẻ nhỏ ( {"<"} 5 tuổi ) :
                      </p>
                      <p className="fw-bold mt-4 text-decoration-underline">
                        Số lượng còn nhận
                      </p>
                    </Col>
                    <Col className="col-lg-7 col-5">
                      <p className="fw-bold">
                        <FaRegMoneyBillAlt className="fs-4 text-dark" /> Giá
                        tour
                      </p>
                      <p
                        className="mt-4 fw-bold fontp"
                        style={{ color: TEXT_RED_COLOR }}
                      >
                        {formatPrice(tour.adult_price)}
                      </p>
                      <p
                        className="mt-4 fw-bold fontp"
                        style={{ color: TEXT_RED_COLOR }}
                      >
                        {formatPrice(tour.child_price)}
                      </p>
                      <p
                        className="mt-4 fw-bold fontp "
                        style={{ color: TEXT_RED_COLOR }}
                      >
                        {formatPrice(tour.infant_price)}
                      </p>
                      <p className="mt-4 fw-bold text-dark fs-5 ">
                        {" "}
                        {tour.quantity} chỗ
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <h2 className="text-center fw-bold mt-5">
            <img
              src={picturetourimg}
              className="mb-2"
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />{" "}
            HÌNH ẢNH TOUR
          </h2>
          <div className=" my-4">
            <TourImagesCarousel tourId={tour_id} />
          </div>
          <h2 className="text-center fw-bold mt-5">
            <img
              src={scheduleimg}
              className="mb-2"
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
            />{" "}
            LỊCH TRÌNH
          </h2>
          <div
            style={{
              border: "3px solid var(--gray-600, #475467)",
              background: "white",
            }}
            className="rounded-3 p-lg-5 p-4 shadow my-5"
          >
            <HTMLContent htmlContent={tour.description} />
          </div>
          <h2 className="text-center fw-bold my-5">
            <img
              src={policyimg}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />{" "}
            CHÍNH SÁCH/ QUY ĐỊNH TOUR
          </h2>
          <PolicesTour
            businessId={tour.business_id}
            category={tour.category_name}
          />
          <h4 className=" fw-bold mt-5 sizetextrate">
            <img
              src={ratingimg}
              className="mb-2 "
              style={{
                width: "4rem",
                height: "4rem",
                objectFit: "cover",
              }}
            />{" "}
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
          </h4>
          <div>
            <TourReviews tour_code={tour.tour_code} />
          </div>
          <h4 className=" fw-bold mt-5  sizetextrate">
            <img
              src={tourimg}
              style={{
                width: "4rem",
                height: "4rem",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />{" "}
            CÁC TOUR KHÁC CỦA {tour.account_name}
          </h4>
          <div className="mb-5">
            <TourListBusiness accountId={tour.business_id} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default TourDetail;
