import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BLUE_COLOR, GREEN_COLOR, RED_COLOR } from "@/constants";
import LoadingBackdrop from "@/components/backdrop";
import { useAuth } from "@/context";
import { BASE_URL_ADMIN } from "@/constants";
import userimg from "@/assets/image/profile1.png";
import businessimg from "@/assets/image/business1.png";
import adminimg from "@/assets/image/admin.png";
import addimg from "@/assets/image/add.png";
import "./list-user.scss";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const location = useLocation();
  const { token } = useAuth();

  const isHomePage = location.pathname === "/admin/list-customer";
  const isHomePage1 = location.pathname === "/admin/list-business";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isHomePage) {
          var response = await axios.get(
            `${BASE_URL_ADMIN}/get-users?role_id=1`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (isHomePage1) {
          var response = await axios.get(
            `${BASE_URL_ADMIN}/get-users?role_id=3`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          var response = await axios.get(`${BASE_URL_ADMIN}/get-admins`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        setError("Không thể tải danh sách người dùng.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isHomePage, isHomePage1]);

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter(
          (selectedRow) => selectedRow.account_id !== row.account_id
        )
      );
    }
  };

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(
      `/admin/edit-profile/${params.row.account_id}/${params.row.role_id}`
    );
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
      field: "account_id",
      headerName: "ID",
      width: 50,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 135,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        switch (params.value) {
          case "Active":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";

            break;
          case "Inactive":
            buttonColor = RED_COLOR;
            buttonColor1 = "white";

            break;
          default:
            buttonColor = "gray";
        }
        return (
          <Button
            className="col-12 py-2"
            style={{
              background: buttonColor,
              border: "0px",
              color: buttonColor1,
            }}
            onClick={() => handleRowClick(params)}
          >
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 120,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "name",
      headerName: "Tên",
      width: 220,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },

    {
      field: "birth_of_date",
      headerName: "Ngày sinh",
      width: 120,
      renderCell: (params) => (
        <span
          className="fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => handleRowClick(params)}
        >
          {format(new Date(params.value), "dd/MM/yyyy")}
        </span>
      ),
    },
    {
      field: "phone_number",
      headerName: "SĐT",
      width: 120,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 250,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
    },
  ];

  if (!isHomePage && !isHomePage1) {
    const nameIndex = columns.findIndex((column) => column.field === "status");
    if (nameIndex !== -1) {
      columns.splice(nameIndex + 1, 0, {
        field: "role_name",
        headerName: "Quyền hạn",
        width: 150,
        renderCell: (params) => (
          <div
            className="fw-bold"
            style={{ cursor: "pointer" }}
            dangerouslySetInnerHTML={{ __html: params.value }}
            onClick={() => handleRowClick(params)}
          />
        ),
      });
    }
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <LoadingBackdrop open={loading} />
      <Row>
        <Col className="col-8">
          <h3 className="fw-bold sizetextuser">
            {isHomePage ? (
              <>
                {" "}
                <img
                  src={userimg}
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                  }}
                />{" "}
                KHÁCH HÀNG
              </>
            ) : isHomePage1 ? (
              <>
                <img
                  src={businessimg}
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                  }}
                />{" "}
                DOANH NGHIỆP
              </>
            ) : (
              <>
                <img
                  src={adminimg}
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                  }}
                />{" "}
                ADMIN
              </>
            )}
          </h3>
        </Col>{" "}
        <Col className="col-4">
          {" "}
          <p className="text-end">
            {isHomePage1 ? (
              <>
                <Link
                  to="/admin/register-user/3"
                  className="text-decoration-none"
                >
                  <img
                    src={addimg}
                    className="mb-2"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </>
            ) : isHomePage ? (
              <></>
            ) : (
              <>
                <Link
                  to="/admin/register-user/2"
                  className="text-decoration-none"
                >
                  <img
                    src={addimg}
                    className="mb-2"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </>
            )}
          </p>
        </Col>
      </Row>

      <div style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pagination
          autoPageSize
          getRowId={(row) => row.account_id}
        />
      </div>
    </>
  );
};

export default ListUser;
