
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context";
import { BASE_URL } from "../../../constants/common";

const AddTourForm = () => {
  const { accountId } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    adult_price: "",
    child_price: "",
    infant_price: "",
    start_date: "",
    end_date: "",
    quantity: "",
    vehicle_id: "",
    tourcategory_id: "",
    departure_location_name: "",
    destination_locations: [], 
  });
  const [provinces, setProvinces] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDestination = () => {
    setFormData((prevState) => ({
      ...prevState,
      destination_locations: [...prevState.destination_locations, ""],
    }));
  };

  const handleDestinationChange = (index, value) => {
    const destinations = [...formData.destination_locations];
    destinations[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      destination_locations: destinations,
    }));
  };

  const handleRemoveDestination = (index) => {
    const destinations = [...formData.destination_locations];
    destinations.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      destination_locations: destinations,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/add-tours/${accountId}`, formData);
      alert("Tour added successfully!");
    } catch (error) {
      console.error("Error adding tour: ", error.response.data.error);
      alert("Error adding tour. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add New Tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tour Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adult Price:</label>
          <input
            type="number"
            name="adult_price"
            value={formData.adult_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Child Price:</label>
          <input
            type="number"
            name="child_price"
            value={formData.child_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Infant Price:</label>
          <input
            type="number"
            name="infant_price"
            value={formData.infant_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle ID:</label>
          <input
            type="text"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tour Category ID:</label>
          <input
            type="text"
            name="tourcategory_id"
            value={formData.tourcategory_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h2>Điểm đi:</h2>
          <select
            value={formData.departure_location_name}
            onChange={handleChange}
            name="departure_location_name"
            required
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.name}>
                {province.full_name}
              </option>
            ))}
          </select>
          {formData.departure_location_name && (
            <p>Selected Province: {formData.departure_location_name}</p>
          )}
        </div>
        <div>
          <h2>Điểm đến:</h2>
          {formData.destination_locations.map((destination, index) => (
            <div key={index}>
              <select
                value={destination}
                onChange={(e) => handleDestinationChange(index, e.target.value)}
                required
              >
                <option value="">Select a province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.full_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemoveDestination(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddDestination}>
            Add Destination
          </button>
        </div>

        {/* Nút submit */}
        <div>
          <button type="submit">Add Tour</button>
        </div>
      </form>
    </div>
  );
};

export default AddTourForm;
