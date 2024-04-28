import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../page/not-found";

const CustomerRoutes=()=>{
    return (
      <>
        <Routes>
          <Route path="" element />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
}
export default CustomerRoutes;