import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import defaultImage from "../../../assets/image/6945124.png";

const LoadImage = () => {
 const{account_id}=useParams();

  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/image/${account_id}`,
          {
            responseType: "blob",
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
  }, [account_id]);

  return (
    <div>
      <Col className="col-lg-12 col-5 mx-lg-0 mx-auto my-4 mt-lg-2">
        {imageSrc && (
          <img
            src={imageSrc || defaultImage}
            alt="Hình ảnh của tài khoản"
            className="col-lg-9 col-12 sizeimgg  rounded-4 shadow"
            style={{ objectFit: "cover" }}
          />
        )}
      </Col>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LoadImage;
