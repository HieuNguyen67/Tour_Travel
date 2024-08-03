import { Button, Col, Container, Row } from "react-bootstrap";
import head from "@/assets/image/heading-border.png";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import Header from "@/components/layout/header";
import "./business-link.scss";
import { useEffect, useState } from "react";
import LoadingBackdrop from "@/components/backdrop";
import { IoBusinessSharp } from "react-icons/io5";
import axios from "axios";
import imgdefault from "@/assets/image/6945124.png";
import businessimg from "@/assets/image/business.png";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";
import { TEXT_MAIN_COLOR } from "@/constants";

const BusinessLink = () => {
  const [loading, setLoading] = useState(true);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/get-users?role_id=3`
        );
        setAccounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <>
      <Header />

      <Container className="my-5 mx-auto pt-lg-3 pt-3 ">
        {loading && <LoadingBackdrop open={loading} />}
        <div className="mt-5">
          <h1 className="text-center fw-bold   mb-lg-5 ">
            <img
              src={businessimg}
              className="mb-2"
              style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
            />
            &nbsp;DOANH NGHIỆP
          </h1>
        </div>

        <br />
        <Row className="row-cols-3">
          {accounts.map((account) => (
            <Col className="col-lg-4  col-12 mb-lg-0 mb-3">
              <LazyLoad key={account.account_id}>
                <Link
                  to={`/tour-by-business/3/${account.business_id}`}
                  className="text-decoration-none"
                  style={{color:TEXT_MAIN_COLOR}}
                >
                  {" "}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <div className="boxborderr rounded-5 p-3 shadow-sm px-lg-4 p-3 ">
                      {account.image ? (
                        <img
                          src={`data:image/jpeg;base64,${account.image}`}
                          alt={account.name}
                          className="rounded-5 col-12 mb-4 sizei shadow"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={imgdefault}
                          alt={account.name}
                          className="rounded-5 col-12 mb-4 sizei shadow"
                          loading="lazy"
                        />
                      )}
                      <h5 className="fw-bold text-center mt-3">
                        {account.name}
                      </h5>
                    </div>
                  </motion.div>
                </Link>
              </LazyLoad>
            </Col>
          ))}
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
};
export default BusinessLink;
