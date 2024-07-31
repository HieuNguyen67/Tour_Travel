import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HTMLContent from "@/components/HTMLContent";
import "./news-detail.scss";
import head from "@/assets/image/heading-border.png";
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { LuClock8 } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";
import { RiHome6Line } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import LinearProgress from "@mui/material/LinearProgress";

const NewsDetailCustomer = () => {
  const [news, setNews] = useState(null);
  const [cate, setCate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { news_id } = useParams();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/news-detail/${news_id}`
        );
        setNews(response.data);
        setCate(response.data[0]);

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
        <Backdrop
          open={loading}
          style={{
            zIndex: 999,
            color: "#fff",
            background: "white",
          }}
        >
          {" "}
          <Container>
            <Container>
              {" "}
              <h5 className="text-center text-dark mb-3">LOADING...</h5>
              <LinearProgress color="secondary" />
            </Container>
          </Container>
        </Backdrop>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!news) return null;
  if (!cate) return null;

  return (
    <>
      <Container className="px-lg-3">
        {error && <div>Error: {error}</div>}
        <div className="mt-3 mt-lg-0">
          <Link to="/" className="text-decoration-none text-dark ">
            <RiHome6Line className="fs-4 hover" />
          </Link>{" "}
          &nbsp;&nbsp;
          <FaAngleRight /> &nbsp;&nbsp;
          {cate.newscategory_name === "Tin tức du lịch" ? (
            <>
              <Link
                to="/news/1/Tin tức du lịch"
                className="text-decoration-none text-dark"
              >
                <span className="hover">{cate.newscategory_name}</span>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link
                to="/news/2/Cẩm nang du lịch"
                className="text-decoration-none text-dark"
              >
                <span className="hover">{cate.newscategory_name}</span>
              </Link>
            </>
          )}{" "}
          &nbsp;&nbsp;
          <FaAngleRight /> &nbsp;&nbsp;{" "}
          <span className="hover">{cate.title}</span>
        </div>
        <hr />
        {news.map((item, index) => (
          <div className="imgg" key={item.index}>
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
      </Container>
    </>
  );
};

export default NewsDetailCustomer;
