import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useAuth } from "@/context";
import LoadingBackdrop from "@/components/backdrop";
import logfileimg from "@/assets/image/logfile.png";
import LazyLoad from "react-lazyload";

const AdminActionsList = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchAdminActions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/list-admin-actions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActions(response.data);
      } catch (error) {
        console.error("Failed to fetch admin actions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminActions();
  }, []);

  const columns = [
    { field: "admin_name", headerName: "Quản trị viên", width: 150 },
    { field: "object_name", headerName: "Đối tượng", width: 200 },
    { field: "action", headerName: "Hành động", width: 300 },
    {
      field: "action_time",
      headerName: "Thời gian",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy HH:mm:ss")}
        </span>
      ),
    },
  ];

  return (
    <>
      <LoadingBackdrop open={loading} />
      <h3 className="fw-bold mb-3">
        <img
          src={logfileimg}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        LOG GIÁM SÁT
      </h3>{" "}
      <LazyLoad>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={actions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.admin_action_id}
          />
        </div>
      </LazyLoad>
    </>
  );
};

export default AdminActionsList;
