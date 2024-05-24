import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/common";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaCaretSquareDown } from "react-icons/fa";
import { TEXT_MAIN_COLOR } from "../../constants/color";
import HTMLContent from "../HTMLContent";
import "../../page/customer/tour-detail/tour-detail.scss";

const PolicesTour = ({ accountId }) => {
  const [policies, setPolicies] = useState([]);

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

  return (
    <>
      <Row>
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
