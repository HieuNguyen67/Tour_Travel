import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Box, Stack} from "@mui/material";
import axios from "axios";
import { useAuth } from "@/context";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingBackdrop from "@/components/backdrop";
import { format } from "date-fns";

const ListFavorites = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, customerId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if(customerId){
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_CUSTOMER}/list-favorites/${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRows(response.data.favorites);
        }
      } catch (err) {
        setError("Lỗi khi lấy danh sách tour yêu thích.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [customerId, token]);

  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate(`/tour-details/${params.row.tour_id}`);
  };
  const columns = [
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
            loading="lazy"
          />
        ) : null,
    },
    {
      field: "name",
      headerName: "Tour",
      width: 600,
      renderCell: (params) => (
        <span
          className="fw-bold"
          style={{ cursor: "pointer" }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "adult_price",
      headerName: "Giá",
      width: 150,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "created_at",
      headerName: "Ngày yêu thích",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy HH:mm:ss")}
        </span>
      ),
    },
  ];

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <LoadingBackdrop open={loading} />
      <div className="my-3">
        {rows.length > 0 ? (
          <>
            {" "}
            <LazyLoad>
              <Box sx={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  getRowHeight={(params) => 100}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.favorite_id}
                  onRowClick={handleRowClick}
                />
              </Box>
            </LazyLoad>
          </>
        ) : (
          <>
            <Stack sx={{ width: "100%" }} spacing={2} className="my-3">
              <Alert severity="error">Bạn chưa có Tour yêu thích nào!</Alert>
            </Stack>
          </>
        )}
      </div>
    </>
  );
};

export default ListFavorites;
