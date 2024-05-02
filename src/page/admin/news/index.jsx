import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import "../news/news.scss"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
const formatContent = (content) => {
  if (content.length > 100) {
    return content.slice(0, 100) + "...";
  }
  return content;
};
  const columns = [
    { field: "news_id", headerName: "ID", width: 85 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={`data:image/jpeg;base64,${params.value}`} 
          alt="News Image"
          style={{ width: "100%", height: "auto" }}
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
          <Button
           
            variant={buttonColor}
          >
            {params.value}
          </Button>
        );
      },
    },
    { field: "title", headerName: "Tiêu đề", width: 250 },
    { field: "content", headerName: "Nội dung", width: 300 },
    { field: "category_name", headerName: "Danh mục", width: 150 },
    { field: "profile_name", headerName: "Người đăng", width: 200 },
    { field: "created_at", headerName: "Ngày tạo", width: 150 },
    { field: "note", headerName: "Ghi chú", width: 200 },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
        <p className="text-end">
          <Link to="/admin/register-business">
            {" "}
            <Button variant="dark">
              <MdAddBox className="fs-4" />{" "}Thêm mới
            </Button>
          </Link>
        </p>

        <div style={{ height: 500, width: "100%" ,background:'white'}}>
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

