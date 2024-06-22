import { useEffect, useState } from "react";
import { BASE_URL_ADMIN, BASE_URL_BUSINESS, TEXT_RED_COLOR } from "@/constants";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaCaretSquareDown } from "react-icons/fa";
import { TEXT_MAIN_COLOR } from "@/constants";
import HTMLContent from "../HTMLContent";
import "@/page/customer/tour-detail/tour-detail.scss";

const PolicesTour = ({ businessId }) => {
  const [policies, setPolicies] = useState([]);
  const [policy_cancellation, setPolicyCancellation] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (businessId) {
          const response = await axios.get(
            `${BASE_URL_BUSINESS}/list-policies/${businessId}`
          );
          setPolicies(response.data);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [businessId]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (businessId) {
          const response = await axios.get(
            `${BASE_URL_BUSINESS}/list-policies-cancellation/${businessId}`
          );
          setPolicyCancellation(response.data);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [businessId]);

  return (
    <>
      <Row>
        <Col className="col-lg-6 col-12">
          <div className="mb-3">
            <Accordion sx={{ background: "#f9f9f9" }} className="p-lg-3">
              <AccordionSummary
                expandIcon={<FaCaretSquareDown className="fs-4" />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <span
                  className="fw-bold sizetext"
                  style={{ color: TEXT_MAIN_COLOR }}
                >
                  Lưu ý khi huỷ tour
                </span>
              </AccordionSummary>
              <AccordionDetails style={{ color: TEXT_MAIN_COLOR }}>
                {policy_cancellation.map((item, index) => (
                  <>
                    <div key={item.index}>
                      <p>
                        - Nếu huỷ chuyến du lịch trong vòng{" "}
                        <span className="fw-bold">
                          {item.days_before_departure}
                        </span>{" "}
                        ngày trước khởi hành: Hoàn{" "}
                        <span className="fw-bold">
                          {item.refund_percentage}%
                        </span>{" "}
                        giá vé
                      </p>
                    </div>
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        </Col>
        {policies.map((item) => (
          <Col className="col-lg-6 col-12" key={item.policy_id}>
            <div className="mb-3">
              <Accordion sx={{ background: "#f9f9f9" }} className="p-lg-3">
                <AccordionSummary
                  expandIcon={<FaCaretSquareDown className="fs-4" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <span
                    className="fw-bold sizetext"
                    style={{ color: TEXT_MAIN_COLOR }}
                  >
                    {item.policytype}
                  </span>
                </AccordionSummary>
                <AccordionDetails style={{ color: TEXT_MAIN_COLOR }}>
                  <HTMLContent htmlContent={item.description} />
                </AccordionDetails>
              </Accordion>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PolicesTour;
