import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context";
import DisplayImage from "./load-image";
import { Button } from "react-bootstrap";

const UpdateImage = () => {
      const { accountId, isLoggedIn } = useAuth();

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      await axios.put(
        `http://localhost:5020/v1/api/admin/account/update-image/${accountId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Hình ảnh đã được cập nhật.");
       window.location.reload();
    } catch (error) {
      console.error("Failed to update image:", error);
      setError("Cập nhật hình ảnh không thành công. Vui lòng thử lại sau.");
    }
  };

  return (
    <div>
        <DisplayImage/>
      <p className="fw-bold">Chọn ảnh đại diện:</p>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} /><br/>
        <Button variant="dark" type="submit" className="my-2">Cập nhật hình ảnh</Button>
      </form>
    </div>
  );
};

export default UpdateImage;
