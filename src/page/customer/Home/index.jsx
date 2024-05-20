import { motion, useAnimation } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.scss";
import video from "../../../assets/video/video.mp4"
import Footer from "../../../components/layout/footer";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "../../../components/layout/header";
import Spinner from "react-bootstrap/Spinner";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import TabSearch from "../../../components/tab-search";


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
          <TabSearch/>
          
          <h1>WELCOME</h1> <h1>WELCOME</h1> <h1>WELCOME</h1> <h1>WELCOME</h1>
        </Container>
        <Col className="col-12 ">
          <Footer />
        </Col>
      </div>
    </>
  );
};
export default Home;
