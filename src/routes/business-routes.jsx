import { Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "@/components/side-bar";
import News from "@/page/admin/news";
import AddNews from "@/page/admin/news/add-news";
import UpdateNews from "@/page/admin/news/edit-news";
import NewsDetail from "@/page/admin/news/news-details";
import AddTourForm from "@/page/business/add-tour";
import ListTour from "@/page/business/list-tour";
import OrderTour from "@/page/business/order-tour";
import PoliciesList from "@/page/business/list-policies";
import AddPolicyForm from "@/page/business/list-policies/add-policies";
import ContactList from "@/page/admin/contact";
import ContactDetail from "@/page/admin/contact/contact-detail";
import RatingsList from "@/page/business/list-rating";
import TourReviewsDetail from "@/page/business/list-rating/rating-detail";
import AddPolicyCancellation from "@/page/business/add-policies-cancellation";
import OrderDetail from "@/page/business/order-detail";
import ListRequestCancleBusiness from "@/page/business/list-request-cancel";
import DashboardBusiness from "@/page/business/dashboard";
import PassengersListByTour from "@/page/business/list-passengers-tour";
import ListOrderTour from "@/page/business/list-orders-by-tour";

const BusinessRoutes = () => {
  return (
    <>
      <SidebarLayout>
        <Routes>
          <Route path="/list-tour" element={<ListTour />} />
          <Route path="/add-tour/:add_tour" element={<AddTourForm />} />
          <Route
            path="/add-tour/:add_tour/duplicate"
            element={<AddTourForm />}
          />
          <Route path="/update-tour" element={<AddTourForm />} />
          <Route path="/list-news" element={<News />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/news-detail" element={<NewsDetail />} />
          <Route path="/edit-news" element={<UpdateNews />} />
          <Route path="/list-policies" element={<PoliciesList />} />
          <Route path="/add-policies" element={<AddPolicyForm />} />
          <Route path="/edit-policy" element={<AddPolicyForm />} />
          <Route path="/list-contact" element={<ContactList />} />
          <Route path="/contact-detail" element={<ContactDetail />} />
          <Route path="/list-rating" element={<RatingsList />} />
          <Route path="/review-detail" element={<TourReviewsDetail />} />
          <Route
            path="/add-policies-cancellation"
            element={<AddPolicyCancellation />}
          />
          <Route
            path="/edit-policy-cancellation"
            element={<AddPolicyCancellation />}
          />
          <Route
            path="/list-policies-cancellation"
            element={<PoliciesList />}
          />
          <Route path="/order-tour" element={<OrderTour />} />
          <Route
            path="/order-detail"
            element={<OrderDetail />}
          />{" "}
          <Route
            path="/list-request-cancel"
            element={<ListRequestCancleBusiness />}
          />
          <Route path="/dashboard" element={<DashboardBusiness />} />
          <Route
            path="/list-passenger-tour"
            element={<PassengersListByTour />}
          />
          <Route path="/list-orders-by-tour" element={<ListOrderTour />} />
          <Route path="*" element={<Navigate to="/business/list-tour" />} />
        </Routes>
      </SidebarLayout>
    </>
  );
};
export default BusinessRoutes;
