import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  ListItemText,
  Rating,
  Pagination,
} from "@mui/material";
import { BASE_URL_ADMIN, BASE_URL_USER } from "@/constants";
import { format } from "date-fns";
import { TEXT_RED_COLOR } from "@/constants";
import { Col } from "react-bootstrap";

const TourReviews = ({ tour_code }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (tour_code) {
          const response = await axios.get(
            `${BASE_URL_USER}/get-ratings-tour/${tour_code}`
          );
          setReviews(response.data.reviews);
          setAverageRating(response.data.averageRating);
          setTotalRatings(response.data.totalRatings);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tour_code]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const currentReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        {reviews.length === 0 ? (
          <></>
        ) : (
          <>
            <span className="fs-5 fw-bold" style={{ color: TEXT_RED_COLOR }}>
              {averageRating}&nbsp;
            </span>
          </>
        )}
        <Rating
          value={parseFloat(averageRating)}
          precision={0.1}
          readOnly
          style={{ color: TEXT_RED_COLOR }}
        />
        <span>&nbsp;({totalRatings} lượt đánh giá)</span>
      </Box>
      <hr />
      {reviews.length === 0 ? (
        <Typography variant="body1" color="textSecondary" my={4}>
          Chưa có đánh giá nào
        </Typography>
      ) : (
        <>
          <Col>
            {currentReviews.map((review, index) => (
              <div key={index} alignItems="flex-start">
                <ListItemText
                  primary={review.name}
                  secondary={
                    <>
                      <Rating
                        value={review.rating}
                        readOnly
                        style={{ color: TEXT_RED_COLOR }}
                      />
                      <p>
                        {format(new Date(review.date_rating), "dd/MM/yyyy")}
                      </p>
                      <Typography variant="body2" color="textSecondary">
                        {review.review}
                      </Typography>
                      <hr />
                    </>
                  }
                />
              </div>
            ))}
          </Col>
          <Box display="flex" justifyContent="center" my={4}>
            <Pagination
              count={Math.ceil(reviews.length / reviewsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="warning"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default TourReviews;
