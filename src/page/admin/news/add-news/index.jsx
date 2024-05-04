import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../../../context";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import AddCategories from "../add-categories";
import { MdAddToPhotos } from "react-icons/md";
import { toast } from "react-toastify";


const AddNews = () => {
  const { accountId } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newscategory_id: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5020/v1/api/admin/news-categories"
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
    formDataToSend.append("account_id", accountId);
    formDataToSend.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5020/v1/api/admin/add-news",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("News posted:", response.data);
            toast.success("Thêm tin tức thành công!");
            navigate("/admin/news")
    } catch (error) {
      console.error("Failed to post news:", error);
                  toast.error("Thêm tin tức thất bại. Vui lòng điền đầy đủ thông tin !");

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
            <Link to="/admin/news">
              <IoArrowBackOutline className="fs-3 mb-3" />
            </Link>
            <Row>
              <Col></Col>
              <Col className="col-10 ">
                <h1 className="text-center text-break fw-bold font-family">
                  THÊM TIN TỨC
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <AddCategories />

          <form onSubmit={handleSubmit}>
            <Row>
              <Col className="col-12">
                <Form.Group
                  className="my-3 col-lg-6 col-12"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="font-family fw-bold">
                    Chọn danh mục:
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="font-family fw-bold">
                    Tiêu đề:
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="font-family fw-bold">
                    Ảnh tiêu đề:
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
            <div
              className=""
              style={{ width: "100%", height: "33rem", background: "white" }}
            >
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Content"
                required
                modules={AddNews.modules}
                formats={AddNews.formats}
                style={{ background: "white", height: "30rem" }}
              />
            </div>
            <div className="mt-lg-0 mt-3">
              <Button variant="warning" type="submit" className="mt-5 py-3 col-lg-2 col-12 fw-bold">
                <MdAddToPhotos className="fs-5" /> ĐĂNG BÀI
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
