import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import tourimg from "@/assets/image/tour.png";
import addimg from "@/assets/image/add.png";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ManageTour from "@/components/manage-tour";
const TourList = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Row>
        <Col className="col-8">
          <h3 className="fw-bold">
            {" "}
            <img
              src={tourimg}
              className="mb-2 "
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
            />{" "}
            LIST TOUR
          </h3>
        </Col>
        <Col>
          <p className="text-end">
            <Link to="/business/add-tour/1" className="text-decoration-none">
              <img
                src={addimg}
                className="mb-2"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </Link>
          </p>
        </Col>
      </Row>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              variant="fullWidth"
              textColor="secondary"
              indicatorColor="secondary"
              sx={{background:'white'}}
            >
              <Tab label="ĐANG HOẠT ĐỘNG" value="1" />
              <Tab label="ĐÃ DIỄN RA" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "0px" }}>
            <ManageTour status_tour={"Active"} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px" }}>
            <ManageTour status_tour={"Inactive"} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default TourList;
