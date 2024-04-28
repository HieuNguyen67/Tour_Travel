import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";

const ChangePassword = () => {
      const { accountId, isLoggedIn } = useAuth();
        const navigate = useNavigate();

 useEffect(() => {
   if (isLoggedIn === false) {
     navigate("/");
   }
 }, [isLoggedIn, navigate]);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://localhost:5020/v1/api/admin/account/change-password/${accountId}`,
        passwords
      );
      alert("Mật khẩu đã được thay đổi.");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.error("Failed to change password:", error);
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div>
      <h2>Thay đổi mật khẩu</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mật khẩu cũ:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mật khẩu mới:</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nhập lại mật khẩu mới:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Thay đổi mật khẩu</button>
      </form>
    </div>
  );
};

export default ChangePassword;
