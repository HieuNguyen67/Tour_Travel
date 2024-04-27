import { Route, Routes, Navigate } from "react-router-dom";

const BusinessRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element />
        <Route
          path="*"
          element={<Navigate to="/business/" />}
        />
      </Routes>
    </>
  );
};
export default BusinessRoutes;
