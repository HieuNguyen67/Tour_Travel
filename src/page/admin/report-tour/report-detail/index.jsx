import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { BASE_URL } from "../../../../constants/common";
import LoadingBackdrop from "../../../../components/backdrop";
import { MdReport } from "react-icons/md";
import { format } from "date-fns";
import { useAuth } from "../../../../context";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { Button, Form } from "react-bootstrap";
import { BLUE_COLOR } from "../../../../constants/color";
import { FaSave } from "react-icons/fa";

const ReportDetails = () => {
  const { report_id } = useParams();
  const {token}=useAuth();
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
       `${BASE_URL}/update-status-report/${report_id}`,
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

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          <MdReport className="fs-1 text-danger mb-2" /> Chi Tiết Tố Cáo
        </Typography>
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
            style={{ background: BLUE_COLOR }}
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
