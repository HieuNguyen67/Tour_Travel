import AdminRoutes from "../../routes/admin-routes";
import BusinessRoutes from "../../routes/business-routes";
import CustomerRoutes from "../../routes/customer-routes";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../page/customer/Home";
import Login from "../../page/Login";
import SignUp from "../../page/customer/SignUp";
import Introduce from "../../page/customer/Introduce";
import Image from "../../page/customer/Image";
import Contact from "../../page/customer/Contact";
import Information from "../../page/information";
import NotFound from "../../page/not-found";
import { useAuth } from "../../context";
import BusinessLink from "../../page/customer/business-link";
import NewsMain from "../../page/customer/news";
import ConfirmationForm from "../../page/customer/SignUp/confirmation_code";
import Chatbox from "../chatbox";

const Apps=()=>{
  const{role}=useAuth();
    return (
      <>
        <Routes>
          {role == 1 && (
            <>
              {" "}
              <Route path="/customer/*" element={<CustomerRoutes />} />
            </>
          )}
          {role == 2 && (
            <>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route
                path="*"
                element={<Navigate to="/admin/list-customer" />}
              />
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
          <Route path="/image" element={<Image />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/information/*" element={<Information />} />
          <Route path="/news/*" element={<NewsMain />} />
          <Route path="/confirm" element={<ConfirmationForm />} />
          <Route path="/chatbox" element={<Chatbox />} />
        </Routes>
      </>
    );
}
export default Apps;