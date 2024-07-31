import React from "react";
import axios from "axios";
import {  DARKBLUE } from "@/constants";
import { Button } from "react-bootstrap";
import { IoMdDownload } from "react-icons/io";
import excelimg from "@/assets/image/excel.png";

const DownloadExcelTemplate = () => {
  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_CUSTOMER}/download-excel-template`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Form_nhap_ds_kh.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Tải tệp Excel không thành công:", error);
    }
  };

  return (
    <div>
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
        onClick={downloadTemplate}
      >
        {" "}
        <IoMdDownload /> Tải về
      </Button>
    </div>
  );
};

export default DownloadExcelTemplate;
