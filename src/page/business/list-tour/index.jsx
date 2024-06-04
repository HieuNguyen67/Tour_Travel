import { Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BLUE_COLOR, GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/constants";
import tourimg from "@/assets/image/tour.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAuth } from "@/context";
import { BASE_URL } from "@/constants";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import LoadingBackdrop from "@/components/backdrop";
import addimg from "@/assets/image/add.png";

const TourList = () => {
  const { businessId } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list-tours/${businessId}`
        );
        const formattedTours = response.data.map((tour) => ({
          ...tour,
          formattedPrice_adult: formatPrice(tour.adult_price),
          formattedPrice_child: formatPrice(tour.child_price),
          formattedPrice_infant: formatPrice(tour.infant_price),
        }));
        setTours(formattedTours);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, [businessId]);

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
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/business/update-tour/${params.row.tour_id}`);
  };

  const columns = [
    {
      field: "tour_id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
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
      field: "status",
      headerName: "Trạng thái",
      width: 135,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        switch (params.value) {
          case "Active":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";

            break;
          case "Inactive":
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
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "tour_name",
      headerName: "Tour",
      width: 330,
      renderCell: (params) => (
        <div
          className="fw-bold"
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },

    {
      field: "formattedPrice_adult",
      headerName: "Giá người lớn",
      width: 150,
      renderCell: (params) => (
        <div
          className="ms-2 fw-bold text-danger"
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
    {
      field: "formattedPrice_child",
      headerName: "Giá trẻ em",
      width: 150,
      renderCell: (params) => (
        <div
          className="fw-bold text-danger"
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
    {
      field: "formattedPrice_infant",
      headerName: "Giá trẻ nhỏ",
      width: 110,
      renderCell: (params) => (
        <div
          className="fw-bold text-danger"
          dangerouslySetInnerHTML={{ __html: params.value }}
        />
      ),
    },
    {
      field: "start_date",
      headerName: "Ngày bắt đầu",
      width: 110,
      renderCell: (params) => (
        <span className="fw-bold text-primary" style={{ cursor: "pointer" }}>
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
    {
      field: "end_date",
      headerName: "Ngày kết thúc",
      width: 110,
      renderCell: (params) => (
        <span className="fw-bold text-primary" style={{ cursor: "pointer" }}>
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
    { field: "quantity", headerName: "Số lượng", width: 110 },

    { field: "vehicle", headerName: "Phương tiện", width: 110 },
    {
      field: "hotel",
      headerName: "Khách sạn",
      width: 110,
      renderCell: renderStarIcon,
    },
    {
      field: "departure_location_name",
      headerName: "Điểm đi",
      width: 150,
    },
    {
      field: "destination_locations",
      headerName: "Điểm đến",
      width: 200,
      renderCell: (params) => <div>{params.value.join(", ")}</div>,
    },
    { field: "tourcategory_name", headerName: "Category", width: 150 },
    {
      field: "created_at",
      headerName: "Ngày tạo",
      width: 110,
      renderCell: (params) => (
        <span className="fw-bold text-primary" style={{ cursor: "pointer" }}>
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
  ];

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Row>
        <Col className="col-8">
          <h3 className="fw-bold">
            {" "}
            <img src={tourimg} className="mb-2 location" /> LIST TOUR
          </h3>
        </Col>
        <Col>
          <p className="text-end">
            <Link to="/business/add-tour" className="text-decoration-none">
              <img
                src={addimg}
                className="mb-2"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
              />
            </Link>
          </p>
        </Col>
      </Row>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={tours}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.tour_id}
          getRowHeight={(params) => 100}
          onRowClick={handleRowClick}
        />
      </Box>
    </>
  );
};

export default TourList;
