import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/common";
import { Button, Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import { BLUE_COLOR, RED_COLOR } from "../../../constants/color";

const UpdateTourForm=()=> {
    const{tour_id}=useParams();
  const [tourData, setTourData] = useState({
    tour_id: "",
    name: "",
    description: "",
    adult_price: "",
    child_price: "",
    infant_price: "",
    start_date: "",
    end_date: "",
    quantity: "",
    vehicle: "",
    hotel: "",
    tourcategory_id: "",
    departure_location_name: "",
    destination_locations: [],
  });
    const [error, setError] = useState(null);

  const [provinces, setProvinces] = useState([]);
    const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setProvinces(response.data.data);
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
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
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
      }
    };

    fetchRegions();
  }, []);


  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-tour/${tour_id}`); 
        const tour = response.data;
        console.log(response.data);
        setTourData(tour);
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTourData();
  }, []); 
  const handleAddDestination = () => {
    setTourData((prevState) => ({
      ...prevState,
      destination_locations: [...prevState.destination_locations, ""],
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleDestinationChange = (index, value) => {
    const destinations = [...tourData.destination_locations];
    destinations[index] = value;
    setTourData((prevState) => ({
      ...prevState,
      destination_locations: destinations,
    }));
  };
 const handleRemoveDestination = (index) => {
   const destinations = [...tourData.destination_locations];
   destinations.splice(index, 1);
   setTourData((prevState) => ({
     ...prevState,
     destination_locations: destinations,
   }));
 };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/update-tour/${tourData.tour_id}`,
        tourData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={tourData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="adult_price"
        value={tourData.adult_price}
        onChange={handleInputChange}
        placeholder="Adult Price"
      />
      <input
        type="text"
        name="child_price"
        value={tourData.child_price}
        onChange={handleInputChange}
        placeholder="Child Price"
      />
      <input
        type="text"
        name="infant_price"
        value={tourData.infant_price}
        onChange={handleInputChange}
        placeholder="Infant Price"
      />
      <input
        type="text"
        name="start_date"
        value={tourData.start_date}
        onChange={handleInputChange}
        placeholder="Start Date"
      />
      <input
        type="text"
        name="end_date"
        value={tourData.end_date}
        onChange={handleInputChange}
        placeholder="End Date"
      />
      <input
        type="text"
        name="quantity"
        value={tourData.quantity}
        onChange={handleInputChange}
        placeholder="Quantity"
      />
      <input
        type="text"
        name="vehicle"
        value={tourData.vehicle}
        onChange={handleInputChange}
        placeholder="Vehicle"
      />
      <input
        type="text"
        name="hotel"
        value={tourData.hotel}
        onChange={handleInputChange}
        placeholder="Hotel"
      />
      <input
        type="text"
        name="departure_location_name"
        value={tourData.departure_location_name}
        onChange={handleInputChange}
        placeholder="Tour Category ID"
      />
      <input
        type="text"
        name="tourcategory_id"
        value={tourData.tourcategory_id}
        onChange={handleInputChange}
        placeholder="Tour Category ID"
      />
    
      <div>
        {tourData.destination_locations.map((destination, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Select
              value={destination}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
              required
            >
              <option value="">Hãy chọn điểm đến</option>
              {tourData.tourcategory_id == 1
                ? provinces.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))
                : regions.map((region) => (
                    <option key={region.iso} value={region.name}>
                      {region.name}
                    </option>
                  ))}
            </Form.Select>
            <Button
              variant="danger"
              type="button"
              onClick={() => handleRemoveDestination(index)}
            >
              <MdDeleteForever className="fs-4" />
            </Button>
          </div>
        ))}
        <Button
          style={{ background: RED_COLOR, border: "0px" }}
          type="button"
          onClick={handleAddDestination}
        >
          <MdAddLocationAlt className="fs-4" /> Thêm điểm đến
        </Button>
      </div>

      <button type="submit">Update Tour</button>
    </form>
  );
}

export default UpdateTourForm;
