import "./Image.scss";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "yet-another-react-lightbox/styles.css";
import React from "react";
import AlbumPicture from "../../../components/AlbumPicture";


const Image = () => {
  return (
    <>
   
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mb-5 pb-lg-5 pb-3 mt-5 pt-5">
          <div className=" pt-lg-5 mb-lg-5 my-4">
            <Row className="d-flex">
              <Col />
              <Col className="col-10 col-lg-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <h1
                    className="text-center fonttt "
                    style={{ textShadow: "5px 5px 4px lightgrey" }}
                  >
                    HÌNH ẢNH
                  </h1>
                </motion.div>
              </Col>
              <Col />
            </Row>
          </div>

          <AlbumPicture />
        </Container>
      </motion.div>
    </>
  );
};
export default Image;
