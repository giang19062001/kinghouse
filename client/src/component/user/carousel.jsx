import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@mui/material";
import Search from "./search";

const CarouselComponent = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
        <Box>
          <img
            alt=""
            src={require("../../assets/carousel1.jpg")}
            id="imgCarousel"
          />
        </Box>
        <Box>
          <img
            alt=""
            src={require("../../assets/carousel2.jpg")}
            id="imgCarousel"
          />
        </Box>
        <Box>
          <img
            alt=""
            src={require("../../assets/carousel3.jpg")}
            id="imgCarousel"
          />
        </Box>
      </Carousel>
      <Box sx={{ position: "absolute", top: 30,left:50, width: "100%",backgroundColor:"white" }}>
        
      </Box>
    </Box>
  );
};
export default CarouselComponent;
