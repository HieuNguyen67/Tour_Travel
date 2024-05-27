import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../../constants/common";
import LoadingBackdrop from "../../../components/backdrop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { MdTour } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BLUE_COLOR } from "../../../constants/color";
import { toast } from "react-toastify";
import { useAuth } from "../../../context";
import { MdDeleteForever } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";

const PoliciesList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");
  const { token, accountId } = useAuth();

  const location = useLocation();
  const isHomePage = location.pathname === "/business/list-policies";
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (isHomePage) {
          var response = await axios.get(
            `${BASE_URL}/list-policies/${accountId}`
          );
        } else {
          var response = await axios.get(`${BASE_URL}/list-policies`);
        }

        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [isHomePage,accountId]);

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter(
          (selectedRow) => selectedRow.news_id !== row.news_id
        )
      );
    }
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (row) => {
          await axios.delete(`${BASE_URL}/delete-policy/${row.policy_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPolicies(
            policies.filter((item) => item.policy_id !== row.policy_id)
          );
          toast.success("Xoá thành công!");
          window.location.reload();
        })
      );
      setSelectedRows([]);
    } catch (error) {
      toast.success("Xoá thất bại. Vui lòng thử lại !");

      console.error("Failed to delete selected news:", error);
      setError("Failed to delete selected news");
    }
  };
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    if (isHomePage) {
      navigate(`/business/edit-policy/${params.row.policy_id}`);
    } else {
      navigate(`/admin/edit-policy/${params.row.policy_id}`);
    }
  };

  const columns = [
    {
      field: "checkbox",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <input
          type="checkbox"
          onChange={(event) => handleCheckboxChange(event, params.row)}
          style={{ width: "18px", height: "18px" }}
        />
      ),
    },
    {
      field: "policy_id",
      headerName: "ID",
      width: 60,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "policytype",
      headerName: "Loại chính sách",
      width: 200,
      renderCell: (params) => (
        <div
          className="fw-bold"
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 800,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
  ];

  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <h3 className="fw-bold mb-3"><LuShieldCheck className="fs-3"/> CHÍNH SÁCH</h3>
      {isHomePage ? (
        <>
          <Row>
            <Col>
              <p>(Không bao gồm chính sách huỷ tour)</p>
            </Col>
            <Col>
              {" "}
              <p className="text-end">
                <Button
                  variant="danger"
                  onClick={handleDeleteSelected}
                  className="me-2"
                >
                  <MdDeleteForever className="fs-4" />
                </Button>
                <Link
                  to={
                    isHomePage
                      ? "/business/add-policies"
                      : "/admin/add-policies"
                  }
                  className="text-decoration-none"
                >
                  {" "}
                  <Button style={{ background: BLUE_COLOR, border: "0px" }}>
                    <IoMdAdd />
                    <IoShieldCheckmark className="fs-4" />
                  </Button>
                </Link>
              </p>
            </Col>
          </Row>
         
        </>
      ) : (
        <></>
      )}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={policies}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
          getRowId={(row) => row.policy_id}
        />
      </div>
    </>
  );
};

export default PoliciesList;
