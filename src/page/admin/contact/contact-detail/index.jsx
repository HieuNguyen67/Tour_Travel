import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants/common";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress, LinearProgress } from "@mui/material";
import { Button, Container, Form } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { format } from "date-fns";
import { IoArrowBackOutline } from "react-icons/io5";
import LoadingBackdrop from "../../../../components/backdrop";
import { useAuth } from "../../../../context";
import { MdOutlineContactMail } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const ContactDetail = () => {
  const { contact_id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const { token, role } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        if (role == 2) {
          var response = await axios.get(
            `${BASE_URL}/contacts-detail/${contact_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          var response = await axios.get(
            `${BASE_URL}/contacts-detail-business/${contact_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setContact(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
        setError("Failed to fetch contact");
        setLoading(false);
      }
    };

    fetchContact();
  }, [contact_id]);
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (role == 2) {
        await axios.put(
          `${BASE_URL}/update-status-contact/${contact_id}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("News status and note updated successfully");
        toast.success("Cập nhật thành công!");
        navigate("/admin/contact");
      } else {
        await axios.put(
          `${BASE_URL}/update-status-contact-business/${contact_id}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      console.log("News status and note updated successfully");
      toast.success("Cập nhật thành công!");
      navigate("/business/list-contact");
    } catch (error) {
      console.error("Failed to update news status and note:", error);
      setError("Failed to update news status and note");
    }
  };

  if (loading)
    return (
      <div>
        <LoadingBackdrop open={loading} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!contact) return <div>Contact not found</div>;

  return (
    <div className="px-2">
      {role == 2 ? (
        <>
          <Link to="/admin/contact">
            <IoArrowBackOutline className="fs-3" />
          </Link>
        </>
      ) : (
        <>
          <Link to="/business/list-contact">
            <IoArrowBackOutline className="fs-3" />
          </Link>
        </>
      )}
      {role == 2 ? (
        <>
          <h3 className="fw-bold ">
            <MdOutlineContactMail className="fs-3 my-3 " /> LIÊN HỆ
          </h3>
        </>
      ) : (
        <>
          <h3 className="fw-bold ">
            <MdOutlineContactMail className="fs-3 my-3 " /> LIÊN HỆ TƯ VẤN
          </h3>
        </>
      )}

      <form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">
            <RxUpdate className="fs-5" /> Trạng thái:
          </Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Confirm">Confirm</option>
          </Form.Control>
        </Form.Group>
        <Button
          disabled={loading}
          type="submit"
          variant="warning"
          className="mb-3"
        >
          <FaSave /> Cập nhật
        </Button>
      </form>
      {role != 2 ? (
        <>
          {" "}
          <>
            {" "}
            <p className="fs-5 fw-bold">{contact.name}</p>
          </>
        </>
      ) : (
        <></>
      )}
      <p>
        <strong>Từ:</strong> {contact.fullname}
      </p>
      <p>
        <strong>Email:</strong> {contact.email}
      </p>
      <p>
        <strong>SĐT:</strong> {contact.phonenumber}
      </p>
      <p>
        <strong>Nội dung:</strong> {contact.message}
      </p>
      <p>
        <strong>Ngày gửi:</strong>{" "}
        {format(new Date(contact.senttime), "dd/MM/yyyy")}
      </p>
      {role == 2 ? (
        <>
          {" "}
          <p>
            <strong>Địa chỉ:</strong> {contact.address}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContactDetail;
