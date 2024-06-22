import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import defaultImage from "@/assets/image/6945124.png";
import { useAuth } from "@/context";
import { BASE_URL_ADMIN, BASE_URL_USER } from "@/constants";

const LoadImage = () => {
  const { account_id } = useParams();

  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_USER}/account/image/${account_id}`,
          {
            responseType: "blob",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      } catch (error) {
        setImageSrc(defaultImage);
      }
    };

    fetchImage();
  }, [account_id]);

  return (
    <div>
      <Col className="col-lg-12 col-5 col-md-3 mx-lg-0 mx-auto my-4 mt-lg-2">
        {imageSrc && (
          <img
            src={imageSrc || defaultImage}
            alt="Hình ảnh của tài khoản"
            className="col-lg-9 col-12 sizeimga  rounded-circle shadow"
            style={{ objectFit: "cover" }}
          />
        )}
      </Col>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LoadImage;
