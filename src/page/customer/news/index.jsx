import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NewsLayout from "./layout";
import NewsDetailCustomer from "./news-detail";
import NewsTravel from "./news-travel";

const NewsMain = () => {

  return (
    <>
      <NewsLayout>
        <Routes>
          <Route path="/1/:news_travel" element={<NewsTravel />} />
          <Route path="/2/:travel_guide" element={<NewsTravel />} />
          <Route path="/news-detail/:news_id" element={<NewsDetailCustomer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </NewsLayout>
    </>
  );
};
export default NewsMain;
