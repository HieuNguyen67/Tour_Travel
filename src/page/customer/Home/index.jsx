import { motion, useAnimation } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Home.scss";
import video from "../../../assets/video/video.mp4";
import Footer from "../../../components/layout/footer";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "../../../components/layout/header";
import LinearProgress from "@mui/material/LinearProgress";
import { Link, useNavigate } from "react-router-dom";
import TabSearch from "../../../components/tab-search";
import ListTourVietnam from "../../../components/list-tour-vietnam";
import { RED1_COLOR, TEXT_RED_COLOR } from "../../../constants/color";
import head from "../../../assets/image/heading-border.png";
import { FaCircleArrowRight } from "react-icons/fa6";
import { DESTINATION_LIKE } from "../../../constants/common";

const Home = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const optimizedVideoElement = useMemo(
    () => (
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="myVideo"
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={handleVideoLoad}
      >
        <source src={video} type="video/mp4" />
      </video>
    ),
    [video]
  );
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
              <h5 className="text-center text-light mb-3">LOADING...</h5>
              <LinearProgress color="inherit" />
            </Container>
          </Container>
        </Backdrop>
      )}
      <Header />

      {optimizedVideoElement}
      <div>
        <Container className="">
          <div className="pt-lg-5 zindex">
            <div className="pt-5 me-lg-5">
              <Row className="d-flex flex-column mt-5">
                <Col className="pt-lg-5 pt-4 pt-md-5 mt-lg-5">
                  <h2 className="white fontwelcome text-warning textshadow font-family">
                    Welcome to Travel Tour
                  </h2>
                </Col>
                <Col className="">
                  <h1 className="white fonttttt fonttts textshadow font-family">
                    {" "}
                    Khám phá địa điểm du lịch yêu thích của bạn với chúng tôi
                  </h1>
                </Col>
                <Col>
                  <p className="white fontttts textshadow font-family">
                    Du lịch đến bất cứ nơi nào bạn chỉ cần liên hệ với chúng tôi
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Container>{" "}
      </div>

      <div className="boxhome col-12">
        <Container>
          <TabSearch />
          <h3 className="fw-bold mt-5 px-2 ">
            KHÁM PHÁ TOUR DU LỊCH TRONG NƯỚC
          </h3>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />

          <div className=" my-3">
            <ListTourVietnam tour_category={"Du lịch trong nước"} />
          </div>
          <p className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Link to="/list-tour-vietnam/1" className="text-decoration-none">
                <Button style={{ background: RED1_COLOR, border: "0px" }}>
                  Xem tất cả&nbsp;&nbsp;
                  <FaCircleArrowRight />
                </Button>
              </Link>
            </motion.div>
          </p>

          <h3 className="fw-bold mt-5 px-2">
            KHÁM PHÁ TOUR DU LỊCH NƯỚC NGOÀI
          </h3>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />

          <div className=" my-3">
            <ListTourVietnam tour_category={"Du lịch nước ngoài"} />
          </div>
          <p className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
              <Link to="/list-tour-foreign/2" className="text-decoration-none">
                <Button style={{ background: RED1_COLOR, border: "0px" }}>
                  Xem tất cả&nbsp;&nbsp;
                  <FaCircleArrowRight />
                </Button>
              </Link>
            </motion.div>
          </p>

          <h3 className="fw-bold mt-5 px-2">ĐỊA ĐIỂM ĐẾN YÊU THÍCH</h3>
          <img src={head} className="col-lg-1 col-3 px-2  mt-2" />
          <Row className="row-cols-5 my-4">
            {DESTINATION_LIKE.map((item) => (
              <Col className="" key={item.id}>
                <div className=" ">
                  <img src={item.image} className="imgdestination rounded-4" />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <Col className="col-12 ">
          <Footer />
        </Col>
      </div>
    </>
  );
};
export default Home;
