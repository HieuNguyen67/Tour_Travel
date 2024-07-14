import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Button, Col, Container, Row } from "react-bootstrap";
import HTMLContent from "@/components/HTMLContent";
import "../news.scss";
import { format } from "date-fns";
import { LuClock8 } from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import LoadingBackdrop from "@/components/backdrop";
import { BASE_URL_ADMIN, BASE_URL_USER } from "@/constants";
import newsimg from "@/assets/image/news.png";
import LazyLoad from "react-lazyload";


const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

const NewsTravel = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/news/1/Tin%20t%E1%BB%A9c%20du%20l%E1%BB%8Bch";

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [sortedNews, setSortedNews] = useState([]);

  useEffect(() => {
    let indexx = 0;
    if (!isHomePage) {
      indexx = 0;
    }
    setCurrentPage(indexx);
  }, [isHomePage]);
  const [itemsPerPage] = useState(6);
  const { news_travel } = useParams();
  const { travel_guide } = useParams();

  const fetchNews = useCallback(async () => {
    try {
      var response;
      if (isHomePage) {
        response = await axios.get(
          `${BASE_URL_USER}/list-news-travel/${news_travel}`
        );
      } else {
        response = await axios.get(
          `${BASE_URL_USER}/list-news-travel/${travel_guide}`
        );
      }
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }, [isHomePage, setNews, setLoading]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const navigate = useNavigate();
  const handleClick = (newsId) => {
    navigate(`/news/news-detail/${newsId}`);
  };

  const handlePageClick = useCallback(
    (data) => {
      const { selected } = data;
      setCurrentPage(selected);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [setCurrentPage]
  );
  useEffect(() => {
    const sorted = [...news].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setSortedNews(sorted);
  }, [news]);

  const currentNews = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedNews.slice(start, end);
  }, [currentPage, itemsPerPage, sortedNews]);

  return (
    <>
      <LoadingBackdrop open={loading} />
      <h1 className="text-center my-lg-5 my-3 fw-bold">
        <img
          src={newsimg}
          className="mb-2"
          style={{ width: "3.5rem", height: "3.5rem", objectFit: "cover" }}
        />
        {isHomePage ? <> TIN TỨC DU LỊCH</> : <> CẨM NANG DU LỊCH</>}
      </h1>
      <Row className="row-cols-3 my-4">
        {currentNews.map((item) => (
          <Col
            className="col-lg-4 col-12 mb-3 mb-lg-3"
            onClick={() => handleClick(item.news_id)}
          >
            <LazyLoad key={item.news_id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
              >
                <div
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
                    <Col className="col-6">
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
            </LazyLoad>
          </Col>
        ))}
      </Row>
      <Container>
        <ReactPaginate
          previousLabel={
            <Button variant="dark" className="mx-2">
              <FaAngleLeft />
            </Button>
          }
          nextLabel={
            <Button variant="dark" className="mx-2">
              <FaAngleRight />
            </Button>
          }
          breakLabel={"..."}
          pageCount={Math.ceil(news.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"activee"}
          pageLinkClassName={"page-item"}
        />
      </Container>
    </>
  );
};

export default NewsTravel;
