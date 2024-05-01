import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Backdrop, CircularProgress } from "@mui/material";

import "./business-link.scss";
const BusinessList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5020/v1/api/admin/get-users?role_id=3"
        );
        setAccounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
        setError("Không thể tải danh sách tài khoản.");
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const renderAccounts = () => {
    return accounts.map((account) => {
      return (
        <>
         
          <Col className="col-lg-4  col-12 mb-lg-0 mb-3">
            <div
              key={account.account_id}
              className="boxborderr rounded-5 p-3 shadow-sm"
            >
              <AccountImage accountId={account.account_id} />
              <h5 className="fw-bold text-center mt-3">{account.name}</h5>
            </div>
          </Col>
        </>
      );
    });
  };

  if (loading) return (
    <>
      <div className="fw-bold fs-5"> LOADING...</div>
    </>
  );
  if (error) return <div>Error: {error}</div>;

  return <>{renderAccounts()}</>;
};

const AccountImage = ({ accountId }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchAccountImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5020/v1/api/admin/account/image/${accountId}`,
          {
            responseType: "blob",
          }
        );
        const imageURL = URL.createObjectURL(response.data);
        setImageUrl(imageURL);
      } catch (error) {
        console.error("Lỗi khi lấy hình ảnh:", error);
      }
    };

    fetchAccountImage();

    return () => URL.revokeObjectURL(imageUrl);
  }, [accountId]);

  return imageUrl ? <img src={imageUrl} alt="" className="rounded-5 col-12 my-3" /> : null;
};

export default BusinessList;
