import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../context";
import { BASE_URL } from "../../../constants/common";
import { FaStar } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { BLUE_COLOR } from "../../../constants/color";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdEmojiTransportation } from "react-icons/md";

const ListVehicle = () => {
  const { accountId } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list-vehicles/${accountId}`
        );
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [accountId]);


  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter(
          (selectedRow) => selectedRow.vehicle_id !== row.vehicle_id
        )
      );
    }
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map(async (row) => {
          await axios.delete(`${BASE_URL}/delete-vehicle/${row.vehicle_id}`);
          setVehicles(
            vehicles.filter((item) => item.vehicle_id !== row.vehicle_id)
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
    { field: "vehicle_id", headerName: "ID", width: 50 },
    { field: "type", headerName: "Loại", width: 300 },
    { field: "description", headerName: "Mô tả", width: 300 },
  ];

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <p className="text-end">
        <Button
          variant="danger"
          onClick={handleDeleteSelected}
          className="me-2"
        >
          <MdDeleteForever className="fs-4" />
        </Button>
        <Link to="/business/add-vehicle">
          <Button style={{ background: BLUE_COLOR, border: "0px" }}>
            <MdEmojiTransportation className="fs-4" /> Thêm mới
          </Button>
        </Link>
      </p>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={vehicles}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.vehicle_id}
        />
      </div>
    </>
  );
};

export default ListVehicle;
