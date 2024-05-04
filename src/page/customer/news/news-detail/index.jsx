import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HTMLContent from "../../../../components/HTMLContent";
import "./news-detail.scss";
import head from "../../../../assets/image/heading-border.png";
import {  Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { LuClock8 } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";

const NewsDetailCustomer = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { news_id } = useParams();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/news-detail/${news_id}`
        );
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

  
  if (loading)
    return (
      <div>
        <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!news) return null;

  return (
    <>
      <Container>
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
              <Col className="col-lg-2 col-6 my-3 ">
                {" "}
                <p
                  style={{ background: "#f2f4f7", fontSize: "16px" }}
                  className="text-center rounded-3 fw-bold"
                >
                  <FiEdit /> {item.profile_name}
                </p>
              </Col>
            </Row>
            <img src={head} className="col-lg-1 col-3  mb-lg-5 mb-4 mt-2" />

            <HTMLContent htmlContent={item.content} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default NewsDetailCustomer;
