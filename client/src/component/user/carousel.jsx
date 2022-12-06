import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Box} from '@mui/material'

const CarouselComponent = () =>  {
    return (

            <Carousel autoPlay showThumbs={false} infiniteLoop={true} >
            <Box>
                <img alt="" src={require("../../assets/carousel1.jpg")} 
                 id="imgCarousel"  />
            </Box>
            <Box>
                <img alt="" src={require("../../assets/carousel2.jpg")} 
                 id="imgCarousel"/>
            </Box>
            <Box>
                <img alt="" src={require("../../assets/carousel3.jpg")} 
                 id="imgCarousel"/>
            </Box>
           
        </Carousel>

    )
}
export default CarouselComponent