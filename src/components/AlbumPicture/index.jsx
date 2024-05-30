import "@/page/customer/Image/Image.scss";
import { motion, useAnimation } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import picture1 from "@/assets/image/picture-1.png";
import picture2 from "@/assets/image/picture-2.png";
import picture3 from "@/assets/image/picture-3.png";
import picture4 from "@/assets/image/picture-4.png";
import picture5 from "@/assets/image/picture-5.png";
import picture6 from "@/assets/image/picture-6.png";
import picture7 from "@/assets/image/picture-7.png";
import picture8 from "@/assets/image/picture-8.png";
import picture9 from "@/assets/image/picture-9.png";
import picture10 from "@/assets/image/picture-10.png";
import picture11 from "@/assets/image/picture-11.png";
import picture12 from "@/assets/image/picture-12.png";

import React from "react";

const AlbumPicture = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseOpen = () => setOpen(false);
  const slides = [
    { src: picture1 },
    { src: picture2 },
    { src: picture3 },
    { src: picture4 },
    { src: picture5 },
    { src: picture6 },
    { src: picture7 },
    { src: picture8 },
    { src: picture9 },
    { src: picture10 },
    { src: picture11 },
    { src: picture12 },

  ];
  return (
    <>
      <Lightbox
        open={open}
        close={handleCloseOpen}
        slides={slides}
        className="d-block w-100 "
      />
      <div>
       
        <Row>
          <Col className="col-lg-6 col-12 mb-lg-0 mb-1">
            {" "}
            <img
              src={picture2}
              className="sizepicture1 w-100 rounded-3 shadow  img1 "
              onClick={handleOpen}
            />
          </Col>
          <Col className="col-lg-6 col-12">
            <Row>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture1}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture3}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
            </Row>{" "}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="col-lg-6 col-12">
            <Row>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture4}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture5}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
            </Row>{" "}
          </Col>
          <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
            {" "}
            <img
              src={picture6}
              className="sizepicture1 w-100 rounded-3 shadow  img1 "
              onClick={handleOpen}
            />
          </Col>
        </Row>
        <Row className="mt-lg-3 mt-1">
          <Col className="col-lg-6 col-12 mb-lg-0 mb-1">
            {" "}
            <img
              src={picture8}
              className="sizepicture1 w-100 rounded-3 shadow  img1 "
              onClick={handleOpen}
            />
          </Col>
          <Col className="col-lg-6 col-12">
            <Row>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture7}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture9}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
            </Row>{" "}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="col-lg-6 col-12">
            <Row>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture10}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
              <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
                {" "}
                <img
                  src={picture11}
                  className="sizepicture1 w-100 rounded-3 shadow  img1"
                  onClick={handleOpen}
                />
              </Col>
            </Row>{" "}
          </Col>
          <Col className="col-lg-6 col-12  mb-lg-0 mb-1">
            {" "}
            <img
              src={picture12}
              className="sizepicture1 w-100 rounded-3 shadow  img1 "
              onClick={handleOpen}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default AlbumPicture;
