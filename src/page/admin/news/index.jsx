import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../news/news.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/constants";
import LoadingBackdrop from "@/components/backdrop";
import { useAuth } from "@/context";
import newsimg from "@/assets/image/news.png";
import addimg from "@/assets/image/add.png";
import deleteimg from "@/assets/image/delete.png";
import LazyLoad from "react-lazyload";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { token, role, businessId, adminId } = useAuth();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (role == 2 || role == 5) {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}/list-news`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          var response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}/list-news/${businessId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        const sortedNews = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setNews(sortedNews);
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
    const data = { news_id: params.row.news_id };
    {
      role == 2 || role == 5
        ? navigate(`/admin/news-detail`, { state: data })
        : navigate(`/business/news-detail`, { state: data });
    }
  };
  const handleRowClick1 = (params) => {
    const data = { news_id: params.row.news_id };
    {
      role == 2 || role == 5
        ? navigate(`/admin/edit-news`, { state: data })
        : navigate(`/business/edit-news`, {
            state: data,
          });
    }
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
          if (role == 3) {
            await axios.delete(
              `${process.env.REACT_APP_BASE_URL_ADMIN}/delete-news/${row.news_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            await axios.delete(
              `${process.env.REACT_APP_BASE_URL_ADMIN}/delete-news/${row.news_id}/${adminId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

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
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          onClick={() => handleRowClick(params)}
          src={`data:image/jpeg;base64,${params.value}`}
          alt="News Image"
          style={{
            width: "100%",
            height: "5rem",
            cursor: "pointer",
            objectFit: "cover",
          }}
          className="rounded"
          loading="lazy"
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
      field: "delete",
      headerName: "Sửa",
      width: 80,
      renderCell: (params) => (
        <Button
          style={{ background: RED_COLOR, border: "0px" }}
          onClick={() => handleRowClick1(params)}
          className="py-2"
        >
          <BiEdit className="fs-5" />
        </Button>
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
    {
      field: "title",
      headerName: "Tiêu đề",
      width: 300,
      renderCell: (params) => (
        <div
          className="fw-bold"
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
      width: 170,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Row>
        <Col>
          {" "}
          <h3 className="fw-bold">
            <img
              src={newsimg}
              className="mb-2"
              style={{
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
              }}
              loading="lazy"
            />{" "}
            TIN TỨC
          </h3>
        </Col>
        <Col>
          {" "}
          <p className="text-end">
            <img
              onClick={handleDeleteSelected}
              src={deleteimg}
              className="mb-2 me-2"
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                cursor: "pointer",
              }}
              loading="lazy"
            />{" "}
            <Link
              to={
                role == 2 || role == 5
                  ? "/admin/add-news"
                  : "/business/add-news"
              }
            >
              <img
                src={addimg}
                className="mb-2 "
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                loading="lazy"
              />
            </Link>
          </p>
        </Col>
      </Row>
      <LazyLoad>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={news}
            columns={columns}
            pagination
            autoPageSize
            getRowId={(row) => row.news_id}
            getRowHeight={(params) => 100}
          />
        </div>{" "}
      </LazyLoad>
    </>
  );
};

export default News;
