import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../../constants/common";
import LoadingBackdrop from "../../../components/backdrop";
import { GREEN_COLOR, RED1_COLOR, YELLOW_COLOR } from "../../../constants/color";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MdReport } from "react-icons/md";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/report-list`);
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

    const navigate = useNavigate();


   const handleRowClick = (params) => {
     navigate(
       `/admin/report-detail/${params.row.report_id}`
     );
   };

  const columns = [
    {
      field: "report_id",
      headerName: "ID",
      width: 60,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 135,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        switch (params.value) {
          case "Pending":
            buttonColor = YELLOW_COLOR;
            buttonColor1 = "black";
            break;
          case "Confirm":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";
            break;
          case "Reject":
            buttonColor = RED1_COLOR;
            buttonColor1 = "white";
            break;
          default:
            buttonColor = "gray";
        }
        return (
          <Button
            className="col-12 py-2"
            style={{
              background: buttonColor,
              border: "0px",
              color: buttonColor1,
            }}
            onClick={() => handleRowClick(params)}
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "tour_name",
      headerName: "Tour",
      width: 550,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "type_report",
      headerName: "Loại",
      width: 250,
      renderCell: (params) => (
        <div
          className="fw-bold"
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "account_name",
      headerName: "Người tố cáo",
      width: 150,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },

    {
      field: "reportdate",
      headerName: "Ngày tố cáo",
      width: 200,
      renderCell: (params) => (
        <span
          className="fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => handleRowClick(params)}
        >
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
  ];

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
       <h5 className="fw-bold"><MdReport className="fs-1 text-danger"/></h5>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={reports}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row.report_id}
          />
        </div>
    </>
  );
};

export default ReportList;
