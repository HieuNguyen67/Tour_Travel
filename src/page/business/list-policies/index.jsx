import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "@/constants";
import LoadingBackdrop from "@/components/backdrop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import policyimg from "@/assets/image/policy.png";
import addimg from "@/assets/image/add.png";
import deleteimg from "@/assets/image/delete.png";
import refundimg from "@/assets/image/refund.png";


const PoliciesList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");
  const { token, businessId, role } = useAuth();

  const location = useLocation();
  const isHomePage = location.pathname === "/business/list-policies";
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        if (isHomePage) {
          var response = await axios.get(
            `${BASE_URL}/list-policies/${businessId}`
          );
        } else {
          var response = await axios.get(
            `${BASE_URL}/list-policies-cancellation/${businessId}`
          );
        }

        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [isHomePage, businessId]);

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
      if(!isHomePage){ await Promise.all(
        selectedRows.map(async (row) => {
          await axios.delete(`${BASE_URL}/delete-policy/${row.policy_id}`, {
            params: { role: 2 },
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
      );}else{
         await Promise.all(
           selectedRows.map(async (row) => {
             await axios.delete(`${BASE_URL}/delete-policy/${row.policy_id}`, {
               params: { role: 3 },
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
      }
     
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
      navigate(`/business/edit-policy-cancellation/${params.row.policy_id}`);
    }
  };
if(isHomePage){
var columns = [
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

}else{
  var columns = [
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
      field: "days_before_departure",
      headerName: "Ngày trước khi khởi hành",
      width: 350,
      renderCell: (params) => (
        <div
          className="fw-bold"
          onClick={() => handleRowClick(params)}
        >
         trong vòng {params.value} ngày trước khởi hành
        </div>
      ),
    },
    {
      field: "refund_percentage",
      headerName: "% Hoàn tiền",
      width: 800,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleRowClick(params)}
        >Hoàn {params.value}%</div>
      ),
    },
  ];

}
  
  return (
    <>
      {" "}
      <LoadingBackdrop open={loading} />
      <h3 className="fw-bold sizetextuser1">
        {isHomePage ? (
          <>
            {" "}
            <img
              src={policyimg}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />{" "}
            CHÍNH SÁCH/ QUY ĐỊNH TOUR
          </>
        ) : (
          <>
            {" "}
            <img
              src={refundimg}
              className="mb-2"
              style={{
                width: "4rem",
                height: "4rem",
                objectFit: "cover",
              }}
            />{" "}
            CHÍNH SÁCH HOÀN TRẢ
          </>
        )}
      </h3>
      {isHomePage ? (
        <>
          <Row>
            <Col>
              <p className="mt-3">
                (Không bao gồm chính sách huỷ tour hoàn tiền)
              </p>
            </Col>
            <Col>
              {" "}
              <p className="text-end">
                <img
                  onClick={handleDeleteSelected}
                  src={deleteimg}
                  className=" me-2"
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />{" "}
                <Link
                  to="/business/add-policies"
                  className="text-decoration-none"
                >
                  {" "}
                  <img
                    src={addimg}
                    className=""
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </p>
            </Col>
          </Row>
        </>
      ) : (
        <>
          {" "}
          <Row>
            <Col>
              {" "}
              <div className="text-end mb-2">
                <img
                  onClick={handleDeleteSelected}
                  src={deleteimg}
                  className=" me-2"
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />{" "}
                <Link
                  to="/business/add-policies-cancellation"
                  className="text-decoration-none"
                >
                  {" "}
                  <img
                    src={addimg}
                    className=""
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </div>
            </Col>
          </Row>
        </>
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
