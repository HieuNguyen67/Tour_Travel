import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, Typography } from "@mui/material";
import { BASE_URL } from "@/constants";
import LoadingBackdrop from "@/components/backdrop";
import reportimg from "@/assets/image/report.png";
import { format } from "date-fns";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { Button, Form } from "react-bootstrap";
import { BLUE_COLOR } from "@/constants";
import { FaSave } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

const ReportDetails = () => {
  const { report_id } = useParams();
  const { token, adminId } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/report-details/${report_id}`
        );
        setReport(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report details:", error);
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, [report_id]);

  const navigate = useNavigate();
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BASE_URL}/update-status-report/${report_id}/${adminId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Report status updated successfully");
      toast.success("Cập nhật thành công!");
      navigate("/admin/report");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update Report status :", error);
      setError("Failed to update Report status ");
    }
  };
  if (loading) {
    return <LoadingBackdrop open={loading} />;
  }

  if (!report) {
    return (
      <Container>
        <Typography variant="h5">Report not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Link to="/admin/report">
        <IoArrowBackOutline className="fs-3" />
      </Link>

      <Box my={4}>
        <h3 className="fw-bold">
          <img
            src={reportimg}
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "cover",
            }}
          />{" "}
          CHI TIẾT TỐ CÁO
        </h3>
        <form>
          <Form.Group className="my-4">
            <Form.Label className="fw-bold">
              {" "}
              <RxUpdate className="fs-5" /> Trạng thái:
            </Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirm">Confirm</option>
              <option value="Reject">Reject</option>
            </Form.Control>
          </Form.Group>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            style={{ background: BLUE_COLOR, border: "0px" }}
            className="mb-3"
          >
            <FaSave /> Cập nhật
          </Button>
        </form>
        <Typography variant="body1" sx={{ lineHeight: 3 }}>
          <strong>Tour:</strong> {report.tour_name}
          <br />
          <strong>Người tố cáo:</strong> {report.account_name}
          <br />
          <strong>SĐT:</strong> {report.phone_number} <br />
          <strong>Loại tố cáo:</strong> {report.type_report} <br />
          <strong>Mô tả:</strong> {report.description} <br />
          <strong>Ngày tố cáo:</strong>{" "}
          <span className="text-primary fw-bold">
            {format(new Date(report.reportdate), "dd/MM/yyyy")}
          </span>
          <br />
          <strong>Tên doanh nghiệp:</strong> {report.nameaccounttour}
        </Typography>
      </Box>
    </>
  );
};

export default ReportDetails;
