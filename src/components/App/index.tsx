import { useAuth } from "@/context";
import Login from "@/page/Login";

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
import BookTour from "@/page/customer/booking-tour";
import Checkout from "@/page/customer/checkout";
import Banking from "@/page/customer/banking";
import SharedTour from "@/page/customer/link-share-tour";


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
            <Route path="*" element={<Navigate to="/admin/list-customer" />} />
            <Route path="/" element={<Navigate to="/admin/list-customer" />} />
          </>
        )}
        {role == 3 && (
          <>
            <Route path="/business/*" element={<BusinessRoutes />} />
            <Route path="/" element={<Navigate to="/business/list-tour" />} />
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
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/banking/:code_order/:total_price/:child_quantity/:adult_quantity/:infant_quantity/:note"
          element={<Banking />}
        />
        <Route path="/list-tour-vietnam/:location" element={<TourSearch />} />
        <Route path="/list-tour-foreign/:location" element={<TourSearch />} />
        <Route path="/tour-details/:tour_id" element={<TourDetail />} />
        <Route path="/booking-tour/:tour_id" element={<BookTour />} />
        <Route
          path="/tour-share-link/:tour_id/:sharelinkToken"
          element={<SharedTour />}
        />
      </Routes>
    </>
  );
};

export default Apps;
