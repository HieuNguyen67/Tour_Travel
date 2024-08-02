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
import { useNavigate } from "react-router-dom";

const InfoBusiness = ({ tour }) => {
  const { token } = useAuth();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (tour.business_id) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_USER}/accounts/image/1/${tour.business_id}`,
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
  }, [tour.business_id, token]);

  const navigate= useNavigate();
  const handleClick=()=>{
    navigate(`/tour-by-business/3/${tour.business_id}`);
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
            <Row className="d-flex flex-column">
              <Col>
                <p className="fw-bold">{tour.account_name}</p>
              </Col>
              <Col>
                <div className="d-flex flex-row">
                  <ContactModal
                    accountId={tour.business_id}
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
          </Col>
          <Col className="ms-lg-4 border-start mt-lg-0 mt-3 hideinfo">
            <Row className="mt-4">
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>Tổng số Tour: </p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <CountTodo
                        endpoint={"/count-tour-business"}
                        business_id={tour.business_id}
                      />
                    </p>
                  </Col>
                </Row>
              </Col>{" "}
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>Đánh giá TB: </p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <CountTodo
                        endpoint={"/average-rating"}
                        business_id={tour.business_id}
                      />
                    </p>
                  </Col>
                </Row>
              </Col>{" "}
              <Col>
                <Row>
                  <Col>
                    {" "}
                    <p>Tỷ lệ phản hồi:</p>
                  </Col>
                  <Col>
                    {" "}
                    <p
                      className="text-start fw-bold "
                      style={{ color: TEXT_RED_COLOR }}
                    >
                      <ContactStats businessId={tour.business_id} />
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
                  business_id={tour.business_id}
                />{" "}
              </span>
              Tour&nbsp;&nbsp;{" "}
              <span className="fw-bold " style={{ color: TEXT_RED_COLOR }}>
                <CountTodo
                  endpoint={"/average-rating"}
                  business_id={tour.business_id}
                />{" "}
              </span>
              Đánh giá&nbsp;&nbsp;{" "}
              <span className="fw-bold " style={{ color: TEXT_RED_COLOR }}>
                <ContactStats businessId={tour.business_id} />{" "}
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