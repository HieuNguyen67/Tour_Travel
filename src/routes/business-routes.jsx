import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import ListHotel from "../page/business/hotel";
import AddHotelForm from "../page/business/hotel/add-hotels";
import ListTour from "../page/business/list-tour";
import OrderTour from "../page/business/order-tour";
import ListVehicle from "../page/business/vehicle";
import AddVehicleForm from "../page/business/vehicle/add-vehicles";

const BusinessRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-tour" element={<ListTour />} />
          <Route path="/order-tour" element={<OrderTour />} />
          <Route path="/hotel" element={<ListHotel />} />
          <Route path="/add-hotel" element={<AddHotelForm />} />

          <Route path="/vehicle" element={<ListVehicle />} />
          <Route path="/add-vehicle" element={<AddVehicleForm />} />

          <Route path="*" element={<Navigate to="/list-tour" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default BusinessRoutes;
