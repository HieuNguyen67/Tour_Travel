import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import "./BackToTop.scss";
import { motion } from "framer-motion";
import { SiUpptime } from "react-icons/si";
import { Container } from "react-bootstrap";
import Chatbox from "../chatbox";
import { useAuth } from "@/context";
import topimg from "@/assets/image/top.png";


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
   const { role } = useAuth();

  return (
    <React.Fragment>
      <div id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <img
            src={topimg}
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </motion.div>
      </ScrollTop>
      {role == 2 || role == 3 || role == 4 || role == 5 || role == 6 ? (
        <> </>
      ) : (
        <>
          <Container>
            <Chatbox />
          </Container>
        </>
      )}
    </React.Fragment>
  );
}
