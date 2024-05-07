import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import ContactList from "../page/admin/contact";
import ContactDetail from "../page/admin/contact/contact-detail";
import EditProfile from "../page/admin/edit-profile";
import ListUser from "../page/admin/list-user";
import News from "../page/admin/news";
import AddNews from "../page/admin/news/add-news";
import UpdateNews from "../page/admin/news/edit-news";
import NewsDetail from "../page/admin/news/news-details";
import RegisterUser from "../page/admin/register-user";
const AdminRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-customer" element={<ListUser />} />
          <Route path="/register-user/:role_id" element={<RegisterUser />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/list-business" element={<ListUser />} />

          <Route
            path="/edit-profile/:account_id/:role_id"
            element={<EditProfile />}
          />
          <Route path="/news-detail/:news_id" element={<NewsDetail />} />

          <Route path="/edit-news/:news_id" element={<UpdateNews />} />

          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/contact-detail/:contact_id" element={<ContactDetail />} />

          <Route path="*" element={<Navigate to="/list-customer" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default AdminRoutes;
