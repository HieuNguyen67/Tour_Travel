import React from "react";
import axios from "axios";
import {  BLUE_COLOR, DARKBLUE } from "@/constants";
import { useAuth } from "@/context";
import { Button, Col, Row } from "react-bootstrap";
import excelimg from "@/assets/image/excel.png";
import { IoMdDownload } from "react-icons/io";

const ExportPassengers = ({ tourId }) => {
    const {token}= useAuth();
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_BUSINESS}/export-list-passengers-tour/${tourId}`,
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
      console.error("Lỗi khi lấy danh sách:", error);
      alert("Không tìm thấy hành khách nào!");
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
            <Button
              style={{ background: DARKBLUE, border: "0px" }}
              onClick={handleExport}
            >
              <IoMdDownload /> Tải về
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ExportPassengers;
