import React from "react";
import { Backdrop, Container, LinearProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const LoadingBackdrop = ({ open }) => {
  return (
    <>
      <Backdrop
        open={open}
        style={{
          zIndex: 999,
          color: "#fff",
          background: "white",
        }}
      >
        <Container>
          <Container>
            <h5 className="text-center text-dark mb-3">LOADING...</h5>
            <LinearProgress color="secondary" />
          </Container>
        </Container>
      </Backdrop>
    </>
  );
};

export default LoadingBackdrop;
