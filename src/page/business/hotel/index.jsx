import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../context";
import { BASE_URL } from "../../../constants/common";
import { FaStar } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { BLUE_COLOR } from "../../../constants/color";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiHotelLine } from "react-icons/ri";
import { toast } from "react-toastify";
import LoadingBackdrop from "../../../components/backdrop";



const ListHotel = () => {
    const{accountId,token}=useAuth();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
 const [selectedRows, setSelectedRows] = useState([]);
 const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list-hotels/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHotels(response.data);
                setLoading(false);

      } catch (error) {
        console.error("Error fetching hotels:", error);
                setLoading(false);

      }
    };

    fetchHotels();
  }, [accountId]);

   const renderStarIcon = (params) => {
     const { value } = params;
     return (
       <div>
         {Array.from({ length: value }).map((_, index) => (
           <FaStar key={index} className="text-warning" />
         ))}
       </div>
     );
   };
     const handleCheckboxChange = (event, row) => {
       if (event.target.checked) {
         setSelectedRows([...selectedRows, row]);
       } else {
         setSelectedRows(
           selectedRows.filter(
             (selectedRow) => selectedRow.hotel_id !== row.hotel_id
           )
         );
       }
     };
     const handleDeleteSelected = async () => {
       try {
         await Promise.all(
           selectedRows.map(async (row) => {
             await axios.delete(`${BASE_URL}/delete-hotel/${row.hotel_id}`, {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             });
             setHotels(hotels.filter((item) => item.hotel_id !== row.hotel_id));
             toast.success("Xoá thành công!");
             window.location.reload();
           })
         );
         setSelectedRows([]);
       } catch (error) {
         toast.success("Xoá thất bại. Vui lòng thử lại !");

         console.error("Failed to delete selected news:", error);
         setError("Failed to delete selected news");
       }
     };
     
     const navigate = useNavigate();

     const handleRowClick = (params) => {
       navigate(`/business/edit-hotel/${params.row.hotel_id}`);
     };

  const columns = [
    {
      field: "checkbox",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <input
          type="checkbox"
          onChange={(event) => handleCheckboxChange(event, params.row)}
          style={{ width: "18px", height: "18px" }}
        />
      ),
    },
    {
      field: "hotel_id",
      headerName: "ID",
      width: 50,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "name",
      headerName: "Tên",
      width: 300,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "star",
      headerName: "Star",
      width: 100,
      renderCell: renderStarIcon,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
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
      field: "contact_info",
      headerName: "Liên hệ",
      width: 120,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "tour_name",
      headerName: "Tour",
      width: 350,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
  ];

 

  return (
    <>
      <LoadingBackdrop open={loading} />
      <p className="text-end">
        <Button
          variant="danger"
          onClick={handleDeleteSelected}
          className="me-2"
        >
          <MdDeleteForever className="fs-4" />
        </Button>
        <Link to="/business/add-hotel">
          <Button style={{ background: BLUE_COLOR, border: "0px" }}>
            <RiHotelLine className="fs-4" /> Thêm mới
          </Button>
        </Link>
      </p>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={hotels}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.hotel_id}
        />
      </div>
    </>
  );
};

export default ListHotel;
