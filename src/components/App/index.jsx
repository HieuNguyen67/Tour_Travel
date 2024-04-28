import AdminRoutes from "../../routes/admin-routes";
import BusinessRoutes from "../../routes/business-routes";
import CustomerRoutes from "../../routes/customer-routes";
import GuideRoutes from "../../routes/guide-routes";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../page/customer/Home";
import Login from "../../page/Login";
import SignUp from "../../page/customer/SignUp";
import Introduce from "../../page/customer/Introduce";
import Image from "../../page/customer/Image";
import Contact from "../../page/customer/Contact";
import Information from "../../page/information";

const Apps=()=>{
    const role=2;
    return (
      <>
        <Routes>
          {role === 1 && (
            <>
              {" "}
              <Route path="/customer/*" element={<CustomerRoutes />} />
              <Route path="*" element={<Navigate to="/customer/" />} />
            </>
          )}
          {role === 2 && (
            <>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="*" element={<Navigate to="/admin/" />} />
            </>
          )}
          {role === 3 && (
            <>
              <Route path="/business/*" element={<BusinessRoutes />} />
              <Route path="*" element={<Navigate to="/business/" />} />
            </>
          )}
          {role === 4 && (
            <>
              <Route path="/guide/*" element={<GuideRoutes />} />
              <Route path="*" element={<Navigate to="/guide/" />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/image" element={<Image />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/information/*" element={<Information />} />
        </Routes>
      </>
    );
}
export default Apps;