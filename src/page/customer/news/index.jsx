import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import NewsLayout from "./layout";

const NewsTravel = lazy(() => import("./news-travel"));
const NewsDetailCustomer = lazy(() => import("./news-detail"));
const NewsMain = () => {

  return (
    <>
      <NewsLayout>
        <Routes>
          <Route
            path="/1/:news_travel"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewsTravel />
              </Suspense>
            }
          />
          <Route path="/2/:travel_guide" element={<NewsTravel />} />
          <Route
            path="/news-detail/:news_id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewsDetailCustomer />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </NewsLayout>
    </>
  );
};
export default NewsMain;
