import paymentimg from "@/assets/image/payment.png";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import PaymentsList from "@/components/list-payments";

const Payments = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
      <h3 className="fw-bold">
        {" "}
        <img
          src={paymentimg}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        PAYMENTS
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
              <Tab label="ĐÃ THANH TOÁN" value="1" />
              <Tab label="CHƯA THANH TOÁN" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ padding: "0px" }} className="mt-3">
            <PaymentsList status={"Paid"} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px" }} className="mt-3">
            <PaymentsList status={"Unpaid"} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default Payments;
