import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import LoadingBackdrop from "@/components/backdrop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import policyimg from "@/assets/image/policy.png";
import addimg from "@/assets/image/add.png";
import deleteimg from "@/assets/image/delete.png";
import refundimg from "@/assets/image/refund.png";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Suspense, lazy } from "react";
import LazyLoad from "react-lazyload";

const ListPoliciesCancel = lazy(() => import("@/components/list-policies-cancel"));

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
            `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-policies/${businessId}`
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
      
        await Promise.all(
          selectedRows.map(async (row) => {
            await axios.delete(
              `${process.env.REACT_APP_BASE_URL_BUSINESS}/delete-policy/${row.policy_id}`,
              {
                params: { role: 3 },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
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
    const data = {policy_id : params.row.policy_id};

    if (isHomePage) {
      navigate(`/business/edit-policy`,{state: data});
    } else {
      navigate(`/business/edit-policy-cancellation`, { state: data });
    }
  };
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

      const [value, setValue] = React.useState("1");

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  

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
              loading="lazy"
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
              loading="lazy"
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
                  loading="lazy"
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
                    loading="lazy"
                  />
                </Link>
              </p>
            </Col>
          </Row>
        </>
      ) : (
        <> </>
      )}
      {isHomePage ? (
        <>
          {" "}
          <LazyLoad>
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
          </LazyLoad>
        </>
      ) : (
        <>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="TOUR TRONG NƯỚC" value="1" />
                  <Tab label="TOUR NƯỚC NGOÀI" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Suspense fallback={<div>Loading...</div>}>
                  <ListPoliciesCancel
                    businessId={businessId}
                    type={"Trong nước"}
                  />{" "}
                </Suspense>
              </TabPanel>
              <TabPanel value="2">
                {" "}
                <Suspense fallback={<div>Loading...</div>}>
                  <ListPoliciesCancel
                    businessId={businessId}
                    type={"Nước ngoài"}
                  />
                </Suspense>
              </TabPanel>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default PoliciesList;
