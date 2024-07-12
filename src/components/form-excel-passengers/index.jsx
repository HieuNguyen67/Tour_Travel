import React from "react";
import axios from "axios";
import { BASE_URL_CUSTOMER } from "@/constants";
import { Button } from "react-bootstrap";

const DownloadExcelTemplate = () => {
  const downloadTemplate = async () => {
    try {
      const response = await axios.get(`${BASE_URL_CUSTOMER}/download-excel-template`, {
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "passenger_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Tải tệp Excel không thành công:", error);
    }
  };

  return (
    <div>
      <Button variant="dark" onClick={downloadTemplate}>Tải xuống mẫu Excel</Button>
    </div>
  );
};

export default DownloadExcelTemplate;
