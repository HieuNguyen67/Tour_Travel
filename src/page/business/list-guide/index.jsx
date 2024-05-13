import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BLUE_COLOR, GREEN_COLOR, RED_COLOR } from "../../../constants/color";
import LoadingBackdrop from "../../../components/backdrop";
import { BASE_URL } from "../../../constants/common";
import { useAuth } from "../../../context";

const ListGuide = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const location = useLocation();
const {accountId,token}=useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get-guides-by-business?account_business_id=${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        setError("Không thể tải danh sách người dùng.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accountId]);

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter(
          (selectedRow) => selectedRow.profile_id !== row.profile_id
        )
      );
    }
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (row) => {
          await axios.delete(
            `http://localhost:5020/v1/api/admin/delete-users/${row.profile_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(users.filter((item) => item.profile_id !== row.profile_id));
          toast.success("Xoá thành công!");
          window.location.reload();
        })
      );
      setSelectedRows([]);
    } catch (error) {
      toast.error("Xoá thất bại. Vui lòng thử lại !");

      console.error("Failed to delete selected news:", error);
      setError("Failed to delete selected news");
    }
  };
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(
      `/business/edit-profile/${params.row.account_id}/${params.row.role_id}`
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
      field: "profile_id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
          onClick={() => handleRowClick(params)}
        />
      ),
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
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <LoadingBackdrop open={loading} />
        <p className="text-end">
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            className="me-2"
          >
            <MdDeleteForever className="fs-4" />
          </Button>

          <Link to="/business/add-guide" className="text-decoration-none">
            {" "}
            <Button style={{ background: BLUE_COLOR, border: "0px" }}>
              <AiOutlineUserAdd className="fs-3" />
            </Button>
          </Link>
        </p>
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pagination
            autoPageSize
            getRowId={(row) => row.guide_id}
          />
        </div>
    </>
  );
};

export default ListGuide;
