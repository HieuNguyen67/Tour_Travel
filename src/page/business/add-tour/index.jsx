import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context";
import { BASE_URL } from "../../../constants/common";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { MdEmojiTransportation } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  BLUE_COLOR,
  COLOR,
  GREEN_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "../../../constants/color";

const AddTourForm = () => {
  const { accountId, token } = useAuth();
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [tourCategories, setTourCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const [regions, setRegions] = useState([]);
      const [images, setImages] = useState([]);



  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list-vehicles/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [accountId, token]);

  useEffect(() => {
    const fetchTourCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tourcategories`);
        setTourCategories(response.data);
      } catch (error) {
        console.error("Error fetching tour categories:", error);
      }
    };

    fetchTourCategories();
  }, []);

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

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleContentChange = (description) => {
    setFormData({ ...formData, description });
  };

  const handleFileChange = (e) => {
       setImages(e.target.files);

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
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 4) {
      alert("Vui lòng chọn từ 4 hình ảnh trở lên");
      return;
    }

    const formData1 = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          formData1.append(`${key}[${index}]`, item);
        });
      } else {
        formData1.append(key, formData[key]);
      }
    }
    for (let i = 0; i < images.length; i++) {
      formData1.append("images", images[i]);
    }

    try {
      await axios.post(`${BASE_URL}/add-tours/${accountId}`, formData1, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
                      toast.success("Thêm Tour thành công!");
                            navigate("/business/list-tour");


    } catch (error) {
      console.error("Error adding tour: ", error.response.data.error);
      toast.success("Thêm Tour thất bại. Vui lòng thử lại !");
    }
  };

  return (
    <>
      <div className="shadow py-4 px-3 rounded-5 border">
        <Link to="/business/list-tour">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <h1 className="text-center fw-bold mb-lg-5 mt-3">THÊM TOUR</h1>
        <br />

        <form onSubmit={handleSubmit} className="">
          <Row>
            <Col className="col-lg-6 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <BiCategory className="fs-4" /> Chọn danh mục{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.tourcategory_id}
                  onChange={handleChange}
                  name="tourcategory_id"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {tourCategories.map((tourcategory) => (
                    <option
                      key={tourcategory.tourcategory_id}
                      value={tourcategory.tourcategory_id}
                    >
                      {tourcategory.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="col-lg-6 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <LuImagePlus className="fs-4" /> Chọn hình ảnh tour ({">"}= 4
                  ảnh) <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <MdOutlineTravelExplore className="fs-4" /> Tên Tour{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Tên Tour"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <FaRegMoneyBillAlt className="fs-4" /> Giá người lớn{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Giá người lớn"
                  type="number"
                  name="adult_price"
                  value={formData.adult_price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <FaRegMoneyBillAlt className="fs-4" /> Giá trẻ em (5 - 11
                  tuổi) <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Giá trẻ em"
                  type="number"
                  name="child_price"
                  value={formData.child_price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <FaRegMoneyBillAlt className="fs-4" /> Giá trẻ nhỏ ({"<"} 5
                  tuổi) <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Giá trẻ nhỏ"
                  type="number"
                  name="infant_price"
                  value={formData.infant_price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <RiAccountBoxLine className="fs-4" /> Số lượng hành khách{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Số lượng hành khách"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min={1}
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <BsCalendarDate className="fs-4" /> Ngày bắt đầu{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Ngày bắt đầu"
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <BsCalendarDate className="fs-4" /> Ngày kết thúc{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Control
                  placeholder="Ngày kết thúc"
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <MdEmojiTransportation className="fs-4" /> Chọn phương tiện{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.vehicle_id}
                  onChange={handleChange}
                  name="vehicle_id"
                  required
                >
                  <option value="">Chọn phương tiện</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                      {vehicle.type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              {" "}
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <FaMapLocationDot className="fs-4" /> Chọn điểm đi{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.departure_location_name}
                  onChange={handleChange}
                  name="departure_location_name"
                  required
                >
                  <option value="">Nơi khởi hành</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="col-lg-4 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <FaMapLocationDot className="fs-4" /> Chọn điểm đến{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <div>
                  {formData.destination_locations.map((destination, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Select
                        value={destination}
                        onChange={(e) =>
                          handleDestinationChange(index, e.target.value)
                        }
                        required
                      >
                        <option value="">Hãy chọn điểm đến</option>
                        {formData.tourcategory_id == 1
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
              </Form.Group>
            </Col>

            <Form.Label className="font-family fw-bold">
              <FaEdit className="fs-4" /> Nội dung{" "}
              <span className="text-danger">(*) </span>:
            </Form.Label>
            <div
              className=""
              style={{ width: "100%", height: "33rem", background: "white" }}
            >
              <ReactQuill
                name="description"
                value={formData.description}
                onChange={handleContentChange}
                required
                placeholder="Content"
                modules={AddTourForm.modules}
                formats={AddTourForm.formats}
                style={{ background: "white", height: "30rem" }}
              />
            </div>
          </Row>

          <div className="mt-lg-0 mt-4">
            <Button
              style={{ background: BLUE_COLOR, border: "0px" }}
              type="submit"
              className="mt-5 mt-lg-3 mb-4 py-3 col-lg-2 col-12 fw-bold"
            >
              Xác Nhận
            </Button>{" "}
          </div>
        </form>
      </div>
    </>
  );
};

AddTourForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
    [{ background: [] }],
    [{ color: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
  ],
};

AddTourForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "align",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
  "background",
  "color",
  "script",
  "direction",
];
export default AddTourForm;
