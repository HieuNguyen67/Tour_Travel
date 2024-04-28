import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../page/not-found";

const BusinessRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default BusinessRoutes;
