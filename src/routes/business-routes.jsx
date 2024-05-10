import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import EditProfile from "../page/admin/edit-profile";
import ListHotel from "../page/business/hotel";
import AddHotelForm from "../page/business/hotel/add-hotels";
import UpdateHotel from "../page/business/hotel/edit-hotel";
import ListGuide from "../page/business/list-guide";
import AddGuide from "../page/business/list-guide/add-guide";
import ListTour from "../page/business/list-tour";
import OrderTour from "../page/business/order-tour";
import ListVehicle from "../page/business/vehicle";
import AddVehicleForm from "../page/business/vehicle/add-vehicles";
import UpdateVehicle from "../page/business/vehicle/edit-vehicle";

const BusinessRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-tour" element={<ListTour />} />
          <Route path="/order-tour" element={<OrderTour />} />
          <Route path="/hotel" element={<ListHotel />} />
          <Route path="/add-hotel" element={<AddHotelForm />} />
          <Route path="/edit-hotel/:hotel_id" element={<UpdateHotel />} />
          <Route path="/edit-vehicle/:vehicle_id" element={<UpdateVehicle />} />

          <Route path="/vehicle" element={<ListVehicle />} />

          <Route path="/add-vehicle" element={<AddVehicleForm />} />
          <Route path="/list-guide" element={<ListGuide />} />
          <Route path="/add-guide" element={<AddGuide />} />
          <Route
            path="/edit-profile/:account_id/:role_id"
            element={<EditProfile />}
          />

          <Route path="*" element={<Navigate to="/list-tour" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default BusinessRoutes;
