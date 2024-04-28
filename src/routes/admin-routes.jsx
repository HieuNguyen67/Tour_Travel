import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../page/not-found";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element />
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </>
  );
};
export default AdminRoutes;
