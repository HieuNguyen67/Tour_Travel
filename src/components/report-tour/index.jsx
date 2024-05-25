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
  const handleReportTour = async (e) => {
    e.preventDefault();
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
      <p
        onClick={handleShow}
        style={{ cursor: "pointer" }}
        className="text-decoration-underline text-end"
      >
        Tố cáo
      </p>
      {accountId ? (
        <>
          {" "}
          <Modal show={show} onHide={handleClose} centered>
            <form onSubmit={handleReportTour}>
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
                      <option value="">Chọn lý do</option>
                      <option value="Tour có dấu hiệu lừa đảo">
                        Tour có dấu hiệu lừa đảo
                      </option>
                      <option
                        value="Tour có hình ảnh, nội dung phản cảm hoặc có thể gây
                      phản cảm"
                      >
                        Tour có hình ảnh, nội dung phản cảm hoặc có thể gây phản
                        cảm
                      </option>
                      <option value="Giá cả không minh bạch">
                        Giá cả không minh bạch
                      </option>
                      <option value="Nội dung sai lệch hoặc gây hiểu lầm">
                        Nội dung sai lệch hoặc gây hiểu lầm
                      </option>
                      <option value="Vi phạm bản quyền">
                        Vi phạm bản quyền
                      </option>
                      <option value="Gian lận trong đánh giá và xếp hạng">
                        Gian lận trong đánh giá và xếp hạng
                      </option>
                      <option value="Lạm dụng quảng cáo">
                        Lạm dụng quảng cáo
                      </option>
                      <option value="Vi phạm quyền riêng tư">
                        Vi phạm quyền riêng tư
                      </option>
                      <option value="Phản hồi và hỗ trợ khách hàng kém">
                        Phản hồi và hỗ trợ khách hàng kém
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
                <Button
                type="submit"
                  style={{ background: RED1_COLOR, border: "0px" }}                >
                  Gửi tố cáo
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReportTour;
