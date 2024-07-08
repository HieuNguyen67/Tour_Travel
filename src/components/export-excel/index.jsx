import React from "react";
import axios from "axios";
import { BASE_URL_BUSINESS, BLUE_COLOR } from "@/constants";
import { useAuth } from "@/context";
import { Button, Col, Row } from "react-bootstrap";
import excelimg from "@/assets/image/excel.png";

const ExportPassengers = ({ tourId }) => {
    const {token}= useAuth();
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_BUSINESS}/export-list-passengers-tour/${tourId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Danh_sách_hành_khách.xlsx"); 
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting passengers:", error);
      alert("Failed to export passengers. Please try again.");
    }
  };

  return (
    <>
      <div style={{ display: "grid", placeItems: "end" }}>
        <Row>
          <Col>
            <img
              src={excelimg}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />
            <Button variant="dark" onClick={handleExport}>
              Xuất DS Đoàn
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ExportPassengers;
