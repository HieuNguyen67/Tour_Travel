import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import HTMLContent from "../../../../components/HTMLContent";
import "../news.scss";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { LuClock8 } from "react-icons/lu";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

const NewsTravel = () => {
  const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const {news_travel}=useParams();
     const { travel_guide } = useParams();
     const location = useLocation();
     const isHomePage =
       location.pathname === "/news/1/Tin%20t%E1%BB%A9c%20du%20l%E1%BB%8Bch";
    
  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (isHomePage) {
          var response = await axios.get(
            `http://localhost:5020/v1/api/admin/list-news-travel/${news_travel}`
          );
          setNews(response.data);
          setLoading(false);
        } else {
          const response = await axios.get(
            `http://localhost:5020/v1/api/admin/list-news-travel/${travel_guide}`
          );
          setNews(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [isHomePage]);
  const navigate=useNavigate();
  const HandleClick=(props)=>{
    navigate(`/news/news-detail/${props}`);

  }
  return (
    <>
      {" "}
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1 className="text-center my-lg-5 my-3 fw-bold">
        {isHomePage ? <> TIN TỨC DU LỊCH</> : <>CẨM NANG DU LỊCH</>}
      </h1>
      <Row className="row-cols-3 my-4">
        {news.map((item) => (
          <Col
            className="col-lg-4 col-12 mb-3 mb-lg-0"
            onClick={() => HandleClick(item.news_id)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              key={item.id}
            >
              <div
                key={item.news_id}
                style={{ border: "3px solid #ebecef", cursor: "pointer" }}
                className="rounded-5 px-lg-4 p-3  shadow-sm"
              >
                {item.image && (
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt="News Image"
                    className="rounded-5 col-12 sizei shadow mb-4"
                  />
                )}
                <p
                  className="fw-bold sizep"
                  style={{ color: "#475467", fontSize: "18px" }}
                >
                  {item.title}
                </p>

                <HTMLContent
                  htmlContent={truncateString(item.content, 80)}
                  style={{ fontSize: "14px" }}
                  className="sizep1"
                />

                <Row>
                  <Col>
                    {" "}
                    <p
                      style={{ background: "#f2f4f7", fontSize: "16px" }}
                      className="text-center rounded-3 fw-bold"
                    >
                      <FiEdit /> {item.profile_name}
                    </p>
                  </Col>
                  <Col>
                    <p
                      style={{ background: "#f2f4f7", fontSize: "16px" }}
                      className="text-center rounded-3 fw-bold"
                    >
                      <LuClock8 />{" "}
                      {format(new Date(item.created_at), "dd/MM/yyyy")}
                    </p>
                  </Col>
                </Row>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NewsTravel;
