import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import LoadingBackdrop from "../backdrop";

const CountTodo = ({ endpoint, business_id }) => {
  const [pendingCount, setPendingCount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (business_id) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}${endpoint}/${business_id}`
          );
          setPendingCount(response.data.count);
          setLoading(false);
        } else {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_ADMIN}${endpoint}`
          );
          setPendingCount(response.data.count);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching pending count:", error);
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, business_id]);

  if (loading)
    return (
      <div>
        <LoadingBackdrop open={loading} />
      </div>
    );

  return (
    <>
      {pendingCount}
      {error && <span style={{ fontSize: "1rem" }}>{error}</span>}
    </>
  );
};

export default CountTodo;
