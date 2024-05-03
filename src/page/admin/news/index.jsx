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
          style={{ width: "100%", height: "auto", cursor: "pointer" }}
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
        switch (params.value) {
          case "Pending":
            buttonColor = "warning";
            break;
          case "Confirm":
            buttonColor = "success";
            break;
          case "Reject":
            buttonColor = "danger";
            break;
          default:
            buttonColor = "gray";
        }
        return (
          <Button variant={buttonColor} onClick={() => handleRowClick(params)}>
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
          <Button variant="dark">
            <MdAddBox className="fs-4" /> Thêm mới
          </Button>
        </Link>
      </p>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={news}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.news_id}
          getRowHeight={(params) => 100}
        />
      </div>
    </>
  );
};

export default News;