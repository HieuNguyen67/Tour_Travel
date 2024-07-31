import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context";
import { Col } from "react-bootstrap";
import defaultImage from "../../assets/image/6945124.png";
import "./load-image.scss";

const DisplayImage: React.FC = () => {
  const { accountId, token } = useAuth();

  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/account/image/${accountId}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Lỗi khi lấy hình ảnh:", error);
        setImageSrc(defaultImage);
      }
    };

    fetchImage();
  }, [accountId, token]);

  return (
    <div>
      <Col className="col-lg-12 col-5 col-md-3 mx-lg-0 mx-auto my-4 mt-lg-2">
        <img
          src={imageSrc || defaultImage}
          alt="Hình ảnh của tài khoản"
          className="col-lg-9 col-12 sizeimga rounded-circle shadow"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </Col>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default DisplayImage;
