import { useAuth } from "@/context";
import { Container } from "react-bootstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import { Suspense, lazy } from "react";
import LoadingBackdrop from "@/components/backdrop";

const OrdersList = lazy(() => import("@/components/list-order-customer"));
const ListOrder = () => {
  const { customerId } = useAuth();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container className="my-4">
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
              <Suspense fallback={<div>Loading...</div>}>
                <OrdersList customerId={customerId} />
              </Suspense>
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "0px" }} className="mt-3">
              {" "}
              <Suspense fallback={<div>Loading...</div>}>
                <OrdersList customerId={customerId} status={"Pending"} />
              </Suspense>
            </TabPanel>
            <TabPanel value="3" sx={{ padding: "0px" }} className="mt-3">
              <Suspense fallback={<div>Loading...</div>}>
                <OrdersList customerId={customerId} status={"Confirm"} />
              </Suspense>
            </TabPanel>
            <TabPanel value="4" sx={{ padding: "0px" }} className="mt-3">
              {" "}
              <Suspense fallback={<div>Loading...</div>}>
                <OrdersList customerId={customerId} status={"Complete"} />
              </Suspense>
            </TabPanel>
            <TabPanel value="5" sx={{ padding: "0px" }} className="mt-3">
              {" "}
              <Suspense fallback={<div>Loading...</div>}>
                <OrdersList customerId={customerId} status={"Cancel"} />
              </Suspense>{" "}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};
export default ListOrder;
