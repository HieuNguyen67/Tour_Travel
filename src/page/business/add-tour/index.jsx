import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context";
import { BASE_URL } from "@/constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import { RiHotelFill } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { MdEmojiTransportation } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdOutlineStar } from "react-icons/md";
import { MdTour } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { format } from "date-fns";
import { BLUE_COLOR, RED_COLOR } from "@/constants";
import "./add-tour.scss";
import LoadingBackdrop from "@/components/backdrop";

const AddTourForm = () => {
  const { businessId, token } = useAuth();
  const { tour_id } = useParams();
  const [error, setError] = useState(null);
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
    vehicle: "",
    hotel: "",
    tourcategory_id: "",
    departure_location_name: "",
    destination_locations: [],
  });
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);
  const [images, setImages] = useState([]);

  const location = useLocation();
  const isHomePage = location.pathname === "/business/add-tour";

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

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        if (!isHomePage) {
          const response = await axios.get(`${BASE_URL}/get-tour/${tour_id}`);
          const tour = response.data;
          setFormData({
            ...tour,
            start_date: formatDate(tour.start_date),
            end_date: formatDate(tour.end_date),
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };

    fetchTourData();
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
  const navigate = useNavigate();

  if (isHomePage) {
    var handleSubmit = async (e) => {
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
        await axios.post(`${BASE_URL}/add-tours/${businessId}`, formData1, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Thêm Tour thành công!");
        navigate("/business/list-tour");
        setLoading(false);
      } catch (error) {
        console.error("Error adding tour: ", error.response.data.error);
        toast.error("Thêm Tour thất bại. Vui lòng thử lại !");
      }
    };
  } else {
    var handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.put(
          `${BASE_URL}/update-tour/${formData.tour_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Chỉnh sửa Tour thành công!");
        navigate("/business/list-tour");
        setLoading(false);
      } catch (error) {
        console.error("Error updating tour:", error);
        toast.error("Chỉnh sửa Tour thất bại. Vui lòng thử lại !");
      }

      const data = new FormData();
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      try {
        const response = await axios.put(
          `${BASE_URL}/update-tour-images/${tour_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Tour images updated successfully:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error updating tour images:", error);
      }
    };
  }
  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        if (!isHomePage) {
          const response = await axios.get(
            `${BASE_URL}/get-all-tour-images/${tour_id}`
          );
          setImage(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tour images:", error);
        setLoading(false);
      }
    };

    fetchTourImages();
  }, [isHomePage, tour_id]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <div className="  px-3 px-lg-0 ">
        <Link to="/business/list-tour">
          <IoArrowBackOutline className="fs-3" />
        </Link>
        <h3 className="fw-bold my-3">
          <MdTour className="fs-2" />{" "}
          {isHomePage ? <>THÊM TOUR</> : <>CHỈNH SỬA TOUR</>}
        </h3>
        <br />
        <div>
          <Row className="mb-lg-4">
            {image.map((image, index) => (
              <Col key={index} className="col-lg-3 col-12">
                <img
                  src={`data:image/jpeg;base64,${image.image}`}
                  alt={`Tour ${tour_id} Image ${index + 1}`}
                  className="rounded-3 sizeimgg col-12 mb-3 mb-lg-0"
                />
              </Col>
            ))}
          </Row>
        </div>

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
              {isHomePage ? (
                <>
                  {" "}
                  <Form.Group className="mb-4">
                    <Form.Label className="font-family fw-bold">
                      <LuImagePlus className="fs-4" /> Chọn hình ảnh tour ({">"}
                      = 4 ảnh) <span className="text-danger">(*) </span>:
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  {" "}
                  <Form.Group className="mb-4">
                    <Form.Label className="font-family fw-bold">
                      <LuImagePlus className="fs-4" /> Thay đổi ảnh tour ({">"}=
                      4 ảnh) :
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </>
              )}
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
            <Col className="col-lg-6 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <MdEmojiTransportation className="fs-4" /> Chọn phương tiện{" "}
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.vehicle}
                  onChange={handleChange}
                  name="vehicle"
                  required
                >
                  <option value="null">Chọn phương tiện</option>
                  <option value="Máy bay">Máy bay</option>
                  <option value="Xe du lịch">Xe du lịch</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="col-lg-6 col-12">
              <Form.Group className="mb-4">
                <Form.Label className="font-family fw-bold">
                  <RiHotelFill className="fs-5" /> Chọn khách sạn{" "}
                  <MdOutlineStar className="text-warning fs-4" />
                  <span className="text-danger">(*) </span>:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.hotel}
                  onChange={handleChange}
                  name="hotel"
                  type="number"
                  required
                >
                  <option value="">Chọn sao khách sạn</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="0">Đi trong ngày</option>
                </Form.Select>
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
                  min={0}
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
                  min={0}
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
                  min={0}
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
                  min={today}
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
                  min={formData.start_date || today}
                />
              </Form.Group>
            </Col>

            <Col className="col-lg-6 col-12">
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
            <Col className="col-lg-6 col-12">
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
              style={{ width: "100%", height: "43rem", background: "white" }}
            >
              <ReactQuill
                name="description"
                value={formData.description}
                onChange={handleContentChange}
                required
                placeholder="Content"
                modules={AddTourForm.modules}
                formats={AddTourForm.formats}
                style={{ background: "white", height: "40rem" }}
              />
            </div>
          </Row>

          <div className="mt-lg-0 mt-4">
            <Button
              style={{ background: BLUE_COLOR, border: "0px" }}
              type="submit"
              className="mt-5 mt-lg-3 mb-4 py-3 col-lg-2 col-12 fw-bold"
            >
              <GiConfirmed className="fs-4" /> Xác Nhận
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
