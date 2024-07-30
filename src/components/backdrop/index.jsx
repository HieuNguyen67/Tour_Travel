import React from "react";
import { Backdrop, Container, LinearProgress } from "@mui/material";
import { useLocation } from "react-router-dom";


import { square } from 'ldrs'

square.register()


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
              <l-square
                size="150"
                stroke="6"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="1.2"
                color="#161108"
              ></l-square>
            </div>
          </Container>
        </Container>
      </Backdrop>
    </>
  );
};

export default LoadingBackdrop;
