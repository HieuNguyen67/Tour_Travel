import { Button, Col, Container, Row } from "react-bootstrap";
import head from "../../../assets/image/heading-border.png";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import Header from "../../../components/layout/header";
import "./business-link.scss";
import { useEffect, useState } from "react";
import LoadingBackdrop from "../../../components/backdrop";
import { IoBusinessSharp } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../../../constants/common";

const BusinessLink = () => {
  const [loading, setLoading] = useState(true);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts-with-role-3`);
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
          <Row>
            <Col></Col>
            <Col className="col-10 ">
              <h1 className="text-center text-break fw-bold font-family mb-lg-5 ">
                <IoBusinessSharp className="fs-1 mb-lg-2 mb-1" /> ĐỐI TÁC DOANH
                NGHIỆP
              </h1>
            </Col>
            <Col></Col>
          </Row>
        </div>

        <br />
        <Row className="row-cols-3">
          {accounts.map((account) => (
            <Col
              className="col-lg-4  col-12 mb-lg-0 mb-3"
              key={account.account_id}
            >
              <div className="boxborderr rounded-5 p-3 shadow-sm px-lg-4 p-3 ">
                {account.image ? (
                  <img
                    src={`data:image/jpeg;base64,${account.image}`}
                    alt={account.name}
                    className="rounded-5 col-12 mb-4 sizei shadow"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <h5 className="fw-bold text-center mt-3">{account.name}</h5>
              </div>
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
