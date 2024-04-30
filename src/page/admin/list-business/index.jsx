import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { MdAddBusiness } from "react-icons/md";

const ListBusiness = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5020/v1/api/admin/get-users?role_id=3"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        setError("Không thể tải danh sách người dùng.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (profileId) => {
    try {
      await axios.delete(
        `http://localhost:5020/v1/api/admin/delete-users/${profileId}`
      );
      setUsers(users.filter((user) => user.profile_id !== profileId));
    } catch (error) {
      console.error("Lỗi khi xoá người dùng:", error);
      setError("Không thể xoá người dùng.");
    }
  };

  const columns = [
    { field: "profile_id", headerName: "Profile ID", width: 130 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "name", headerName: "Tên", width: 240 },
    {
      field: "birth_of_date",
      headerName: "Ngày sinh",
      width: 120,
      renderCell: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    },
    { field: "phone_number", headerName: "SĐT", width: 120 },
    { field: "address", headerName: "Địa chỉ", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "delete",
      headerName: "Xoá",
      width: 70,
      renderCell: (params) => (
        <Button
          variant="danger"
          onClick={() => handleDeleteUser(params.row.profile_id)}
        >
          <MdDeleteForever className="fs-5" />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Sửa",
      width: 70,
      renderCell: (params) => (
        <Link
          to={`/admin/edit-profile/${params.row.account_id}/${params.row.role_id}`}
        >
          <Button variant="warning">
            <LiaEditSolid className="fs-5" />
          </Button>
        </Link>
      ),
    },
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ height: 400, width: "100%" }} className="mt-lg-5 mt-2">
        <p className="text-end">
          <Link to="/admin/register-business">
            {" "}
            <Button >
              <MdAddBusiness className="fs-3" />
            </Button>
          </Link>
        </p>

        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          getRowId={(row) => row.profile_id}
        />
      </div>
    </>
  );
};

export default ListBusiness;
