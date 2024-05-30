import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaCaretSquareDown } from "react-icons/fa";
import { TEXT_MAIN_COLOR } from "@/constants";
import HTMLContent from "../HTMLContent";
import "@/page/customer/tour-detail/tour-detail.scss";

const PolicesTour = ({ accountId }) => {
  const [policies, setPolicies] = useState([]);
  const [policy_cancellation, setPolicyCancellation] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (accountId) {
          const response = await axios.get(
            `${BASE_URL}/list-policies/${accountId}`
          );
          setPolicies(response.data);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, [accountId]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/list-policies`);
        setPolicyCancellation(response.data[0]);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

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
                  {policy_cancellation.policytype}
                </span>
              </AccordionSummary>
              <AccordionDetails style={{ color: TEXT_MAIN_COLOR }}>
                <HTMLContent htmlContent={policy_cancellation.description} />
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
