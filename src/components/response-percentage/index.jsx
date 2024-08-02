import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";

const ContactStats = ({ businessId }) => {
  const [confirmRate, setConfirmRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if(businessId){
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_BUSINESS}/contact-stats/${businessId}`
          );
          setConfirmRate(response.data.confirmRate);
        }
      } catch (err) {
        setError("Lỗi khi lấy tỷ lệ contact.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [businessId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return <>{confirmRate}</>;
};

export default ContactStats;
