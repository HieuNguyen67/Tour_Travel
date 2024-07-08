import { BASE_URL_BUSINESS } from "@/constants";
import { useAuth } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import addimg from "@/assets/image/add.png";
import deleteimg from "@/assets/image/delete.png";
import { Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
const ListPoliciesCancel = ({ businessId , type}) => {
      const [policies, setPolicies] = useState([]);
      const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");
  const {token} = useAuth();


  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        var response = await axios.get(
          `${BASE_URL_BUSINESS}/list-policies-cancellation/${businessId}?type=${type}`
        );

        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [businessId]);

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
               `${BASE_URL_BUSINESS}/delete-policy/${row.policy_id}`,
               {
                 params: { role: 2 },
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
       navigate(`/business/edit-policy-cancellation/${params.row.policy_id}`);
     
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
         field: "days_before_departure",
         headerName: "Ngày trước khi khởi hành",
         width: 350,
         renderCell: (params) => (
           <div className="fw-bold" onClick={() => handleRowClick(params)}>
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
           >
             Hoàn {params.value}%
           </div>
         ),
       },
     ];
   
  return (
    <>
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
              loading="lazy"
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
                loading="lazy"
              />
            </Link>
          </div>
        </Col>
      </Row>
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
export default ListPoliciesCancel;