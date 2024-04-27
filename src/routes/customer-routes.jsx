import { Route, Routes, Navigate } from "react-router-dom";

const CustomerRoutes=()=>{
    return (
      <>
        <Routes>
          <Route path="" element />
          <Route
            path="*"
            element={<Navigate to="/customer/" />}
          />
        </Routes>
      </>
    );
}
export default CustomerRoutes;