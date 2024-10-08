import { Link, useLocation, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import React, { Suspense, lazy } from "react";

const TourReviews = lazy(() => import("@/components/rating-tour"));

const TourReviewsDetail = () => {
  const location= useLocation();
  const { tour_code } = location.state || {};
    return (
      <>
        <div className=" ">
          <Link to="/business/list-rating">
            <IoArrowBackOutline className="fs-3 mb-3" />
          </Link>
          <h3 className="fw-bold mb-4">
            <BiSolidCommentDetail className="fs-2" /> PHẢN HỒI KHÁCH HÀNG
          </h3>
          <Suspense fallback={<div>Loading...</div>}>
            <TourReviews tour_code={tour_code} />
          </Suspense>
        </div>
      </>
    );
};
export default TourReviewsDetail;
