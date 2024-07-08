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
import { BiSolidCommentDetail } from "react-icons/bi";
import hanoi from "@/assets/image/hanoi.jpg";
import dalat from "@/assets/image/dalat.jpg";
import kiengiang from "@/assets/image/kiengiang.jpg";
import danang from "@/assets/image/danang.jpg";
import khanhhoa from "@/assets/image/khanhhoa.jpg";
import hoaky from "@/assets/image/hoaky.jpg";
import nhatban from "@/assets/image/nhatban.jpg";
import nga from "@/assets/image/nga.jpg";
import uc from "@/assets/image/uc.jpg";
import thailan from "@/assets/image/thailan.jpg";
import PendingBadge from "@/components/pending-badge";
import coin from "@/assets/image/coin.png";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { FaFilePen } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { AiFillDashboard } from "react-icons/ai";

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
    name: "DASHBOARD",
    icon: <AiFillDashboard />,
    link: "/admin/dashboard",
  },
  {
    id: 2,
    icon: <FaUser />,
    name: "KHÁCH HÀNG",
    link: "/admin/list-customer",
  },
  {
    id: 3,
    icon: <MdBusinessCenter />,
    name: "DOANH NGHIỆP",
    link: "/admin/list-business",
    icon2: <MdAddBusiness />,
    name2: "ĐĂNG KÝ",
    link2: "/admin/register-user/3",
  },
  {
    id: 4,
    icon: <MdAdminPanelSettings />,
    name: "ADMIN",
    link: "/admin/list-admin",
    icon2: <IoMdAddCircle />,
    name2: "ĐĂNG KÝ",
    link2: "/admin/register-user/2",
  },
  {
    id: 5,
    icon: <MdPayments />,
    name: "PAYMENTS",
    link: "/admin/list-payments",
  },
  {
    id: 6,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-refunds`}
        icon={<RiRefund2Line />}
      />
    ),
    name: "REFUNDS",
    link: "/admin/list-refunds",
  },
  {
    id: 7,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-news`}
        icon={<ImNewspaper />}
      />
    ),
    name: "TIN TỨC",
    link: "/admin/news",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TIN TỨC",
    link2: "/admin/add-news",
  },
  {
    id: 8,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-contact`}
        icon={<MdContactMail />}
      />
    ),
    name: "LIÊN HỆ",
    link: "/admin/contact",
  },
  {
    id: 9,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-report`}
        icon={<MdReportProblem />}
      />
    ),
    name: "TỐ CÁO",
    link: "/admin/report",
  },
  {
    id: 10,
    icon: <FaFilePen />,
    name: "AUDIT LOG",
    link: "/admin/admin-actions",
  },
];
const ACCOUNTMANAGEMENT = [
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
    name2: "ĐĂNG KÝ",
    link2: "/admin/register-user/3",
  },
  {
    id: 3,
    icon: <MdAdminPanelSettings />,
    name: "ADMIN",
    link: "/admin/list-admin",
    icon2: <IoMdAddCircle />,
    name2: "ĐĂNG KÝ",
    link2: "/admin/register-user/2",
  },
];
const NEWSMANAGEMENT = [
  {
    id: 1,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-news`}
        icon={<ImNewspaper />}
      />
    ),
    name: "TIN TỨC",
    link: "/admin/news",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TIN TỨC",
    link2: "/admin/add-news",
  },
];
const SUPPORTMANAGEMENT = [
  {
    id: 1,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-contact`}
        icon={<MdContactMail />}
      />
    ),
    name: "LIÊN HỆ",
    link: "/admin/contact",
  },
  {
    id: 2,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-report`}
        icon={<MdReportProblem />}
      />
    ),
    name: "TỐ CÁO",
    link: "/admin/report",
  },
];
const BUSINESS = [
  {
    id: 1,
    name: "DASHBOARD",
    icon: <AiFillDashboard />,
    link: "/business/dashboard",
  },
  {
    id: 2,
    name: "TOUR",
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-tour`}
        icon={<MdTour />}
        business_id={"yes"}
      />
    ),
    link: "/business/list-tour",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TOUR",
    link2: "/business/add-tour/1",
  },
  {
    id: 3,
    name: "ORDER",
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-orders`}
        icon={<FaListAlt />}
        business_id={"yes"}
      />
    ),
    link: "/business/order-tour",
  },
  {
    id: 4,
    name: "YÊU CẦU HUỶ",
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-request-cancel`}
        icon={<ImCancelCircle />}
        business_id={"yes"}
      />
    ),
    link: "/business/list-request-cancel",
  },
  {
    id: 5,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-contact-business`}
        icon={<MdContactMail />}
        business_id={"yes"}
      />
    ),
    name: "LIÊN HỆ TƯ VẤN",
    link: "/business/list-contact",
  },
  {
    id: 6,
    icon: <BiSolidCommentDetail />,
    name: "PHẢN HỒI",
    link: "/business/list-rating",
  },
  {
    id: 7,
    name: "QUY ĐỊNH",
    icon: <IoShieldCheckmark />,
    link: "/business/list-policies",
    name2: "THÊM QUY ĐỊNH",
    icon2: <IoMdAddCircle />,
    link2: "/business/add-policies",
  },
  {
    id: 8,
    icon: <RiRefund2Line />,
    name: "CHÍNH SÁCH HUỶ",
    link: "/business/list-policies-cancellation",
    name2: "THÊM CHÍNH SÁCH",
    icon2: <IoMdAddCircle />,
    link2: "/business/add-policies-cancellation",
  },
  {
    id: 9,
    icon: <ImNewspaper />,
    name: "TIN TỨC",
    link: "/business/list-news",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TIN TỨC",
    link2: "/business/add-news",
  },
];
const DESTINATION_FAVOURITE = [
  {
    id: 1,
    image: hanoi,
    link: "/list-tour-vietnam/1?destinationLocation=1",
  },
  {
    id: 2,
    image: dalat,
    link: "/list-tour-vietnam/1?destinationLocation=36",
  },
  {
    id: 3,
    image: kiengiang,
    link: "/list-tour-vietnam/1?destinationLocation=33",
  },
  {
    id: 4,
    image: danang,
    link: "/list-tour-vietnam/1?destinationLocation=3",
  },
  {
    id: 5,
    image: khanhhoa,
    link: "/list-tour-vietnam/1?destinationLocation=32",
  },
];
const DESTINATION_FAVOURITE_FOREIGN = [
  { id: 1, image: hoaky, link: "/list-tour-foreign/2?destinationLocation=63" },
  {
    id: 2,
    image: nga,
    link: "/list-tour-foreign/2?destinationLocation=75",
  },
  {
    id: 3,
    image: thailan,
    link: "/list-tour-foreign/2?destinationLocation=88",
  },
  {
    id: 4,
    image: nhatban,
    link: "/list-tour-foreign/2?destinationLocation=70",
  },
  {
    id: 5,
    image: uc,
    link: "/list-tour-foreign/2?destinationLocation=66",
  },
];

const CHECKINDAILY = [
  { id: 1, point: "1000", icon: coin, date: "Ngày 1" },
  { id: 2, point: "1000", icon: coin, date: "Ngày 2" },
  { id: 3, point: "1000", icon: coin, date: "Ngày 3" },
  { id: 4, point: "1000", icon: coin, date: "Ngày 4" },
  { id: 5, point: "1000", icon: coin, date: "Ngày 5" },
  { id: 6, point: "1000", icon: coin, date: "Ngày 6" },
  { id: 7, point: "1000", icon: coin, date: "Ngày 7" },
];
const BASE_URL_ADMIN = "http://localhost:5020/v1/api/admin";
const BASE_URL_USER = "http://localhost:5020/v1/api/user";
const BASE_URL_BUSINESS = "http://localhost:5020/v1/api/business";
const BASE_URL_CUSTOMER = "http://localhost:5020/v1/api/customer";
export {
  HEADER,
  BASE_URL_ADMIN,
  BASE_URL_USER,
  BASE_URL_BUSINESS,
  BASE_URL_CUSTOMER,
  ADMIN,
  ACCOUNTMANAGEMENT,
  NEWSMANAGEMENT,
  SUPPORTMANAGEMENT,
  BUSINESS,
  DESTINATION_FAVOURITE,
  DESTINATION_FAVOURITE_FOREIGN,
  CHECKINDAILY,
};
