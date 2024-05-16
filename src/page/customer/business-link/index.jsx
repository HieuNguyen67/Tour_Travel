import { Button, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import BusinessList from "./business-list";
import head from "../../../assets/image/heading-border.png"
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import Header from "../../../components/layout/header";
import "./business-link.scss";
import { useState } from "react";
import LoadingBackdrop from "../../../components/backdrop";
import { IoBusinessSharp } from "react-icons/io5";

const BusinessLink=()=>{
   const [loading, setLoading] = useState(true);

   const setLoadingState = (isLoading) => {
     setLoading(isLoading);
   };
    return (
      <>
        <Header />

        <Container className="my-5 mx-auto pt-lg-3 pt-3 ">
          {loading && <LoadingBackdrop open={loading} />}
          <div className="mt-5">
            <Row>
              <Col></Col>
              <Col className="col-10 ">
                <h1 className="text-center text-break fw-bold font-family mb-lg-5 ">
                 <IoBusinessSharp className="fs-1 mb-lg-2 mb-1"/> ĐỐI TÁC DOANH NGHIỆP
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>

          <br />
          <Row className="row-cols-3">
            <BusinessList loading={loading} setLoading={setLoadingState} />
          </Row>
          <br />
          <hr />
          <img src={head} className="col-lg-1 col-3" />

          <h4 className="fw-bold mt-4">BẠN MUỐN TRỞ THÀNH ĐỐI TÁC ?</h4>
          <Link to="/contact">
            <Button variant="warning">
              <IoIosSend />
              LIÊN HỆ VỚI CHÚNG TÔI
            </Button>
          </Link>
        </Container>
      </>
    );
}
export default BusinessLink;