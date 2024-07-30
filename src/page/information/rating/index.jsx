import { Col, Container, Row } from "react-bootstrap";
import React, { Suspense, lazy } from "react";
import feedbackimg from "@/assets/image/feedback.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import ListRateTour from "@/components/list-rate-tour";

const Rating = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
      <Container className="my-3">
        <h4 className="fw-bold">
          {" "}
          <img
            src={feedbackimg}
            className="mb-2"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />{" "}
          ĐÁNH GIÁ NHẬN XU
        </h4>
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
                <Tab label="CHƯA ĐÁNH GIÁ" value="1" />
                <Tab label="ĐÃ ĐÁNH GIÁ" value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1" sx={{ padding: "0px" }} className="mt-3">
              <ListRateTour statusRating={"Not Rated"} />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "0px" }} className="mt-3">
              <ListRateTour statusRating={"Rated"} />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};
export default Rating;
