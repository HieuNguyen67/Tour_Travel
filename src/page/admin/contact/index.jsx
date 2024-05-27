import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../../constants/common";
import { GREEN_COLOR, YELLOW_COLOR } from "../../../constants/color";
import { Button, Container } from "react-bootstrap";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingBackdrop from "../../../components/backdrop";
import { useAuth } from "../../../context";
import { MdOutlineContactMail } from "react-icons/md";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const{token, accountId}=useAuth();
const location = useLocation();
const isHomePage = location.pathname === "/admin/contact";
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (isHomePage) {
          var response = await axios.get(`${BASE_URL}/get-contacts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          var response = await axios.get(
            `${BASE_URL}/get-contacts-business/${accountId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, [isHomePage, accountId]);
  const navigate = useNavigate();
if(isHomePage){
var handleRowClick = (params) => {
  navigate(`/admin/contact-detail/${params.row.contact_id}`);
};
}else{
  var handleRowClick = (params) => {
    navigate(`/business/contact-detail/${params.row.contact_id}`);
  };
}

if(isHomePage){ var columns = [
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
];}else{
   var columns = [
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
           >
             {params.value}
           </Button>
         );
       },
     },
    
     {
       field: "name",
       headerName: "Tour",
       width: 450,
       renderCell: (params) => (
         <div
           className="fw-bold"
           style={{ cursor: "pointer" }}
           dangerouslySetInnerHTML={{ __html: params.value }}
         />
       ),
     },
     {
       field: "fullname",
       headerName: "Tên",
       width: 150,
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
         >
           {format(new Date(params.value), "dd/MM/yyyy")}
         </span>
       ),
     },
   ];
}
 

  if (loading) return (
    <>
      <LoadingBackdrop open={loading} />
    </>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <h3 className="mb-3 fw-bold"><MdOutlineContactMail className="fs-3"/> LIÊN HỆ</h3>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.contact_id}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

export default ContactList;
