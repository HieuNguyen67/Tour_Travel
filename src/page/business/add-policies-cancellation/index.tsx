import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL_ADMIN, BASE_URL_BUSINESS, RED1_COLOR } from "@/constants";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { useAuth } from "@/context";

interface PolicyCancellation {
  policy_id: number;
  days_before_departure: number;
  refund_percentage: number;
}

const AddPolicyCancellation: React.FC = () => {
  const { policy_id } = useParams();

  const [policy, setPolicy] = useState<PolicyCancellation>({
    policy_id: 0,
    days_before_departure: 0,
    refund_percentage: 0,
  });
  const [message, setMessage] = useState<string>("");
  const location = useLocation();
  const { businessId } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const isHomePage =
    location.pathname === "/business/add-policies-cancellation";

  useEffect(() => {
    const fetchPolicy = async () => {
      if (!isHomePage) {
        try {
          const response = await axios.get(
            `${BASE_URL_BUSINESS}/policies/${policy_id}`,
            { params: { role: 2 } }
          );
          setPolicy(response.data);
        } catch (error) {
          console.error("Error fetching policy:", error);
        }
      }
    };

    fetchPolicy();
  }, [policy_id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPolicy((prevPolicy) => ({
      ...prevPolicy,
      [name]: Number(value),
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (isHomePage) {
      try {
        const response = await axios.post(
          `${BASE_URL_BUSINESS}/add-policy-cancellation/${businessId}`,
          {
            days_before_departure: policy.days_before_departure,
            refund_percentage: policy.refund_percentage,
          }
        );
        setMessage(
          `Policy added successfully: ${JSON.stringify(response.data)}`
        );
        toast.success("Thêm thành công!");
        navigate("/business/list-policies-cancellation");
      } catch (error) {
        toast.error("Thêm thất bại!");

        console.error("Error adding policy:", error);
        setMessage("Error adding policy");
      }
    } else {
      try {
        const response = await axios.put<PolicyCancellation>(
          `${BASE_URL_BUSINESS}/policies/${policy_id}`,
          {
            days_before_departure: policy.days_before_departure,
            refund_percentage: policy.refund_percentage,
          }
        );
        toast.success("Cập nhật thành công!");
        navigate("/business/list-policies-cancellation");
      } catch (error) {
        toast.error("Cập nhật thất bại!");

        console.error("Error updating policy cancellation:", error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Container className=" mx-auto">
        <div className="mt-2">
          {" "}
          <Link to="/business/list-policies-cancellation">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
          <h3 className=" fw-bold my-3">
            {isHomePage ? <>THÊM CHÍNH SÁCH</> : <>CHỈNH SỬA CHÍNH SÁCH</>}
          </h3>
        </div>
      </Container>
      <br />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="daysBeforeDeparture"
            className="mb-4 col-lg-2 col-12"
          >
            <Form.Label className="fw-bold">Trước ngày khởi hành:</Form.Label>
            <Form.Control
              type="number"
              name="days_before_departure"
              value={policy.days_before_departure}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="refundPercentage" className="col-lg-2 col-12">
            <Form.Label className="fw-bold">% Hoàn tiền:</Form.Label>
            <Form.Control
              type="number"
              name="refund_percentage"
              value={policy.refund_percentage}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ background: RED1_COLOR, border: "0px" }}
            className="mt-4 py-2 col-lg-2 col-12"
            disabled={loading}
          >
            {loading ? (
              <>Loading...</>
            ) : isHomePage ? (
              <>
                <IoAddCircle /> Thêm
              </>
            ) : (
              <>
                <FaSave /> Cập nhật
              </>
            )}
          </Button>
        </Form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </>
  );
};

export default AddPolicyCancellation;
