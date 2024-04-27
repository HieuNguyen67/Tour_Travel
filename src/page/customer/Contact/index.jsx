import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const Contact = () => {
 
  return (
    <>
    

      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mb-5 pb-5 mt-5 pt-5">
          <Row className="mt-5">
            <Col className="col-md-5 col-12">
              <p>
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <hr className="hr" />

                <p>
                  <strong>Điện thoại : </strong>(028) 38 505 520
                  <br />
                  <strong>Email : </strong>contact@stu.edu.vn
                </p>
              </p>
            </Col>
            <Col className="mt-md-0 mt-4 ">
              <p>
                <h3>LIÊN HỆ CHÚNG TÔI</h3>
                <hr className="hr" />
              </p>
              <Form >
                <Row className="d-flex flex-row py-2">
                  <Col className="col-6 pe-2 ">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Họ tên"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="col-6 ps-2 ">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Địa chỉ"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex flex-row py-2 ">
                  <Col className="col-6 pe-2 ">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Điện thoại"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="col-6 ps-2">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Email"
                        className="shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex flex-row py-2 mb-4 ">
                  <Col className="col-12 ">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Nội dung"
                        className="py-5 shadow-sm "
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="warning" className="shadow-sm">
                  GỬI THÔNG TIN LIÊN HỆ
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </>
  );
};
export default Contact;
