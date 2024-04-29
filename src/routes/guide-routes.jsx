import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import TourAssigned from "../page/guide/tour-assigned";
import NotFound from "../page/not-found";

const GuideRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/tour-assigned" element={<TourAssigned />} />
          <Route path="*" element={<Navigate to="/tour-assigned" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default GuideRoutes;
