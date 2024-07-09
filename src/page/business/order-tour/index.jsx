import OrdersList from "@/components/list-order-customer";
import { useAuth } from "@/context";
import { Container } from "react-bootstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import listorderimg from "@/assets/image/listorder.png";

const OrderTour = () => {
    const { businessId } = useAuth();
    const [value, setValue] = React.useState("1");
    const {token}=useAuth();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
      <h3 className="fw-bold">
        {" "}
        <img
          src={listorderimg}
          className="mb-2 "
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />
        DANH SÁCH BOOKING
      </h3>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          bgcolor: "background.paper",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              background: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="TẤT CẢ" value="1" />
              <Tab label="CHỜ XÁC NHẬN" value="2" />
              <Tab label="ĐÃ XÁC NHẬN" value="3" />
              <Tab label="ĐÃ HOÀN THÀNH" value="4" />
              <Tab label="ĐÃ HUỶ" value="5" />
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ padding: "0px" }} className="mt-3">
            <OrdersList customerId={businessId} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px" }} className="mt-3">
            <OrdersList customerId={businessId} status={"Pending"} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: "0px" }} className="mt-3">
            <OrdersList customerId={businessId} status={"Confirm"} />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: "0px" }} className="mt-3">
            <OrdersList customerId={businessId} status={"Complete"} />
          </TabPanel>
          <TabPanel value="5" sx={{ padding: "0px" }} className="mt-3">
            {" "}
            <OrdersList customerId={businessId} status={"Cancel"} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default OrderTour;
