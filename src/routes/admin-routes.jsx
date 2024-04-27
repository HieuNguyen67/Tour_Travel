import { Route, Routes, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element />
        <Route
          path="*"
          element={<Navigate to="/admin/" />}
        />
      </Routes>
    </>
  );
};
export default AdminRoutes;
