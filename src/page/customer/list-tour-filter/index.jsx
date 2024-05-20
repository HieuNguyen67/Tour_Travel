import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/common";
import { Range } from "react-range";
import LoadingBackdrop from "../../../components/backdrop";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TourSearch = () => {
  const query = useQuery();
  const initialDestinationLocation = query.get("destinationLocation") || "";
  const initialTourName = query.get("tourName") || "";
  const [departureLocation, setDepartureLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState(
    initialDestinationLocation
  );
  const [tourName, setTourName] = useState(initialTourName);
  const [minAdultPrice, setMinAdultPrice] = useState(0);
  const [maxAdultPrice, setMaxAdultPrice] = useState(100000000);
  const [values, setValues] = useState([minAdultPrice, maxAdultPrice]);
  const [hotel, setHotel] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const { location } = useParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        if (location == 1) {
          var response = await axios.get(
            `${BASE_URL}/list-tours-filter?tourcategory_name=Du lịch trong nước`
          );
        } else {
          var response = await axios.get(
            `${BASE_URL}/list-tours-filter?tourcategory_name=Du lịch nước ngoài`
          );
        }

        setTours(response.data);
        filterTours(response.data, initialDestinationLocation, initialTourName);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tours", err);
        setError("Error fetching tours. Please try again.");
        setLoading(false);
      }
    };

    fetchTours();
  }, [initialDestinationLocation, initialTourName]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setProvinces(response.data.data);
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
          "https://covid-19-statistics.p.rapidapi.com/regions",
          {
            headers: {
              "X-RapidAPI-Key":
                "59cc4e63b3msh4d842910a03af33p1c1163jsn6fe5d033ef64",
              "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
            },
          }
        );
        setRegions(response.data.data);
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

  const filterTours = (tours, destinationLocation, tourName) => {
    const filtered = tours.filter((tour) => {
      return (
        (destinationLocation
          ? tour.destination_locations.includes(destinationLocation)
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
    const filtered = tours.filter((tour) => {
      const meetsMinPriceCriteria =
        !minAdultPrice || tour.adult_price >= parseFloat(minAdultPrice);
      const meetsMaxPriceCriteria =
        !maxAdultPrice || tour.adult_price <= parseFloat(maxAdultPrice);

      return (
        (departureLocation
          ? tour.departure_location_name.includes(departureLocation)
          : true) &&
        (destinationLocation
          ? tour.destination_locations.includes(destinationLocation)
          : true) &&
        meetsMinPriceCriteria &&
        meetsMaxPriceCriteria &&
        (hotel ? tour.hotel === parseInt(hotel) : true) &&
        (vehicle ? tour.vehicle.includes(vehicle) : true) &&
        (createdAt ? new Date(tour.created_at) >= new Date(createdAt) : true)
      );
    });
    setFilteredTours(filtered);
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

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <Container className="mt-5 pt-5">
        <Row>
          <Col className="col-lg-3 col-12">
            <div
              style={{ border: "1px solid #ebecef", background: "#f9f9f9" }}
              className="p-3"
            >
              <h5 className="fw-bold">
                <LuFilter className="fs-5" /> Bộ lọc tìm kiếm
              </h5>
              <h5>
                Tìm kiếm tour: {tourName} {destinationLocation}
              </h5>
              <div>
                <label>
                  Departure Location:
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
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                </label>
              </div>
              <div>
                <label>
                  Destination Location:
                  {location == 1 ? (
                    <>
                      {" "}
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
                          <option key={province.id} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    <>
                      {" "}
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
                          <option key={region.iso} value={region.name}>
                            {region.name}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  )}
                </label>
              </div>
              <div>
                <label>
                  Phương tiện:
                  <Form.Select
                    className="shadow-sm"
                    style={{ border: "3px solid #ffc107" }}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    required
                  >
                    <option value="">----Tất cả----</option>
                    <option value="Xe du lịch">Xe du lịch</option>
                    <option value="Máy bay">Máy bay</option>
                  </Form.Select>
                </label>
              </div>

              <label for="price-min">Price:</label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
                className="col-5"
              >
                <Range
                  step={1000}
                  min={0}
                  max={100000000}
                  values={values}
                  onChange={(newValues) => {
                    setValues(newValues);
                    setMinAdultPrice(newValues[0]);
                    setMaxAdultPrice(newValues[1]);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#212121a8",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        color: "red",
                        height: "20px",
                        width: "20px",
                        backgroundColor: "#5856d6",

                        borderRadius: "50%",
                        outline: "none",
                      }}
                    />
                  )}
                />
              </div>
              <div>
                {formatPrice(minAdultPrice)} - {formatPrice(maxAdultPrice)}
              </div>
              <div className="col-2">
                <label>
                  Khách sạn <FaStar className=" text-warning" />:{" "}
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
              <div>
                <label>
                  Created At:
                  <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                  />
                </label>
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
          </Col>
          <Col className="col-9"></Col>
        </Row>
      </Container>
      <div className="mt-5 pt-5">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          {filteredTours.length > 0 ? (
            <ul>
              {filteredTours.map((tour) => (
                <li key={tour.tour_id}>
                  <h2>{tour.tour_name}</h2>
                  <p>Adult Price: {tour.adult_price}</p>
                  <p>Start Date: {tour.start_date}</p>
                  <p>End Date: {tour.end_date}</p>
                  <p>Quantity: {tour.quantity}</p>
                  <p>Phương tiện: {tour.vehicle}</p>
                  <p>Hotel: {tour.hotel}</p>
                  <p>Created At: {tour.created_at}</p>
                  {tour.image && (
                    <img
                      src={`data:image/jpeg;base64,${tour.image}`}
                      alt="Tour"
                    />
                  )}
                  <p>Destinations: {tour.destination_locations.join(", ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tours found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TourSearch;
