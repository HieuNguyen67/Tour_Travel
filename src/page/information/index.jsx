import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import NotFound from "../not-found";
import ChangePassword from "./change-password";
import InformationLayout from "./layout";
import ListOrder from "./order";
import Profile from "./profile";
import Header from "@/components/layout/header";
import Refunds from "./refunds";
import OrderDetail from "../business/order-detail";
import Rating from "./rating";
import ListFavorite from "./list-favorites";
const Information = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {" "}
      <Header />
      <InformationLayout>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/list-order" element={<ListOrder />} />
          <Route path="/rate" element={<Rating />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/favorites" element={<ListFavorite />} />
          <Route path="*" element={<Navigate to="/information/profile" />} />
        </Routes>
      </InformationLayout>
    </>
  );
};
export default Information;
