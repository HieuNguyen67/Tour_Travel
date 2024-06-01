import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Rating } from "@mui/material";
import { BASE_URL } from "@/constants";
import { useAuth } from "@/context";
import LoadingBackdrop from "@/components/backdrop";
import { useNavigate } from "react-router-dom";
import { BiSolidCommentDetail } from "react-icons/bi";

const ToursList = () => {
  const { businessId } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tours-rating/${businessId}`
        );
        setTours(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, [businessId]);
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/business/review-detail/${params.row.tour_id}`);
  };
  const columns = [
    { field: "tour_id", headerName: "ID", width: 60 },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <img
            src={`data:image/jpeg;base64,${params.value}`}
            alt="Tour"
            style={{
              width: "100%",
              height: "5rem",
              cursor: "pointer",
              objectFit: "cover",
            }}
            className="rounded"
          />
        ) : null,
    },
    {
      field: "tour_name",
      headerName: "Tour",
      width: 650,
      renderCell: (params) => (
        <div
          className="ms-2 fw-bold"
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
    {
      field: "average_rating",
      headerName: "Đánh giá trung bình",
      width: 150,
      renderCell: (params) => (
        <Rating value={parseFloat(params.value)} precision={0.1} readOnly />
      ),
    },
    {
      field: "total_ratings",
      headerName: "Số lượt đánh giá",
      width: 150,
      renderCell: (params) =>
        params.value == 0 ? (
          <span>Chưa có đánh giá</span>
        ) : (
          <span>{params.value} lượt đánh giá</span>
        ),
    },
  ];

  return (
    <>
      <LoadingBackdrop open={loading} />
      <h3 className="fw-bold mb-3">
        <BiSolidCommentDetail className="fs-2" /> PHẢN HỒI KHÁCH HÀNG
      </h3>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={tours}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.tour_id}
          getRowHeight={(params) => 100}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

export default ToursList;
