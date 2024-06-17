import { useAuth } from "@/context";
import Login from "@/page/Login";
import ContactDetail from "@/page/admin/contact/contact-detail";
import EditProfile from "@/page/admin/edit-profile";
import ListUser from "@/page/admin/list-user";
import RegisterUser from "@/page/admin/register-user";
import Contact from "@/page/customer/Contact";
import Home from "@/page/customer/Home";
import Introduce from "@/page/customer/Introduce";
import SignUp from "@/page/customer/SignUp";
import ConfirmationForm from "@/page/customer/SignUp/confirmation_code";
import BusinessLink from "@/page/customer/business-link";
import TourSearch from "@/page/customer/list-tour-filter";
import NewsMain from "@/page/customer/news";
import TourDetail from "@/page/customer/tour-detail";
import Information from "@/page/information";
import NotFound from "@/page/not-found";
import AdminRoutes from "@/routes/admin-routes";
import BusinessRoutes from "@/routes/business-routes";
import CustomerRoutes from "@/routes/customer-routes";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../side-bar";
import BookTour from "@/page/customer/booking-tour";


const Apps: React.FC = () => {
  const { role } = useAuth();

  return (
    <>
      <Routes>
        {role == 1 && (
          <>
            <Route path="/customer/*" element={<CustomerRoutes />} />
          </>
        )}
        {(role == 2 || role == 4 || role == 5 || role == 6) && (
          <>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {role == 3 && (
          <>
            <Route path="/business/*" element={<BusinessRoutes />} />
            <Route path="*" element={<Navigate to="/business/list-tour" />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/business-link" element={<BusinessLink />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/information/*" element={<Information />} />
        <Route path="/news/*" element={<NewsMain />} />
        <Route path="/confirm" element={<ConfirmationForm />} />
        <Route path="/list-tour-vietnam/:location" element={<TourSearch />} />
        <Route path="/list-tour-foreign/:location" element={<TourSearch />} />
        <Route path="/tour-details/:tour_id" element={<TourDetail />} />
        <Route path="/booking-tour/:tour_id" element={<BookTour />} />
      </Routes>
    </>
  );
};

export default Apps;
