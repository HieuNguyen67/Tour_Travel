import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { BASE_URL_BUSINESS } from "@/constants";

const OrderStatusRatio=({businessId})=> {
  const [data, setData] = useState([]);

  const fetchOrderStatusRatio = async () => {
    try {
      const response = await axios.get(`${BASE_URL_BUSINESS}/order-status-ratio/${businessId}`);
      setData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tỷ lệ trạng thái đơn hàng:", error);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchOrderStatusRatio();
    }
  }, [businessId]);
  

  const pieData = data.map((item, index) => ({
    id: index,
    value: parseFloat(item.percentage),
    label: item.status,
  }));

  return (
    <>
      {" "}
      <h5 className="fw-bold mt-4">TỶ LỆ ĐƠN HÀNG</h5>
      <div>
        <PieChart
          series={[
            {
              data: pieData,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </>
  );
}
export default OrderStatusRatio;