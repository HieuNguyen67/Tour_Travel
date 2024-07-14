import { Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_BUSINESS, BLUE_COLOR, DARKBLUE, GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/constants";
import tourimg from "@/assets/image/tour.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAuth } from "@/context";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import LoadingBackdrop from "@/components/backdrop";
import addimg from "@/assets/image/add.png";
import LazyLoad from "react-lazyload";

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
          `${BASE_URL_BUSINESS}/list-tours/${businessId}`
        );
        const formattedTours = response.data.map((tour) => ({
          ...tour,
          formattedPrice_adult: formatPrice(tour.adult_price),
          formattedPrice_child: formatPrice(tour.child_price),
          formattedPrice_infant: formatPrice(tour.infant_price),
          code: `${tour.tour_code}-${tour.tour_id}`,
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
      const data = { tour_id: params.row.tour_id };
      navigate("/business/update-tour", { state: data });
  };
  const handleRowClick1 = (params) => {
          const data = { tour_id: params.row.tour_id };
    navigate(`/business/list-orders-by-tour`, { state: data });
  };

  const columns = [
    {
      field: "code",
      headerName: "Mã Tour",
      width: 120,
      renderCell: (params) => (
        <span
          className="fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => handleRowClick(params)}
        >
          {params.value}
        </span>
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
            onClick={() => handleRowClick(params)}
            loading="lazy"
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
            onClick={() => handleRowClick(params)}
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "tour_name",
      headerName: "Tour",
      width: 250,
      renderCell: (params) => (
        <div
          className="fw-bold"
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },

    {
      field: "formattedPrice_adult",
      headerName: "Giá người lớn",
      width: 140,
      renderCell: (params) => (
        <div
          className="ms-2 fw-bold text-danger"
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "start_date",
      headerName: "Ngày bắt đầu",
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

    { field: "quantity", headerName: "Số lượng còn", width: 100 },
    {
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-primary" style={{ cursor: "pointer" }}>
          <Button
            style={{ background: DARKBLUE, border: "0px" }}
            onClick={() => handleRowClick1(params)}
          >
            Xem DS Booking
          </Button>
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
            <img
              src={tourimg}
              className="mb-2 "
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
            />{" "}
            LIST TOUR
          </h3>
        </Col>
        <Col>
          <p className="text-end">
            <Link to="/business/add-tour/1" className="text-decoration-none">
              <img
                src={addimg}
                className="mb-2"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </Link>
          </p>
        </Col>
      </Row>
      <LazyLoad>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={tours}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row.tour_id}
            getRowHeight={(params) => 100}
          />
        </Box>
      </LazyLoad>
    </>
  );
};

export default TourList;
