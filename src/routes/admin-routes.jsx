import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import ListBusiness from "../page/admin/list-business";
import ListCustomer from "../page/admin/list-customer";

const AdminRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-customer" element={<ListCustomer />} />
          <Route path="/list-business" element={<ListBusiness />} />
          <Route path="*" element={<Navigate to="/list-customer" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default AdminRoutes;
