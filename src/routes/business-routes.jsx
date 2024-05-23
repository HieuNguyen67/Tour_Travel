import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "../components/side-bar";
import EditProfile from "../page/admin/edit-profile";
import News from "../page/admin/news";
import AddNews from "../page/admin/news/add-news";
import UpdateNews from "../page/admin/news/edit-news";
import NewsDetail from "../page/admin/news/news-details";
import AddTourForm from "../page/business/add-tour";
import ListTour from "../page/business/list-tour";
import OrderTour from "../page/business/order-tour";
import PoliciesList from "../page/business/list-policies";
import AddPolicyForm from "../page/business/list-policies/add-policies";

const BusinessRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-tour" element={<ListTour />} />
          <Route path="/order-tour" element={<OrderTour />} />
          <Route path="/add-tour" element={<AddTourForm />} />
          <Route path="/update-tour/:tour_id" element={<AddTourForm />} />
          <Route
            path="/edit-profile/:account_id/:role_id"
            element={<EditProfile />}
          />
          <Route path="/list-news" element={<News />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/news-detail/:news_id" element={<NewsDetail />} />
          <Route path="/edit-news/:news_id" element={<UpdateNews />} />
          <Route path="/list-policies" element={<PoliciesList />} />
          <Route path="/add-policies" element={<AddPolicyForm />} />
          <Route path="/edit-policy/:policy_id" element={<AddPolicyForm />} />

          <Route path="*" element={<Navigate to="/list-tour" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default BusinessRoutes;
