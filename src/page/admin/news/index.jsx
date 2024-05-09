import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import "../news/news.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { BLUE_COLOR, COLOR, GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "../../../constants/color";

const News = () => {
 const [news, setNews] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5020/v1/api/admin/list-news"
        );
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/admin/news-detail/${params.row.news_id}`);
  };
   const handleRowClick1 = (params) => {
     navigate(`/admin/edit-news/${params.row.news_id}`);
   };
   const handleCheckboxChange = (event, row) => {
     if (event.target.checked) {
       setSelectedRows([...selectedRows, row]);
     } else {
       setSelectedRows(
         selectedRows.filter(
           (selectedRow) => selectedRow.news_id !== row.news_id
         )
       );
     }
   };
   const handleDeleteSelected = async () => {
     try {
       await Promise.all(
         selectedRows.map(async (row) => {
           await axios.delete(
             `http://localhost:5020/v1/api/admin/delete-news/${row.news_id}`
           );
           setNews(news.filter((item) => item.news_id !== row.news_id));
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
    { field: "news_id", headerName: "ID", width: 85 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          onClick={() => handleRowClick(params)}
          src={`data:image/jpeg;base64,${params.value}`}
          alt="News Image"
          style={{ width: "100%", height: "5rem", cursor: "pointer",objectFit:'cover' }}
          className="rounded"
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
            buttonColor = RED_COLOR;
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
      field: "title",
      headerName: "Tiêu đề",
      width: 250,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    { field: "category_name", headerName: "Danh mục", width: 150 },
    {
      field: "profile_name",
      headerName: "Người đăng",
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
      field: "created_at",
      headerName: "Ngày tạo",
      width: 110,
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
    { field: "note", headerName: "Ghi chú", width: 150 },
    {
      field: "delete",
      headerName: "Sửa",
      width: 100,
      renderCell: (params) => (
        <Button
          style={{ background: RED_COLOR, border: "0px" }}
          onClick={() => handleRowClick1(params)}
          className="fs-5"
        >
          <FaEdit />
        </Button>
      ),
    },
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <p className="text-end">
        <Button
          variant="danger"
          onClick={handleDeleteSelected}
          className="me-2"
        >
          <MdDeleteForever className="fs-4" />
        </Button>
        <Link to="/admin/add-news">
          <Button style={{ background: BLUE_COLOR, border: "0px" }}>
            <MdAddBox className="fs-4" /> Thêm mới
          </Button>
        </Link>
      </p>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={news}
          columns={columns}
          pagination
          autoPageSize
          getRowId={(row) => row.news_id}
          getRowHeight={(params) => 100}
        />
      </div>
    </>
  );
};

export default News;