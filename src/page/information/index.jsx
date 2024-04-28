import { Route, Routes } from "react-router-dom";
import ChangePassword from "./change-password";
import InformationLayout from "./layout";
import Profile from "./profile";

const Information=()=>{
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