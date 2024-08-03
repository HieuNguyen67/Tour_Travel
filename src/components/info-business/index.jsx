import { useAuth } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultImage from "../../assets/image/6945124.png";
import { Button, Col, Row } from "react-bootstrap";
import ContactModal from "../contact-business";
import { AiFillShop } from "react-icons/ai";
import { BLUE_COLOR, RED1_COLOR, TEXT_RED_COLOR } from "@/constants";
import CountTodo from "../count-todo";
import ContactStats from "../response-percentage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdTour } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { IoMdText } from "react-icons/io";

const InfoBusiness = ({ tour , business_id}) => {
  const { token } = useAuth();
  const [imageSrc, setImageSrc] = useState("");
 const {location} = useParams();
 const [business, setBusiness] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (business_id) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/accounts/image/1/${business_id}`,
            {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const imageURL = URL.createObjectURL(response.data);
          setImageSrc(imageURL);
        }
      } catch (error) {
        console.error("Lỗi khi lấy hình ảnh:", error);
        setImageSrc(defaultImage);
      }
    };

    fetchImage();
  }, [business_id, token]);

   useEffect(() => {
     const fetchBusiness = async () => {
       try {
         if (business_id) {
           const response = await axios.get(
             `${process.env.REACT_APP_BASE_URL_BUSINESS}/detail-business/${business_id}`,
           );
           setBusiness(response.data);

           
         }
       } catch (error) {
         console.error("Lỗi khi lấy business:", error);
       
       }
     };

     fetchBusiness();
   }, [business_id]);

  const navigate= useNavigate();
  const handleClick=()=>{
    navigate(`/tour-by-business/3/${business_id}`);
  }

  return (
    <>
      <div
        className="my-3 px-3 py-lg-5 py-3 rounded-4 shadow-sm"
        style={{ background: "white", border: "#2d4271 solid 3px" }}
      >
        <Row>
          <Col className="col-lg-1 col-3 ">
            <img
              src={imageSrc || defaultImage}
              alt="Hình ảnh của tài khoản"
              className="col-12 col-lg-12 sizeimgb rounded-circle shadow"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </Col>
          <Col className="col-lg-3 col-9 ">
            {location != 3 ? (
              <>
                {" "}
                <Row className="d-flex flex-column">
                  <Col>
                    <p className="fw-bold">{business.account_name}</p>
                  </Col>
                  <Col>
                    <div className="d-flex flex-row">
                      <ContactModal
                        accountId={business_id}
                        tourId={tour.tour_id}
                        css={"col-6 me-2"}
                        text={"Liên hệ"}
                      />

                      <Button
                        style={{ background: BLUE_COLOR, border: "0px" }}
                        className="col-6"
                        onClick={handleClick}
                      >
                        <AiFillShop className="fs-4" /> Truy cập
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                {" "}
                <p className="fw-bold mt-3 mt-lg-4" >{business.account_name}</p>
              </>
            )}
          </Col>
          <Col className="ms-lg-4 border-start mt-lg-0 mt-3 hideinfo">
            <Row className="mt-4">
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>
                      <MdTour className="fs-4" /> Tour:{" "}
                    </p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <CountTodo
                        endpoint={"/count-tour-business"}
                        business_id={business_id}
                      />
                    </p>
                  </Col>
                </Row>
              </Col>{" "}
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>
                      <FaStar className="fs-4 text-warning" /> Đánh giá:{" "}
                    </p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <CountTodo
                        endpoint={"/average-rating"}
                        business_id={business_id}
                      />
                    </p>
                  </Col>
                </Row>
              </Col>{" "}
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>
                      <IoMdText className="fs-4" /> %Phản hồi:
                    </p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <ContactStats businessId={business_id} />
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <div className="hideinfo1 mt-3">
            <p>
              {" "}
              <span className="fw-bold " style={{ color: TEXT_RED_COLOR }}>
                <CountTodo
                  endpoint={"/count-tour-business"}
                  business_id={business_id}
                />{" "}
              </span>
              Tour&nbsp;&nbsp;{" "}
              <span className="fw-bold " style={{ color: TEXT_RED_COLOR }}>
                <CountTodo
                  endpoint={"/average-rating"}
                  business_id={business_id}
                />{" "}
              </span>
              Đánh giá&nbsp;&nbsp;{" "}
              <span className="fw-bold " style={{ color: TEXT_RED_COLOR }}>
                <ContactStats businessId={business_id} />{" "}
              </span>
              Phản hồi
            </p>
          </div>
        </Row>
      </div>
    </>
  );
};
export default InfoBusiness;