import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { BASE_URL_ADMIN, BASE_URL_CUSTOMER, BASE_URL_USER, TEXT_RED_COLOR } from "@/constants";
import LoadingBackdrop from "@/components/backdrop";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { FaFilter } from "react-icons/fa6";
import { BLUE_COLOR, RED_COLOR, TEXT_MAIN_COLOR } from "@/constants";
import "../news/news.scss";
import { format } from "date-fns";
import { RiHotelFill } from "react-icons/ri";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";
import { motion } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import LazyLoad from "react-lazyload";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TourSearch = () => {
  const query = useQuery();
  const initialDestinationLocation = query.get("destinationLocation") || "";
    const initialDepartureLocation = query.get("departureLocation") || "";
  const initialTourName = query.get("tourName") || "";
  const [departureLocation, setDepartureLocation] = useState(
    initialDepartureLocation
  );
  const [destinationLocation, setDestinationLocation] = useState(
    initialDestinationLocation
  );
  const [tourName, setTourName] = useState(initialTourName);
  const [minAdultPrice, setMinAdultPrice] = useState(0);
  const [maxAdultPrice, setMaxAdultPrice] = useState(100000000);
  const [values, setValues] = useState([minAdultPrice, maxAdultPrice]);
  const [hotel, setHotel] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [start_date, setStartdate] = useState("");
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
    const [filteredSuggestTours, setFilteredSuggestTours] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [message, setMessage]= useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { location } = useParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        if (location == 1) {
          var response = await axios.get(
            `${BASE_URL_CUSTOMER}/list-tours-filter?tourcategory_name=Du lịch trong nước`
          );
        } else {
          var response = await axios.get(
            `${BASE_URL_CUSTOMER}/list-tours-filter?tourcategory_name=Du lịch nước ngoài`
          );
        }
        setLoading1(false);

        const sortedTours = response.data.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        setTours(sortedTours);
        filterTours(
          sortedTours,
          initialDestinationLocation,
          initialDepartureLocation,
          initialTourName
        );
      } catch (err) {
        setLoading1(false);
        console.error("Error fetching tours", err);
        setError("Error fetching tours. Please try again.");
      }
    };

    fetchTours();
  }, [initialDestinationLocation,initialDepartureLocation, initialTourName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/locations?location_type=nội địa`
        );
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/locations?location_type=nước ngoài`
        );
        setRegions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterTours = (tours, destinationLocation,departureLocation, tourName) => {
    const filtered = tours.filter((tour) => {
      return (
        (departureLocation
          ? tour.location_departure_id === parseInt(departureLocation)
          : true) &&
        (destinationLocation
          ? tour.destination_locations.includes(parseInt(destinationLocation))
          : true) &&
        (tourName
          ? removeDiacritics(tour.tour_name.toLowerCase()).includes(
              removeDiacritics(tourName.toLowerCase())
            )
          : true)
      );
    });
    setFilteredTours(filtered);
  };

  
