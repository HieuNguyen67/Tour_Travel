import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useAuth } from "@/context";
import { BASE_URL_ADMIN } from "@/constants";

const AddCategories = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL_ADMIN}/add-newscategories`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Thêm danh mục thành công!");
      setName("");
      setSuccess(true);
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError("Failed to add news category. Please try again.");
      toast.error("Thêm danh mục thất bại!");
    }
  };

  return (
    <div>
      <Button
        variant={showForm ? "danger" : "primary"}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Huỷ" : "Thêm Danh Mục"}
      </Button>
      {showForm && (
        <div>
          <p className="fw-bold mt-3">Thêm Danh Mục:</p>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên danh mục"
                  required
                />
              </Col>
              <Col>
                <Button variant="dark" type="submit">
                  <IoMdAddCircle /> Thêm
                </Button>
              </Col>
            </Row>
          </form>
          {error && <p>{error}</p>}
          {success && <p>Category added successfully!</p>}
        </div>
      )}
    </div>
  );
};

export default AddCategories;
