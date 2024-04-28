import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import ChangePassword from "./change-password";
import InformationLayout from "./layout";
import Profile from "./profile";

const Information=()=>{
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
     useEffect(() => {
       if (isLoggedIn === false) {
         navigate("/");
       }
     }, [isLoggedIn, navigate]);
    return (
      <>
        <InformationLayout>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </InformationLayout>
      </>
    );
}
export default Information;