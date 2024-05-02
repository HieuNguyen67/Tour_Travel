import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import EditProfile from "../page/admin/edit-profile";
import ListBusiness from "../page/admin/list-business";
import ListCustomer from "../page/admin/list-customer";
import News from "../page/admin/news";
import AddNews from "../page/admin/news/add-news";
import RegisterBusiness from "../page/admin/register-business";

const AdminRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-customer" element={<ListCustomer />} />
          <Route path="/list-business" element={<ListBusiness />} />
          <Route path="/register-business" element={<RegisterBusiness />} />
          <Route path="/add-news" element={<AddNews />} />

          <Route
            path="/edit-profile/:account_id/:role_id"
            element={<EditProfile />}
          />
          <Route path="/news" element={<News />} />

          <Route path="*" element={<Navigate to="/list-customer" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default AdminRoutes;
