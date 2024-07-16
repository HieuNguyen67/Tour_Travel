import { motion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Home.scss";
import Footer from "@/components/layout/footer";
import { Backdrop } from "@mui/material";
import { useState} from "react";
import Header from "@/components/layout/header";
import { Link, useNavigate } from "react-router-dom";
import { GREY_COLOR, RED1_COLOR } from "@/constants";
import head from "@/assets/image/heading-border.png";
import { FaCircleArrowRight } from "react-icons/fa6";
import locationmanimg from "@/assets/image/locationman.png";
import newsimg from "@/assets/image/news.png";
import mantravelimg from "@/assets/image/vlogger.png";
import travelmanimg from "@/assets/image/travelman.png";
import React, { Suspense, lazy } from "react";
import { helix } from "ldrs";
import video from "@/assets/video/video.mp4";
import TourListBusiness from "@/components/list-tour-by-business";
import { useAuth } from "@/context";

helix.register();

const ListTourVietnam = lazy(() => import("@/components/list-tour-vietnam"));
const ListNewsHome = lazy(() => import("@/components/list-news-home"));
const TabSearch = lazy(() => import("@/components/tab-search"));
const DestinationFavourite = lazy(() =>
  import("@/components/destination-favourite")
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {customerId}= useAuth();

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
      <video
        autoPlay
        muted
        loop
        playsinline
        className="myVideo"
        src={video}
      ></video>
      <div >
        <Container className="">
          <div className="pt-lg-5 zindex ">
            <div className="pt-5 me-lg-5">
              <Row className="d-flex flex-column mt-5">
                <Col className="pt-lg-5 pt-4 pt-md-5 mt-lg-5">
                  <h2 className="white fontwelcome text-warning textshadow   ">
                    Welcome to Travel Tour
                  </h2>
                </Col>
                <Col className="">
                  <h1 className="white fonttttt fonttts textshadow   ">
                    {" "}
                    Khám phá địa điểm du lịch yêu thích của bạn với chúng tôi
                  </h1>
                </Col>
                <Col>
                  <p className="white fontttts textshadow   ">
                    Du lịch đến bất cứ nơi nào bạn chỉ cần liên hệ với chúng tôi
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Container>{" "}
      </div>
      <div className="col-12 boxhome rounded-4">
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <TabSearch />
          </Suspense>
          <TourListBusiness customerId={customerId}/>

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
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <ListTourVietnam tour_category={"Du lịch trong nước"} />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <ListTourVietnam tour_category={"Du lịch nước ngoài"} />
            </Suspense>
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
          <Suspense fallback={<div>Loading...</div>}>
            <DestinationFavourite />
          </Suspense>

          <h3 className="fw-bold mt-5 px-2">
            <img
              src={newsimg}
              className="mb-2"
              style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
            />{" "}
            BLOG MỚI NHẤT
          </h3>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />
          <Suspense fallback={<h1>Loading...</h1>}>
            <ListNewsHome />
          </Suspense>
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
