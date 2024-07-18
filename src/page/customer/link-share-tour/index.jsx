import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CUSTOMER } from "@/constants";
import { useAuth } from "@/context";
import LoadingBackdrop from "@/components/backdrop";

const SharedTour = () => {
  const { sharelinkToken, tour_id } = useParams();
  const { saveShareData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedTour = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_CUSTOMER}/shared-tour/${sharelinkToken}`
        );
        saveShareData(sharelinkToken);
        navigate(`/tour-details/${tour_id}`);
        setLoading(false);

      } catch (error) {
        console.error("Lỗi khi truy cập link chia sẻ:", error);
        alert("Link chia sẻ không hợp lệ !");
        setLoading(false);

      }
    };

    fetchSharedTour();
  }, [sharelinkToken, saveShareData]);

  if (loading)
    return (
      <div>
        <LoadingBackdrop open={loading} />
      </div>
    );

  return(
    <>
    </>
  )



};


export default SharedTour;
