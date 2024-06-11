import { motion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Home.scss";
import Footer from "@/components/layout/footer";
import { Backdrop } from "@mui/material";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "@/components/layout/header";
import { Link, useNavigate } from "react-router-dom";
import TabSearch from "@/components/tab-search";
import ListTourVietnam from "@/components/list-tour-vietnam";
import { IMGHOME, RED1_COLOR } from "@/constants";
import head from "@/assets/image/heading-border.png";
import { FaCircleArrowRight } from "react-icons/fa6";
import DestinationFavourite from "@/components/destination-favourite";
import ListNewsHome from "@/components/list-news-home";
import locationmanimg from "@/assets/image/locationman.png";
import newsimg from "@/assets/image/news.png";
import mantravelimg from "@/assets/image/vlogger.png";
import travelmanimg from "@/assets/image/travelman.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { helix } from "ldrs";

helix.register();
const Home = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };
    const targetRef = useRef(null);

    const scrollToTarget = () => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };


  
  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading}
          style={{
            zIndex: 999,
            color: "#fff",
            background: "black",
          }}
        >
          {" "}
          <Container>
            <Container>
              {" "}
              <div className="text-center">
                {" "}
                <l-helix size="150" speed="1.6" color="white"></l-helix>
              </div>
            </Container>
          </Container>
        </Backdrop>
      )}
      <Header />

      <Container>
        <div className="mt-5 pt-5">
          <Row className="mt-3">
            <Col className="col-lg-5">
              {" "}
              <h2 className="mt-5 roboto-bold sizetexthome">
                CÙNG BẠN KHÁM PHÁ NHỮNG ĐIỂM ĐẾN TUYỆT VỜI
              </h2>
              <br />
              <h5 className="roboto-bold fw-bold text-secondary">
                Du lịch đến bất cứ nơi nào bạn chỉ cần liên hệ với chúng tôi
              </h5>
              <br />
              <Button
                variant="dark"
                className="fs-5 fw-bold"
                onClick={scrollToTarget}
              >
                KHÁM PHÁ NGAY
              </Button>
            </Col>
            <Col className="col-lg-7">
              {" "}

                <Carousel
                  infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              arrows={false}
                  responsive={{
                    superLargeDesktop: {
                      breakpoint: { max: 4000, min: 3000 },
                      items: 5,
                    },
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1,
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 1,
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1,
                    },
                  }}
                  
                >
                  {IMGHOME.map((item) => (
                    <div key={item.id} style={{display:'grid',placeItems:'center'}}>
                      <img
                        style={{ width: "35rem", height: "35rem" }}
                        src={item.image}
                        alt={`Tour Image ${item.id + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
            </Col>
          </Row>
        </div>
      </Container>

      <div className="col-12 mt-5" ref={targetRef}>
        <Container>
          <TabSearch />
          <Row className="fw-bold mt-5 px-2 ">
            <Col className="col-lg-1 col-3">
              {" "}
              <img
                src={mantravelimg}
                className="mb-2 "
                style={{ width: "10rem", height: "10rem" }}
              />{" "}
            </Col>
            <Col>
              <div
                style={{
                  height: "10rem",
                  placeItems: "center start",
                  display: "grid",
                }}
                className=" ms-5 fstour fw-bold"
              >
                KHÁM PHÁ TOUR DU LỊCH TRONG NƯỚC
              </div>
            </Col>
          </Row>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />

          <div className=" my-3">
            <ListTourVietnam tour_category={"Du lịch trong nước"} />
          </div>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Link to="/list-tour-vietnam/1" className="text-decoration-none">
                <Button style={{ background: RED1_COLOR, border: "0px" }}>
                  Xem tất cả&nbsp;&nbsp;
                  <FaCircleArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>

          <Row className="fw-bold mt-5 px-2 ">
            <Col className="col-lg-1 col-3">
              {" "}
              <img
                src={travelmanimg}
                className="mb-2 "
                style={{ width: "10rem", height: "10rem" }}
              />{" "}
            </Col>
            <Col>
              <div
                style={{
                  height: "10rem",
                  placeItems: "center start",
                  display: "grid",
                }}
                className="ms-lg-4 ms-5 fstour fw-bold"
              >
                KHÁM PHÁ TOUR DU LỊCH NƯỚC NGOÀI
              </div>
            </Col>
          </Row>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />

          <div className=" my-3">
            <ListTourVietnam tour_category={"Du lịch nước ngoài"} />
          </div>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Link to="/list-tour-foreign/2" className="text-decoration-none">
                <Button style={{ background: RED1_COLOR, border: "0px" }}>
                  Xem tất cả&nbsp;&nbsp;
                  <FaCircleArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>

          <Row className="fw-bold mt-5 px-2 ">
            <Col className="col-lg-1 col-3">
              {" "}
              <img
                src={locationmanimg}
                className="mb-2 "
                style={{ width: "8rem", height: "10rem" }}
              />{" "}
            </Col>
            <Col>
              <div
                style={{
                  height: "10rem",
                  placeItems: "center start",
                  display: "grid",
                }}
                className="ms-lg-4 ms-5 fstour fw-bold"
              >
                ĐỊA ĐIỂM ĐẾN YÊU THÍCH
              </div>
            </Col>
          </Row>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />
          <DestinationFavourite />

          <h3 className="fw-bold mt-5 px-2">
            <img
              src={newsimg}
              className="mb-2"
              style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
            />{" "}
            BLOG
          </h3>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />
          <ListNewsHome />
          <div className="text-center mb-5 pb-lg-5">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Link
                to="/news/1/Tin%20tức%20du%20lịch"
                className="text-decoration-none"
              >
                <Button style={{ background: RED1_COLOR, border: "0px" }}>
                  Xem tất cả&nbsp;&nbsp;
                  <FaCircleArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
        <Col className="col-12 ">
          <Footer />
        </Col>
      </div>
    </>
  );
};
export default Home;
