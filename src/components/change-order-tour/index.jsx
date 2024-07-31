import {  RED1_COLOR } from "@/constants";
import { useAuth } from "@/context";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

const ChangeOrderTour = ({ tourId, order_id }) => {
  const { businessId, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [tours, setTours] = useState([]);
  const [tourCode, setTourCode] = useState(tourId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        if(businessId){  
          const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BUSINESS}/list-tours/${businessId}/Active`
        );
        setTours(response.data);
        setLoading(false);
      }
      
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, [businessId]);

  const handleChangeTour = async () => {
    setLoading2(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL_BUSINESS}/change-order-tour/${order_id}`,
        {
          tourCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật thành công!");
      navigate("/business/list-tour");
    } catch (error) {
        toast.error(error.response.data.message);
      console.error("Failed to update orders tour :", error);
    }
    setLoading2(false);
  };
    if (loading) return <p>Loading...</p>;


  return (
    <>
      <div className="my-3">
        <form>
          <FormControl
            fullWidth
            className="shadow rounded"
            color="warning"
            size="small"
          >
            <InputLabel id="demo-simple-select-label">Tour</InputLabel>
            <Select
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tour"
              sx={{
                background: "white",
              }}
              value={tourCode}
              onChange={(e) => setTourCode(e.target.value)}
              required
            >
              {tours.map((item) => (
                <MenuItem key={item.tour_id} value={item.tour_id}>
                  ({item.tour_code}-{item.tour_id}) {item.tour_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="my-3" style={{ display: "grid", placeItems: "end" }}>
            <Button
              onClick={handleChangeTour}
              disabled={loading2}
              style={{ background: RED1_COLOR, border: "0px" }}
              className="mb-3 py-3 col-lg-3 col-12"
            >
              <FaCheck className="fs-4" />{" "}
              {loading2 ? <>Loading...</> : <>Xác Nhận Chuyển Tour</>}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ChangeOrderTour;
