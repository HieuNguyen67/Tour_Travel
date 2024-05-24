import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/common";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdReportProblem } from "react-icons/md";
import { Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { useAuth } from "../../context";
import { Navigate, useNavigate } from "react-router-dom";
import { RED1_COLOR } from "../../constants/color";
import { toast } from "react-toastify";

const ReportTour = ({tourId, accountId}) => {
  const [typeReport, setTypeReport] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => { if(accountId){
setShow(true);
  } else{
    navigate("/login");
  } };

  const navigate=useNavigate();
  const handleReportTour = async () => {
    try {
        if (accountId) {
          const response = await axios.post(
            `${BASE_URL}/report-tour/${tourId}/${accountId}`,
            {
              type_report: typeReport,
              description,
            }
          );
          setSuccessMessage(response.data.message);
          setError("");
          setTypeReport("");
          setDescription("");
          setShow(false);
        toast.success("Gửi tố cáo thành công!");
        }
    } catch (error) {
      setError("Error reporting tour: " + error.response.data.error);
      setSuccessMessage("");
      toast.error("Gửi tố cáo thất bại!");
    }
  };

  return (
    <>
      <p onClick={handleShow} style={{cursor:'pointer'}} className="text-decoration-underline text-end">
        Tố cáo
      </p>
      {accountId ? (
        <>
          {" "}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <MdReportProblem className="fs-1 text-danger" />
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="font-family">
                    <CiBoxList className="fs-4" /> Chọn lý do:
                  </Form.Label>
                  <Form.Select
                    required
                    value={typeReport}
                    onChange={(e) => setTypeReport(e.target.value)}
                  >
                    <option>Chọn lý do</option>
                    <option value="Không đúng thông tin">
                      Không đúng thông tin
                    </option>
                    <option value="Dịch vụ kém chất lượng">
                      Dịch vụ kém chất lượng
                    </option>
                    <option value="Vấn đề về an toàn">Vấn đề về an toàn</option>
                    <option value="Hành vi không đạo đức hoặc không đúng quy định">
                      Hành vi không đạo đức hoặc không đúng quy định
                    </option>
                    <option value="Không hài lòng về dịch vụ hoặc chất lượng">
                      Không hài lòng về dịch vụ hoặc chất lượng
                    </option>
                    <option value="Phát ngôn gian lận hoặc gây gổ">
                      Phát ngôn gian lận hoặc gây gổ
                    </option>
                    <option value="Không tuân thủ các quy định về môi trường và bảo vệ tự nhiên">
                      Không tuân thủ các quy định về môi trường và bảo vệ tự
                      nhiên
                    </option>
                    <option value="Vấn đề về đạo đức và văn hóa">
                      Vấn đề về đạo đức và văn hóa
                    </option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="font-family">
                    <FaEdit className="fs-4" /> Mô tả tố cáo:
                  </Form.Label>
                  <Form.Control
                    style={{ height: "10rem" }}
                    as="textarea"
                    placeholder="Mô tả tố cáo"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{background: RED1_COLOR, border:'0px'}} onClick={handleReportTour}>Gửi tố cáo</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
};

export default ReportTour;
