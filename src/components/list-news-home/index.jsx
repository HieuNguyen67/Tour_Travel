import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { LuClock8 } from "react-icons/lu";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HTMLContent from "../HTMLContent";
import "@/page/customer/news/news.scss";
import LazyLoad from "react-lazyload";

const ListNewsHome = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        var response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/list-news-travel/Tin tức du lịch`
        );

        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tours", err);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const navigate = useNavigate();

  const handleClick = (newsId) => {
    navigate(`/news/news-detail/${newsId}`);
  };

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {loading ? (
        <>
          <Card
            style={{ width: "20rem", height: "25rem" }}
            className="rounded-4 p-3 my-4"
          >
            <div style={{ height: "13rem" }} className="">
              <Placeholder
                className="col-12 rounded-4"
                as="div"
                style={{ height: "13rem" }}
              />
            </div>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
          >
            {news.slice(0, 3).map((item) => (
              <Col
                className=" my-lg-4 p-3"
                onClick={() => handleClick(item.news_id)}
              >
                <LazyLoad key={item.news_id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <div
                      style={{ border: "3px solid #ebecef", cursor: "pointer" }}
                      className="rounded-5 px-lg-4 p-3 shadow-sm"
                    >
                      {item.image && (
                        <img
                          src={`data:image/png;base64,${item.image}`}
                          alt="News Image"
                          className="rounded-5 col-12 sizei shadow mb-4"
                          loading="lazy"
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
          </Carousel>
        </>
      )}
    </>
  );
};

export default ListNewsHome;
