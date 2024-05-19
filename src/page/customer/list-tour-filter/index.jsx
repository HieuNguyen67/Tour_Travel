import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../../constants/common";
import { Range } from "react-range";

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

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list-tours-filter?tourcategory_name=Du lịch trong nước`
        );
        setTours(response.data);
        filterTours(response.data, initialDestinationLocation, initialTourName);
      } catch (err) {
        console.error("Error fetching tours", err);
        setError("Error fetching tours. Please try again.");
      }
    };

    fetchTours();
  }, [initialDestinationLocation, initialTourName]);
  
  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterTours = (tours, destinationLocation, tourName) => {
    const filtered = tours.filter((tour) => {
      return (
        (destinationLocation
          ? tour.destination_locations.includes(destinationLocation)
          : true) &&
            (tourName ? removeDiacritics(tour.tour_name.toLowerCase()).includes(removeDiacritics(tourName.toLowerCase())) : true)
      );
    });
    setFilteredTours(filtered);
  };

  const handleSearch = () => {
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
        (tourName
          ? removeDiacritics(tour.tour_name.toLowerCase()).includes(
              removeDiacritics(tourName.toLowerCase())
            )
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
    <div className="mt-5 pt-5">
      <h1>Tour Results for: {destinationLocation}</h1>
      <div>
        <label>
          Departure Location:
          <input
            type="text"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Destination Location:
          <input
            type="text"
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Phương tiện:
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Tour Name:
          <input
            type="text"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
          />
        </label>
      </div>
      <label for="price-min">Price:</label>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
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
      <div>
        <label>
          Hotel:
          <input
            type="number"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </label>
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
      <p>Từ khoá: {tourName}</p>
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
  );
};

export default TourSearch;
