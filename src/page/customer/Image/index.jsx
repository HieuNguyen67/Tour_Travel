import "./Image.scss";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "yet-another-react-lightbox/styles.css";
import React from "react";
import AlbumPicture from "@/components/AlbumPicture";
import Header from "@/components/layout/header";

const Image = () => {
  return (
    <>
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="my-5 mx-auto pt-lg-3 pt-3 ">
          <div className="mt-5">
            <Row>
              <Col></Col>
              <Col className="col-10 ">
                <h1 className="text-center text-break fw-bold font-family mb-lg-5 ">
                  HÌNH ẢNH
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>

          <br />

          <AlbumPicture />
        </Container>
      </motion.div>
    </>
  );
};
export default Image;
