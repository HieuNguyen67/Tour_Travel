const HEADER = [
  { id: 1, name: "TRANG CHỦ", link: "/" },
  { id: 2, name: "GIỚI THIỆU", link: "/introduce" },
  { id: 3, name: "HÌNH ẢNH", link: "/image" },
  { id: 4, name: "LIÊN HỆ", link: "/contact" },
];
const ADMIN = [
  {
    id: 1,
    name: "KHÁCH HÀNG",
    link: ("/admin/list-customer" ||"/admin/edit-profile/1")

  },
  { id: 2, name: "DOANH NGHIỆP", link: "/admin/list-business" },
];
const BUSINESS = [
  { id: 1, name: "TOUR", link: "/business/list-tour" },
  { id: 2, name: "ORDER", link: "/business/order-tour" },
];
const GUIDE = [
  { id: 1, name: "TOUR PHÂN CÔNG", link: "/guide/tour-assigned" },
];
const BASE_URL = "http://localhost:5020/v1/api/admin";
export { HEADER, BASE_URL, ADMIN, BUSINESS ,GUIDE};
