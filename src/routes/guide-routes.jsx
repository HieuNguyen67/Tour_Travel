import { Route, Routes, Navigate } from "react-router-dom";

const GuideRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element />
        <Route
          path="*"
          element={<Navigate to="/guide" />}
        />
      </Routes>
    </>
  );
};
export default GuideRoutes;
