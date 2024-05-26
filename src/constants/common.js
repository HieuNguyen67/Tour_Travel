import { FaUser } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { MdContactMail } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { MdAddBusiness } from "react-icons/md";
import { MdTour } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

const HEADER = [
  { id: 1, name: "TRANG CHỦ", link: "/" },
  { id: 2, name: "GIỚI THIỆU", link: "/introduce" },
  { id: 3, name: "DOANH NGHIỆP", link: "/business-link" },
  { id: 4, name: "TIN TỨC", link: "/news/1/Tin tức du lịch" },
  { id: 5, name: "LIÊN HỆ", link: "/contact" },
];
const ADMIN = [
  {
    id: 1,
    icon: <FaUser />,
    name: "KHÁCH HÀNG",
    link: "/admin/list-customer",
  },
  {
    id: 2,
    icon: <MdBusinessCenter />,
    name: "DOANH NGHIỆP",
    link: "/admin/list-business",
    icon2: <MdAddBusiness />,
    name2: "ĐĂNG KÝ DOANH NGHIỆP",
    link2: "/admin/register-user/3",
  },
  {
    id: 3,
    icon: <ImNewspaper />,
    name: "TIN TỨC",
    link: "/admin/news",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TIN TỨC",
    link2: "/admin/add-news",
  },
  { id: 4, icon: <MdContactMail />, name: "LIÊN HỆ", link: "/admin/contact" },
  { id: 5, icon: <MdReportProblem />, name: "TỐ CÁO", link: "/admin/report" },
  {
    id: 6,
    icon: <IoShieldCheckmark />,
    name: "CHÍNH SÁCH HUỶ",
    link: "/admin/list-policies",
  },
];
const BUSINESS = [
  {
    id: 1,
    name: "TOUR",
    icon: <MdTour />,
    link: "/business/list-tour",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TOUR",
    link2: "/business/add-tour",
  },
  { id: 2, icon: <FaListAlt />, name: "ORDER", link: "/business/order-tour" },
  {
    id: 3,
    icon: <MdContactMail />,
    name: "LIÊN HỆ TƯ VẤN",
    link: "/business/list-contact",
  },
  {
    id: 4,
    name: "CHÍNH SÁCH",
    icon: <IoShieldCheckmark />,
    link: "/business/list-policies",
    name2: "THÊM CHÍNH SÁCH",
    icon2: <IoMdAddCircle />,
    link2: "/business/add-policies",
  },
  {
    id: 5,
    icon: <ImNewspaper />,
    name: "TIN TỨC",
    link: "/business/list-news",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TIN TỨC",
    link2: "/business/add-news",
  },
];

const BASE_URL = "http://localhost:5020/v1/api/admin";
export { HEADER, BASE_URL, ADMIN, BUSINESS };
