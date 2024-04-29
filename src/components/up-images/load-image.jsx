import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context";
import { Col } from "react-bootstrap";
import "./load-image.scss"
const DisplayImage = () => {
      const { accountId } = useAuth();

  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/image/${accountId}`,
          {
            responseType: "blob",
          }
        );
        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Lỗi khi lấy hình ảnh:", error);
        setError("Vui lòng upload hình ảnh !");
      }
    };

    fetchImage();
  }, [accountId]);

  return (
    <div>
   
      <Col className="col-lg-12 col-5 mx-lg-0 mx-auto my-4 mt-lg-2">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Hình ảnh của tài khoản"
            className="col-lg-9 col-12 sizeimgg rounded"
          />
        )}
      </Col>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default DisplayImage;
