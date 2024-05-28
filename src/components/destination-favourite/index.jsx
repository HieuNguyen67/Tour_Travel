import { Col, Row } from "react-bootstrap";
import {
  DESTINATION_FAVOURITE,
  DESTINATION_FAVOURITE_FOREIGN,
} from "../../constants/common";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";

const DestinationFavourite = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const renderCarouselItems = (items) => {
    return items.map((item) => (
      <motion.div
        key={item.id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}
      >
        <Link className="text-decoration-none" to={item.link}>
          <Col className="">
            <div className="py-3">
              <img src={item.image} className="imgdestination px-2  rounded-4" />
            </div>
          </Col>
        </Link>
      </motion.div>
    ));
  };

  return (
    <div className="my-2">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="NỘI ĐỊA" value="1" className="fw-bold" />
              <Tab label="NƯỚC NGOÀI" value="2" className="fw-bold" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "0px" }} className="pt-2">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
            >
              {renderCarouselItems(DESTINATION_FAVOURITE)}
            </Carousel>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0px" }} className="pt-2">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
            >
              {renderCarouselItems(DESTINATION_FAVOURITE_FOREIGN)}
            </Carousel>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default DestinationFavourite;
