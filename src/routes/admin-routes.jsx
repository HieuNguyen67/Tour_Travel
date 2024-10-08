import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "@/components/side-bar";
import ContactList from "@/page/admin/contact";
import ContactDetail from "@/page/admin/contact/contact-detail";
import EditProfile from "@/page/admin/edit-profile";
import ListUser from "@/page/admin/list-user";
import News from "@/page/admin/news";
import AddNews from "@/page/admin/news/add-news";
import UpdateNews from "@/page/admin/news/edit-news";
import NewsDetail from "@/page/admin/news/news-details";
import RegisterUser from "@/page/admin/register-user";
import ReportList from "@/page/admin/report-tour";
import ReportDetails from "@/page/admin/report-tour/report-detail";
import { useAuth } from "@/context";
import AdminActionsList from "@/page/admin/admin-actions";
import Payments from "@/page/admin/list-payments";
import OrderDetail from "@/page/business/order-detail";
import RefundsList from "@/page/admin/list-refunds";
import DashboardAdmin from "@/page/admin/dashboard";
import ListRevenueBusiness from "@/page/admin/list-revenue-business";
import DetailRevenueBusiness from "@/page/admin/detail-revenue-business";
const AdminRoutes = () => {
  const { role } = useAuth();

  return (
    <>
      {role == 2 && (
        <SidebarLayout>
          <Routes>
            <Route path="/list-customer" element={<ListUser />} />
            <Route path="/register-user/:role_id" element={<RegisterUser />} />
            <Route path="/list-business" element={<ListUser />} />
            <Route path="/list-admin" element={<ListUser />} />

            <Route
              path="/edit-profile/:role_id"
              element={<EditProfile />}
            />
            <Route
              path="/contact-detail"
              element={<ContactDetail />}
            />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/news-detail" element={<NewsDetail />} />
            <Route path="/edit-news" element={<UpdateNews />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<ContactList />} />

            <Route path="/report" element={<ReportList />} />
            <Route
              path="/report-detail"
              element={<ReportDetails />}
            />
            <Route path="/admin-actions" element={<AdminActionsList />} />
            <Route path="/list-payments" element={<Payments />} />
            <Route path="/list-refunds" element={<RefundsList />} />
            <Route path="/order-detail" element={<OrderDetail />} />
            <Route path="/dashboard" element={<DashboardAdmin />} />
            <Route
              path="/list-revenue-business"
              element={<ListRevenueBusiness />}
            />
            <Route path="*" element={<Navigate to="/admin/list-customer" />} />
          </Routes>
        </SidebarLayout>
      )}
      {role == 4 && (
        <>
          <SidebarLayout>
            <Routes>
              <Route path="/list-customer" element={<ListUser />} />
              <Route
                path="/register-user/:role_id"
                element={<RegisterUser />}
              />
              <Route path="/list-business" element={<ListUser />} />
              <Route path="/list-admin" element={<ListUser />} />
              <Route
                path="/edit-profile/:account_id/:role_id"
                element={<EditProfile />}
              />
              <Route
                path="/contact-detail/:contact_id"
                element={<ContactDetail />}
              />
              <Route
                path="*"
                element={<Navigate to="/admin/list-customer" />}
              />
            </Routes>
          </SidebarLayout>
        </>
      )}
      {role == 5 && (
        <SidebarLayout>
          <Routes>
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/news-detail/:news_id" element={<NewsDetail />} />
            <Route path="/edit-news/:news_id" element={<UpdateNews />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<Navigate to="/admin/news" />} />
          </Routes>
        </SidebarLayout>
      )}
      {role == 6 && (
        <SidebarLayout>
          <Routes>
            <Route
              path="/contact-detail/:contact_id"
              element={<ContactDetail />}
            />

            <Route path="/contact" element={<ContactList />} />

            <Route path="/report" element={<ReportList />} />
            <Route
              path="/report-detail/:report_id"
              element={<ReportDetails />}
            />
            <Route path="*" element={<Navigate to="/admin/contact" />} />
          </Routes>
        </SidebarLayout>
      )}
    </>
  );
};
export default AdminRoutes;
