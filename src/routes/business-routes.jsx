import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import ListTour from "../page/business/list-tour";
import OrderTour from "../page/business/order-tour";

const BusinessRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-tour" element={<ListTour />} />
          <Route path="/order-tour" element={<OrderTour />} />
          <Route path="*" element={<Navigate to="/list-tour" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default BusinessRoutes;
