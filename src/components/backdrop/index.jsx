import React from "react";
import { Backdrop, Container, LinearProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { helix } from 'ldrs'

helix.register()


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
            <div className="text-center">
              {" "}
              <l-helix size="150" speed="1.6" color="black"></l-helix>
            </div>
          </Container>
        </Container>
      </Backdrop>
    </>
  );
};

export default LoadingBackdrop;
