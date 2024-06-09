import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HTMLContent from "@/components/HTMLContent";
import "./news-details.scss";
import head from "@/assets/image/heading-border.png";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { LuClock8 } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import LoadingBackdrop from "@/components/backdrop";
import { useAuth } from "@/context";
import { RxUpdate } from "react-icons/rx";
import { PiNotePencilFill } from "react-icons/pi";
import { BLUE_COLOR } from "@/constants";
import { BASE_URL } from "@/constants";

const NewsDetail = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { news_id } = useParams();
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const { token, role, adminId } = useAuth();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/news-detail/${news_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, [news_id]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/select-status-note/${news_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status: initialStatus, note: initialNote } = response.data;
        setStatus(initialStatus);
        setNote(initialNote);
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
        `${BASE_URL}/update-status-news/${news_id}/${adminId}`,
        {
          status,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("News status and note updated successfully");
      toast.success("Cập nhật thành công!");
      navigate("/admin/news");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update news status and note:", error);
      setError("Failed to update news status and note");
    }
  };

  if (loading)
    return (
      <div>
        <LoadingBackdrop open={loading} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!news) return null;

  return (
    <>
      <Link to={(role == 2 || role == 5 )? "/admin/news" : "/business/list-news"}>
        <IoArrowBackOutline className="fs-3 mb-3" />
      </Link>
      {(role == 2 || role == 5) ? (
        <>
          <div className="border shadow-sm py-3 px-3 rounded-4 mb-4">
            <h2 className="fw-bold">DUYỆT BÀI</h2>
            <Form>
              <Form.Group className="my-4">
                <Form.Label className="fw-bold">
                  {" "}
                  <RxUpdate className="fs-5" /> Trạng thái:
                </Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirm">Confirm</option>
                  <option value="Reject">Reject</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  <PiNotePencilFill className="fs-4" /> Ghi chú:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                style={{ background: BLUE_COLOR }}
                className="mb-3"
              >
                <FaSave /> Cập nhật
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <></>
      )}

      {error && <div>Error: {error}</div>}
      {news.map((item, index) => (
        <div className="imgg" key={item.index}>
          <p>Danh mục: {item.newscategory_name}</p>

          <h1 className="fw-bold">{item.title}</h1>
          <Row>
            <Col className="col-lg-2 col-6 my-3 ">
              {" "}
              <p
                style={{ background: "#f2f4f7", fontSize: "16px" }}
                className="text-center rounded-3 fw-bold "
              >
                <LuClock8 /> {format(new Date(item.created_at), "dd/MM/yyyy")}
              </p>
            </Col>
            <Col className=" col-6 my-3 ">
              {" "}
              <p
                style={{ fontSize: "16px" }}
                className="text-start rounded-3 fw-bold"
              >
                <FiEdit /> {item.profile_name}
              </p>
            </Col>
          </Row>
          <img src={head} className="col-lg-1 col-3  mb-lg-5 mb-4 mt-2" />

          <HTMLContent htmlContent={item.content} />
        </div>
      ))}
    </>
  );
};

export default NewsDetail;
