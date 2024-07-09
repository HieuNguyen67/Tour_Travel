import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";
import { BASE_URL_CUSTOMER, BLUE_COLOR, GREEN_COLOR, RED1_COLOR, RED_COLOR, YELLOW_COLOR } from "@/constants";
import { format } from "date-fns";
import LoadingBackdrop from "../backdrop";
import CancellationRequestDetail from "@/page/business/request-cancel-detail";
import { useAuth } from "@/context";

const CancellationRequests = ({ customerId, businessId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showModal, setShowModal] = useState(false);
const{token}=useAuth();
   const handleRowClick = (params) => {
     setSelectedRequestId(params.row.request_id);
     setShowModal(true);
   };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRequestId(null);
  };
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CUSTOMER}/list-cancellation-requests`, {
          params: {
            customerId,
            businessId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu hủy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [customerId, businessId]);

  const columns = [
    {
      field: "code_order",
      headerName: "Mã Booking",
      width: 150,
      renderCell: (params) => <span className="fw-bold">{params.value}</span>,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        let buttonColor;
        let buttonColor1;
        switch (params.value) {
          case "Pending":
            buttonColor = YELLOW_COLOR;
            buttonColor1 = "black";

            break;
          case "Confirm":
            buttonColor = GREEN_COLOR;
            buttonColor1 = "black";

            break;

          case "Reject":
            buttonColor = RED1_COLOR;
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
          >
            {params.value}
          </Button>
        );
      },
    },
    
    {
      field: "request_date",
      headerName: "Ngày yêu cầu",
      width: 200,
      renderCell: (params) => (
        <span className="fw-bold text-primary">
          {format(new Date(params.value), "dd/MM/yyyy HH:mm:ss")}
        </span>
      ),
    },
    { field: "reason", headerName: "Lý do", width: 300 },

    {
      field: "status_refund",
      headerName: "Trạng thái hoàn tiền",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            className="col-12 py-2"
            style={{
              background: RED_COLOR,
              border: "0px",
              color: "white",
            }}
          >
            {params.value === "No" ? <>Chưa hoàn tiền</> : <>Đã hoàn tiền</>}
          </Button>
        );
      },
    },
    {
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => {
        return (
          <p
          
          >
            Xem chi tiết...
          </p>
        );
      },
    },
  ];

  return (
    <>
      <LoadingBackdrop open={loading} />

      <div style={{ height: 500, width: "100%" }} className="my-4">
        <DataGrid
          rows={requests}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.request_id}
          onRowClick={handleRowClick}
        />
      </div>
      {selectedRequestId && (
        <CancellationRequestDetail
          requestId={selectedRequestId}
          show={showModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default CancellationRequests;
