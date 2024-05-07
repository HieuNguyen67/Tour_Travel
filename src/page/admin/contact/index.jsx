import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../../constants/common";
import { Backdrop, CircularProgress } from "@mui/material";
import { GREEN_COLOR, YELLOW_COLOR } from "../../../constants/color";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-contacts`);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);
  const navigate = useNavigate();

const handleRowClick = (params) => {
  navigate(
    `/admin/contact-detail/${params.row.contact_id}`
  );
};

  const columns = [
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
      field: "contact_id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "fullname",
      headerName: "Tên",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "phonenumber",
      headerName: "SĐT",
      width: 150,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    { field: "message", headerName: "Nội dung", width: 300 },
    {
      field: "senttime",
      headerName: "Ngày gửi",
      width: 100,
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
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 300,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
  ];

  if (loading) return (
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.contact_id}
        />
      </div>
    </>
  );
};

export default ContactList;
