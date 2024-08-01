import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { TEXT_RED_COLOR } from "@/constants";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const FavoriteCheckbox = ({ customerId, tourId }) => {
    const { token ,isLoggedIn } = useAuth();
      const navigate = useNavigate();
    

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        if(customerId){
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_CUSTOMER}/favorites/check/${customerId}/${tourId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsFavorite(response.data.isFavorite);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra mục yêu thích:", error);
      }
    };

    checkFavorite();
  }, [customerId, tourId]);

  const handleChange = async (event) => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
    const checked = event.target.checked;
    setIsFavorite(checked);

    try {
       if(customerId){
         if (checked) {
           await axios.post(
             `${process.env.REACT_APP_BASE_URL_CUSTOMER}/favorites/${customerId}/${tourId}`,
             {},
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
           toast.success("Yêu thích thành công!");
         } else {
           await axios.delete(
             `${process.env.REACT_APP_BASE_URL_CUSTOMER}/favorites/${customerId}/${tourId}`,
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
           toast.success("Huỷ yêu thích thành công!");
         }
         
       } 
    } catch (error) {
      console.error("Lỗi khi thay đổi mục yêu thích:", error);
      setIsFavorite(!checked);
      toast.error("Cập nhật yêu thích thất bại!");
    }
  };

  return (
    <>
      <div style={{ display: "grid", placeItems: "end" }}>
        <p
          className="fw-bold rounded-4 ps-2"
          style={{ color: TEXT_RED_COLOR, border: "2px solid red" }}
        >
          Lưu tin
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isFavorite}
            onChange={handleChange}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        </p>
      </div>
    </>
  );
};

export default FavoriteCheckbox;
