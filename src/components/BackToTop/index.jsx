import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import messenger from "../../assets/image/messenger.png";
import zalo from "../../assets/image/logo-white-2048x1943.png";
import "./BackToTop.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandPointUp } from "react-icons/fa6";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 24, zIndex: "1" }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
export default function BackToTop(props) {
  return (
    <React.Fragment>
      <div id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="small"
            variant="warning"
            className="rounded py-2 shadow-sm fs-5 "
          >
            <FaHandPointUp />
          </Button>
        </motion.div>
      </ScrollTop>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Nhấn để được tư vấn.</Tooltip>}
      >
        <div className="messenger">
          <Link>
            <motion.div
              animate={{ scale: 0.8 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <img src={messenger} />
            </motion.div>
          </Link>
        </div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Nhấn để được tư vấn.</Tooltip>}
      >
        <div className="zalo ">
          <Link>
            <motion.div
              animate={{ scale: 0.8 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <img src={zalo} className="rounded-circle shadow-sm" />
            </motion.div>
          </Link>
        </div>
      </OverlayTrigger>
    </React.Fragment>
  );
}
