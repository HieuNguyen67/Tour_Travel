import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Button, Col,Form } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";

const UpdateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { news_id } = useParams();


useEffect(() => {
  const fetchNewsDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5020/v1/api/admin/select-status-note/${news_id}`
      );
      const { title: initialTitle, content: initialContent } = response.data;
      setTitle(initialTitle);
      setContent(initialContent);
              setLoading(false);

    } catch (error) {
      console.error("Failed to fetch news details:", error);
      setError("Failed to fetch news details");
              setLoading(false);

    }
  };

  fetchNewsDetails();
}, [news_id]);
const navigate = useNavigate();

  const handleUpdate = async () => {

    try {
      await axios.put(
        `http://localhost:5020/v1/api/admin/update-news/${news_id}`,
        {
          title,
          content,
        }
      );
      console.log("News updated successfully");
                toast.success("Cập nhật thành công!");
                          navigate("/admin/news");


    } catch (error) {
      console.error("Failed to update news:", error);
      setError("Failed to update news");
                toast.success("Cập nhật thất bại. Vui lòng thử lại !");

    }
  };

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mt-2">
        <Link to="/admin/news">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
      </div>
      <Col className="col-12">
        <Form.Group className="mb-3">
          <Form.Label className="font-family fw-bold">Tiêu đề:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
      </Col>
      <Col className=" col-12">
        <Form.Group className="mb-3">
          <Form.Label className="font-family fw-bold">Nội dung:</Form.Label>
          <div style={{ background: "white" }}>
            <ReactQuill
              id="content"
              value={content}
              onChange={setContent}
              modules={UpdateNews.modules}
              formats={UpdateNews.formats}
            />
          </div>
        </Form.Group>
      </Col>

      <Button
        variant="warning"
        className="py-3 col-lg-3 col-12 "
        onClick={handleUpdate}
        disabled={loading}
      >
        <FaSave /> Cập nhật
      </Button>
      {error && <div>Error: {error}</div>}
    </>
  );
};
UpdateNews.modules = {
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

UpdateNews.formats = [
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
export default UpdateNews;
