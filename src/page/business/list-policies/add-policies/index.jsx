import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form } from "react-bootstrap";
import { BLUE_COLOR } from "@/constants";
import { GiConfirmed } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDescription } from "react-icons/md";

const AddPolicyForm = () => {
  const { role } = useAuth();
  const { businessId, token } = useAuth();
  const [policytype, setPolicytype] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const {policy_id}= location.state || {};
  const isHomePage = location.pathname === "/business/add-policies";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      if (!isHomePage) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL_BUSINESS}/policies/${policy_id}`,
            { params: { role: 3 } }
          );
          setPolicytype(response.data.policytype);
          setDescription(response.data.description);
        } catch (error) {
          console.error("Error fetching policy:", error);
        }
      }
    };

    fetchPolicy();
  }, [policy_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isHomePage) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/add-policies/${businessId}`,
          {
            policytype,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Policy added successfully");
        toast.success("Thêm thành công!");
        navigate("/business/list-policies");
      } catch (error) {
        console.error("Error adding policy:", error);
        setMessage("Failed to add policy");
        toast.error("Thêm thất bại!");
      }
    } else {
      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/policies/${policy_id}`,
          {
            policytype,
            description,
          },
          { params: { role: 3 } }
        );
        toast.success("Cập nhật thành công!");

        navigate("/business/list-policies");
      } catch (error) {
        console.error("Error updating policy:", error);
        toast.error("Cập nhật thất bại!");
      }
    }
  };

  return (
    <div className="px-3">
      <Link
        to={role == 3 ? "/business/list-policies" : "/business/list-policies"}
      >
        <IoArrowBackOutline className="fs-3 mb-3" />
      </Link>
      <h3 className="fw-bold my-3">
        {isHomePage ? <>THÊM CHÍNH SÁCH</> : <>CHỈNH SỬA CHÍNH SÁCH</>}
      </h3>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label className=" ">
            <IoShieldCheckmark className="fs-4" /> Loại chính sách :
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Loại chính sách"
            required
            value={policytype}
            onChange={(e) => setPolicytype(e.target.value)}
          />
        </Form.Group>
        <div>
          <label className="mb-2">
            <MdDescription className="fs-4" /> Mô tả:
          </label>
          <div
            className=""
            style={{ width: "100%", height: "28rem", background: "white" }}
          >
            <ReactQuill
              value={description}
              onChange={setDescription}
              placeholder="Content"
              required
              modules={AddPolicyForm.modules}
              formats={AddPolicyForm.formats}
              style={{ background: "white", height: "25rem" }}
            />
          </div>
        </div>
        <div className="mt-lg-0 mt-3">
          <Button
            style={{ background: BLUE_COLOR, border: "0px" }}
            type="submit"
            className="mt-1 py-3 col-lg-2 col-12 fw-bold"
          >
            <GiConfirmed className="fs-4" />
            {isHomePage ? <> Thêm chính sách</> : <> Cập nhật</>}
          </Button>{" "}
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

AddPolicyForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

AddPolicyForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "align",
  "list",
  "bullet",
];
export default AddPolicyForm;