const handleSearch = () => {
  setTourName("");
   setMessage("");
  const filtered = tours.filter((tour) => {
    const meetsMinPriceCriteria =
      !minAdultPrice || tour.adult_price >= parseFloat(minAdultPrice);
    const meetsMaxPriceCriteria =
      !maxAdultPrice || tour.adult_price <= parseFloat(maxAdultPrice);
    const matchesDepartureLocation = departureLocation
      ? tour.location_departure_id === parseInt(departureLocation)
      : true;
    const matchesDestinationLocation = destinationLocation
      ? tour.destination_locations.includes(parseInt(destinationLocation))
      : true;
    const matchesHotel = hotel ? tour.hotel === parseInt(hotel) : true;
    const matchesVehicle = vehicle ? tour.vehicle.includes(vehicle) : true;
    const matchesStartDate = start_date
      ? new Date(tour.start_date) >= new Date(start_date)
      : true;

    return (
      matchesDepartureLocation &&
      matchesDestinationLocation &&
      meetsMinPriceCriteria &&
      meetsMaxPriceCriteria &&
      matchesHotel &&
      matchesVehicle &&
      matchesStartDate
    );
  });

  if (filtered.length === 0) {
    setMessage(
      <>
        <p
          style={{ background: "#f2dede", color: TEXT_RED_COLOR }}
          className="text-center py-5 fw-bold shadow-sm"
        >
          Không tìm thấy du lịch{" "}
          <span className="fs-5">{destinationLocationName}</span> khởi hành từ{" "}
          <span className="fs-5">{departureLocationName}</span> mà bạn yêu cầu!
        </p>
        <hr />
        <p className="fw-bold fs-3">GỢI Ý TOUR LIÊN QUAN</p>
      </>
    );
    const related = tours.filter((tour) => {
          const meetsMinPriceCriteria =
            !minAdultPrice || tour.adult_price >= parseFloat(minAdultPrice);
          const meetsMaxPriceCriteria =
            !maxAdultPrice || tour.adult_price <= parseFloat(maxAdultPrice);
      const matchesHotel = hotel ? tour.hotel === parseInt(hotel) : true;
      const matchesVehicle = vehicle ? tour.vehicle.includes(vehicle) : true;
      const matchesStartDate = start_date
        ? new Date(tour.start_date) >= new Date(start_date)
        : true;

      return (
        (departureLocation
          ? tour.destination_locations.includes(parseInt(departureLocation))
          : true) &&
        (destinationLocation
          ? tour.destination_locations.includes(parseInt(destinationLocation))
          : true) &&
        meetsMinPriceCriteria &&
        meetsMaxPriceCriteria &&
        matchesHotel &&
        matchesVehicle &&
        matchesStartDate
      );
    });
    setFilteredTours(related);
  } else {
    setFilteredTours(filtered);
  }

  setCurrentPage(1);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  };

  const pageCount = Math.ceil(filteredTours.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTours.slice(offset, offset + itemsPerPage);
  const today = new Date().toISOString().split("T")[0];
  const getLocationNameById = (id, locations) => {
    const location = locations.find(
      (location) => location.location_id === parseInt(id)
    );
    return location ? location.location_name : "";
  };

  const destinationLocationName =
    location == 1
      ? getLocationNameById(destinationLocation, provinces)
      : getLocationNameById(destinationLocation, regions);
      
  const departureLocationName =getLocationNameById(departureLocation, provinces);
      
  if (loading1) {
    return <LoadingBackdrop open={loading1} />;
  }
  return (
    <>
      <LoadingBackdrop open={loading} />
      <Container className="mt-5 pt-5">
        <Row className="mt-lg-3">
          <Col className="col-lg-3 col-12 mb-lg-5 mb-2">
            <div
              style={{ border: "1px solid #ebecef", background: "#f9f9f9" }}
              className="p-3"
            >
              <h5 className="fw-bold">
                <LuFilter className="fs-5" /> Bộ lọc tìm kiếm
              </h5>
              <h5
                style={{ background: "#ffc107" }}
                className="text-center p-2 mt-3 "
              >
                {tourName} {destinationLocationName}
              </h5>
              <form>
                <div>
                  <label className="fw-bold">ĐIỂM ĐI: </label>
                  <Form.Select
                    aria-label="Default select example"
                    className="shadow-sm"
                    style={{ border: "3px solid #ffc107" }}
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    required
                  >
                    <option value="">----Tất cả----</option>
                    {provinces.map((province) => (
                      <option
                        key={province.location_id}
                        value={province.location_id}
                      >
                        {province.location_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div>
                  <label className="fw-bold mt-3">ĐIỂM ĐẾN: </label>
                  {location == 1 ? (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        className="shadow-sm"
                        style={{ border: "3px solid #ffc107" }}
                        value={destinationLocation}
                        onChange={(e) => setDestinationLocation(e.target.value)}
                        required
                      >
                        <option value="">----Tất cả----</option>
                        {provinces.map((province) => (
                          <option
                            key={province.location_id}
                            value={province.location_id}
                          >
                            {province.location_name}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        className="shadow-sm"
                        style={{ border: "3px solid #ffc107" }}
                        value={destinationLocation}
                        onChange={(e) => setDestinationLocation(e.target.value)}
                        required
                      >
                        <option value="">----Tất cả----</option>
                        {regions.map((region) => (
                          <option
                            key={region.location_id}
                            value={region.location_id}
                          >
                            {region.location_name}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  )}
                </div>
                <div>
                  <label className="fw-bold mt-3">NGÀY ĐI: </label>
                  <Form.Control
                    type="date"
                    style={{ border: "3px solid #ffc107" }}
                    value={start_date}
                    onChange={(e) => setStartdate(e.target.value)}
                    min={today}
                  />
                </div>
                <div>
                  <label htmlFor="price-min" className="fw-bold mt-3">
                    GIÁ TOUR:
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "20px",
                    }}
                  >
                    <Slider
                      value={values}
                      onChange={(event, newValue) => {
                        setValues(newValue);
                        setMinAdultPrice(newValue[0]);
                        setMaxAdultPrice(newValue[1]);
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000000}
                      step={1000}
                    />
                  </div>
                  <div className="text-danger fw-bold text-center">
                    {formatPrice(minAdultPrice)}&nbsp;&nbsp; - &nbsp;&nbsp;
                    {formatPrice(maxAdultPrice)}
                  </div>
                </div>
                <div>
                  <label className="fw-bold mt-3">PHƯƠNG TIỆN: </label>
                  <Form.Select
                    className="shadow-sm"
                    style={{ border: "3px solid #ffc107" }}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    required
                  >
                    <option value="">----Tất cả----</option>
                    {location == 1 ? (
                      <>
                        <option value="Xe du lịch">Xe du lịch</option>
                      </>
                    ) : (
                      <></>
                    )}
                    <option value="Máy bay">Máy bay</option>
                  </Form.Select>
                </div>

                <div>
                  <label className="mt-3 fw-bold">
                    KHÁCH SẠN <FaStar className=" text-warning" />:{" "}
                  </label>
                  <Form.Select
                    className="shadow-sm"
                    style={{ border: "3px solid #ffc107" }}
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    required
                  >
                    <option value="">----Tất cả----</option>
                    <option value="1">1 sao</option>
                    <option value="2">2 sao</option>
                    <option value="3">3 sao</option>
                    <option value="4">4 sao</option>
                    <option value="5">5 sao</option>
                  </Form.Select>
                </div>

                <Button
                  className=" col-12 mt-4 py-2"
                  style={{ background: BLUE_COLOR, border: "0px" }}
                  onClick={handleSearch}
                >
                  <FaFilter /> Lọc
                </Button>
              </form>
            </div>
          </Col>
          <Col className="col-lg-9 col-12 mt-3 mt-lg-0">
            {filteredTours.length === 0 ? (
              <p
                style={{ background: "#f2dede", color: TEXT_RED_COLOR }}
                className="text-center py-5 fw-bold shadow-sm"
              >
                Không tìm thấy du lịch{" "}
                <span className="fs-5">{destinationLocationName}</span> khởi
                hành từ <span className="fs-5">{departureLocationName}</span> mà
                bạn yêu cầu. Vui lòng tìm kiếm tour khác!
              </p>
            ) : (
              <></>
            )}
            <div className="">
              {currentItems.length > 0 ? (
                <>
                  <p className="fw-bold fs-2 text-center">
                    {destinationLocationName && departureLocationName ? (
                      <>
                        {" "}
                        Du lịch {destinationLocationName} khởi hành từ{" "}
                        {departureLocationName}
                      </>
                    ) : destinationLocationName ? (
                      <>Du lịch {destinationLocationName}</>
                    ) : (
                      <>
                        {" "}
                        {location == 1 ? (
                          <>DU LỊCH TRONG NƯỚC</>
                        ) : (
                          <>DU LỊCH NƯỚC NGOÀI</>
                        )}
                      </>
                    )}
                  </p>
                  {message}{" "}
                  <p className="fw-bold">
                    Chúng tôi tìm thấy{" "}
                    <span style={{ color: TEXT_RED_COLOR }} className="fs-5">
                      {filteredTours.length}
                    </span>{" "}
                    tours cho Quý khách.
                  </p>
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
                                  {format(
                                    new Date(tour.end_date),
                                    "dd/MM/yyyy"
                                  )}
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
                    count={pageCount}
                    page={currentPage}
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
          </Col>
        
        </Row>
      </Container>
    </>
  );
};

export default TourSearch;
