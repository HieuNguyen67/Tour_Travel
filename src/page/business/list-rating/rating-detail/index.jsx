import { Link, useParams } from "react-router-dom";
import TourReviews from "@/components/rating-tour";
import { IoArrowBackOutline } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";

const TourReviewsDetail = () => {
  const { tour_id } = useParams();
  return (
    <>
      <div className=" ">
        <Link to="/business/list-rating">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <h3 className="fw-bold mb-4">
          <BiSolidCommentDetail className="fs-2" /> PHẢN HỒI KHÁCH HÀNG
        </h3>
        <TourReviews tour_id={tour_id} />
      </div>
    </>
  );
};
export default TourReviewsDetail;
