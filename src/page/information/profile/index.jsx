import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { useAuth } from "../../../context";

const Profile = () => {
  const { accountId, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    birth_of_date: "",
    phone_number: "",
    address: "",
    email: "",
  });
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/${accountId}`
        ); 
        const accountData = response.data;
        const formattedDate = new Date(accountData.birth_of_date)
          .toISOString()
          .split("T")[0];
        setFormData({ ...accountData, birth_of_date: formattedDate });
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    fetchAccountData();
  }, [accountId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5020/v1/api/admin/account/${accountId}`,
        formData
      );
      alert("Thông tin tài khoản đã được cập nhật!");
    } catch (error) {
      console.error("Failed to update account data:", error);
      alert(
        "Cập nhật thông tin tài khoản không thành công. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
       
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tên đăng nhập"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ và tên"
          />
          <input
            type="date"
            name="birth_of_date"
            value={formData.birth_of_date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button type="submit">Cập nhật</button>
        </form>
      </motion.div>
    </>
  );
};

export default Profile;
