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
    name2: "ĐĂNG KÝ",
    link2: "/admin/register-user/3",
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    icon: (
      <PendingBadge endpoint={`/pending-count-status-tour`} icon={<MdTour />} />
    ),
    link: "/business/list-tour",
    icon2: <IoMdAddCircle />,
    name2: "THÊM TOUR",
    link2: "/business/add-tour",
  },
  { id: 2, icon: <FaListAlt />, name: "ORDER", link: "/business/order-tour" },
  {
    id: 3,
    icon: (
      <PendingBadge
        endpoint={`/pending-count-status-contact-business`}
        icon={<MdContactMail />}
      />
    ),
    name: "LIÊN HỆ TƯ VẤN",
    link: "/business/list-contact",
  },
  {
    id: 4,
    icon: <BiSolidCommentDetail />,
    name: "PHẢN HỒI",
    link: "/business/list-rating",
  },
  {
    id: 5,
    name: "CHÍNH SÁCH",
    icon: <IoShieldCheckmark />,
    link: "/business/list-policies",
    name2: "THÊM CHÍNH SÁCH",
    icon2: <IoMdAddCircle />,
    link2: "/business/add-policies",
  },
  {
    id: 6,
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
    link: "/list-tour-vietnam/1?destinationLocation=Hà%20Nội",
  },
  {
    id: 2,
    image: dalat,
    link: "/list-tour-vietnam/1?destinationLocation=Đà%20Lạt",
  },
  {
    id: 3,
    image: kiengiang,
    link: "/list-tour-vietnam/1?destinationLocation=Kiên%20Giang",
  },
  {
    id: 4,
    image: danang,
    link: "/list-tour-vietnam/1?destinationLocation=Đà%20Nẵng",
  },
  {
    id: 5,
    image: khanhhoa,
    link: "/list-tour-vietnam/1?destinationLocation=Khánh%20Hòa",
  },
];
const DESTINATION_FAVOURITE_FOREIGN = [
  { id: 1, image: hoaky, link: "/list-tour-foreign/2?destinationLocation=US" },
  {
    id: 2,
    image: nga,
    link: "/list-tour-foreign/2?destinationLocation=Russia",
  },
  {
    id: 3,
    image: thailan,
    link: "/list-tour-foreign/2?destinationLocation=Thailand",
  },
  {
    id: 4,
    image: nhatban,
    link: "/list-tour-foreign/2?destinationLocation=Japan",
  },
  {
    id: 5,
    image: uc,
    link: "/list-tour-foreign/2?destinationLocation=Australia",
  },
];
const CHECKINDAILY = [
  { id: 1, point: "1000", icon: coin , date: "Ngày 1" },
  { id: 2, point: "1000", icon:  coin , date: "Ngày 2" },
  { id: 3, point: "1000", icon:  coin , date: "Ngày 3" },
  { id: 4, point: "1000", icon:  coin , date: "Ngày 4" },
  { id: 5, point: "1000", icon:  coin , date: "Ngày 5" },
  { id: 6, point: "1000", icon:  coin , date: "Ngày 6" },
  { id: 7, point: "1000", icon:  coin , date: "Ngày 7" },
];
const BASE_URL = "http://localhost:5020/v1/api/admin";
export {
  HEADER,
  BASE_URL,
  ADMIN,
  BUSINESS,
  DESTINATION_FAVOURITE,
  DESTINATION_FAVOURITE_FOREIGN,
  CHECKINDAILY,
};
