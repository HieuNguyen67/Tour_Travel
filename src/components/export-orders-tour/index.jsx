import React from "react";
import axios from "axios";
import { BASE_URL_BUSINESS, BLUE_COLOR, DARKBLUE } from "@/constants";
import { useAuth } from "@/context";
import { Button, Col, Row } from "react-bootstrap";
import excelimg from "@/assets/image/excel.png";
import { IoMdDownload } from "react-icons/io";

const ExportOrdersTour = ({ tourId }) => {
  const { token } = useAuth();
  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_BUSINESS}/export-list-orders-tour/${tourId}`,
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
      link.setAttribute("download", "Danh_sách_đơn_booking.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Lỗi khi lấy danh sách:", error);
      alert("Không tìm thấy đơn booking nào!");
    }
  };

  return (
    <>
        
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
      
    </>
  );
};

export default ExportOrdersTour;
