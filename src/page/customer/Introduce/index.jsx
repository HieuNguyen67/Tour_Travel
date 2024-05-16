import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import head from "../../../assets/image/heading-border.png"
import { Button } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import Header from "../../../components/layout/header";
import { HiIdentification } from "react-icons/hi2";

const Introduce = () => {
  return (
    <>
      {" "}
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mt-5 pt-5">
          <h2 className="mt-5 fw-bold"><HiIdentification className="fs-1 mb-lg-2 mb-1"/> VỀ TOUR TRAVEL</h2>
          <img src={head} className="col-lg-1 col-3" />
          <h4 className="fw-bold mt-5">1. Chúng tôi là TOUR TRAVEL</h4>
          <p className="mt-3" style={{ color: "var(--gray-600, #475467)" }}>
            Chào mừng đến với Tour Travel - ngôi nhà của những trải nghiệm du
            lịch độc đáo và kết nối với những doanh nghiệp hàng đầu trong ngành
            du lịch! Tour Travel không chỉ là một trang web đặt tour thông
            thường, mà còn là điểm đến cho những người yêu thích khám phá những
            điều mới mẻ và đồng thời muốn hỗ trợ và kết nối với cộng đồng doanh
            nghiệp.
          </p>{" "}
          <h4 className="fw-bold mt-5">2. Dịch vụ du lịch đa dạng</h4>
          <p className=" mt-3" style={{ color: "var(--gray-600, #475467)" }}>
            Tại Tour Travel, chúng tôi tự hào về việc cung cấp một loạt các tour
            du lịch đa dạng, từ những điểm đến kinh điển đến những nơi ít người
            biết đến, đảm bảo rằng mỗi chuyến đi của bạn sẽ đặc biệt và đáng
            nhớ. Với sự hợp tác chặt chẽ với các doanh nghiệp du lịch hàng đầu,
            chúng tôi cam kết mang lại cho bạn những dịch vụ chất lượng và đáng
            tin cậy nhất.
          </p>
          <h4 className="fw-bold mt-5">3. Kết nối với doanh nghiệp du lịch</h4>
          <p className=" mt-3" style={{ color: "var(--gray-600, #475467)" }}>
            Nhưng điều đặc biệt về Tour Travel không chỉ là việc đặt tour du
            lịch. Chúng tôi là cầu nối giữa bạn và các doanh nghiệp du lịch hàng
            đầu, cung cấp một cơ hội tuyệt vời để thúc đẩy kinh doanh của họ và
            tạo ra những trải nghiệm du lịch không thể quên cho bạn. Từ các nhà
            hàng địa phương đến các khách sạn sang trọng, từ các hướng dẫn viên
            du lịch tận tình đến các hoạt động phiêu lưu thú vị, chúng tôi làm
            việc chặt chẽ với các doanh nghiệp để mang lại những trải nghiệm tốt
            nhất cho bạn.
          </p>
          <h4 className="fw-bold mt-5">4. Sứ mệnh của Tour Travel</h4>
          <p className="mt-3" style={{ color: "var(--gray-600, #475467)" }}>
            Với sứ mệnh làm nên những kết nối vững chắc trong ngành du lịch và
            đem lại những trải nghiệm đáng nhớ cho mọi người, Tour Travel hy
            vọng sẽ là điểm đến lý tưởng cho bạn trên mỗi chuyến hành trình. Hãy
            tham gia cùng chúng tôi và khám phá thế giới một cách đầy ấn tượng
            và ý nghĩa!
          </p>
          <h4 className="fw-bold mt-5 ">5. Liên hệ chúng tôi</h4>
          <Link to="/contact">
            <Button variant="warning" className="mt-3 fs-5 mb-5">
              <IoIosSend className="fs-4" />
              LIÊN HỆ NGAY
            </Button>
          </Link>
        </Container>
      </motion.div>
    </>
  );
};
export default Introduce;
