import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@/context";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { ImNewspaper } from "react-icons/im";
import { GiConfirmed } from "react-icons/gi";
import { BLUE_COLOR } from "@/constants";
import { BiCategory } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineTitle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const AddNews = () => {
  const { businessId, adminId, token, role } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newscategory_id: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/news-categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch news categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, newscategory_id, image } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("content", content);
    formDataToSend.append("newscategory_id", newscategory_id);
    formDataToSend.append("image", image);

    try {
      if (role == 2 || role == 5) {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/add-news/${adminId}/${adminId}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            params: { role: 2 },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/add-news/${businessId}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            params: { role: 3 },
          }
        );
      }

      toast.success("Thêm tin tức thành công!");
      role == 2 || role == 5
        ? navigate("/admin/news")
        : navigate("/business/list-news");
    } catch (error) {
      console.error("Failed to post news:", error);
      toast.error(error.response.data.message);
      if (error.response.data.errors) {
        error.response.data.errors.forEach((errorMsg) => toast.error(errorMsg));
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className=" mx-auto">
          <div className="mt-2">
            <Link
              to={
                role == 2 || role == 5 ? "/admin/news" : "/business/list-news"
              }
            >
              <IoArrowBackOutline className="fs-3" />
            </Link>

            <h3 className=" text-break fw-bold   my-3">
              <ImNewspaper className="fs-3" /> THÊM TIN TỨC
            </h3>
          </div>
        </Container>
        <Container className="mb-5 pb-md-5">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col className="col-12">
                <Form.Group
                  className="my-4 col-lg-6 col-12"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="  fw-bold">
                    <BiCategory className="fs-4" /> Chọn danh mục{" "}
                    <span className="text-danger">(*) </span>:
                  </Form.Label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    name="newscategory_id"
                    value={formData.newscategory_id}
                    onChange={handleChange}
                  >
                    <option>Chọn danh mục</option>
                    {categories.map((category) => (
                      <option
                        key={category.newscategory_id}
                        value={category.newscategory_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="  fw-bold">
                    <MdOutlineTitle className="fs-4" /> Tiêu đề{" "}
                    <span className="text-danger">(*) </span>:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Tiêu đề"
                    required
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="  fw-bold">
                    <LuImagePlus className="fs-4" /> Ảnh tiêu đề{" "}
                    <span className="text-danger">(*) </span> :
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>{" "}
            <Form.Label className="  fw-bold">
              <FaEdit className="fs-4" /> Nội dung{" "}
              <span className="text-danger">(*) </span>:
            </Form.Label>
            <div
              className=""
              style={{ width: "100%", height: "43rem", background: "white" }}
            >
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Content"
                required
                modules={AddNews.modules}
                formats={AddNews.formats}
                style={{ background: "white", height: "40rem" }}
              />
            </div>
            <div className="mt-lg-0 mt-3">
              <Button
                style={{ background: BLUE_COLOR, border: "0px" }}
                type="submit"
                className="mt-5 py-3 col-lg-2 col-12 fw-bold"
              >
                <GiConfirmed className="fs-4" /> ĐĂNG BÀI
              </Button>{" "}
            </div>
          </form>
        </Container>
      </motion.div>
    </>
  );
};

AddNews.modules = {
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

AddNews.formats = [
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

export default AddNews;
