import PassengersListTour from "@/components/list-passenger-tour";
import { Link, useParams } from "react-router-dom";
import groupimg from "@/assets/image/group.png";
import { IoArrowBackOutline } from "react-icons/io5";
import ExportPassengers from "@/components/export-excel";

const PassengersListByTour = ()=>{
    const {tour_id}= useParams();
    return (
      <>
        <Link to="/business/list-tour">
          <IoArrowBackOutline className="fs-3 mb-3" />
        </Link>
        <h3 className="mb-3 fw-bold">
          <img
            src={groupimg}
            className=""
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />{" "}
          DANH SÁCH HÀNH KHÁCH ĐI TOUR
        </h3>
        <ExportPassengers tourId={tour_id} />

        <PassengersListTour tourId={tour_id} />
      </>
    );
}
export default PassengersListByTour;