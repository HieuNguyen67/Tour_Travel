import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED1_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "@/constants";
import { useAuth } from "@/context";
import refundimg from "@/assets/image/refund.png";
import { Button } from "react-bootstrap";
import LoadingBackdrop from "@/components/backdrop";
import RefundDetailsModal from "../refund-detail";
import LazyLoad from "react-lazyload";

const RefundsList = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [selectedRefundId, setSelectedRefundId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_ADMIN}/list-refunds`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRefunds(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu hoàn tiền:", error);
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const handleRowClick = (params) => {
    setSelectedRefundId(params.row.refund_id);
    setShowModal(true);
  };

  const columns = [
    {
      field: "code_order",
      headerName: "Mã booking",
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
          case "Refunded":
            buttonColor = RED_COLOR;
            buttonColor1 = "white";

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
            {params.value === "Pending" ? (
              <>Chờ xác nhận</>
            ) : params.value === "Refunded" ? (
              <>Đã hoàn tiền</>
            ) : (
              <>Đã từ chối</>
            )}
          </Button>
        );
      },
    },
    {
      field: "refund_amount",
      headerName: "Số tiền cần hoàn",
      width: 150,
      renderCell: (params) => (
        <span className="fw-bold text-danger">{formatPrice(params.value)}</span>
      ),
    },
    {
      field: "status_payment",
      headerName: "Trạng thái Thanh toán",
      width: 170,
      renderCell: (params) => (
        <span>
          {params.value === "Unpaid" ? (
            <>
              <Button
                style={{ background: BLUE_COLOR, border: "0px" }}
                className="col-12"
              >
                Chưa thanh toán
              </Button>
            </>
          ) : (
            <Button
              style={{ background: GREEN_COLOR, border: "0px" }}
              className="col-12 text-dark"
            >
              Đã thanh toán
            </Button>
          )}
        </span>
      ),
    },
    {
      field: "note",
      headerName: "Ghi chú",
      width: 300,
      renderCell: (params) => <span className="fw-bold">{params.value}</span>,
    },
  ];

  return (
    <>
      <LoadingBackdrop open={loading} />
      <h3 className="fw-bold">
        {" "}
        <img
          src={refundimg}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        REFUNDS
      </h3>{" "}
      <LazyLoad>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={refunds}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.refund_id}
            onRowClick={handleRowClick}
          />
        </div>
      </LazyLoad>
      <RefundDetailsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        refundId={selectedRefundId}
      />
    </>
  );
};

export default RefundsList;
