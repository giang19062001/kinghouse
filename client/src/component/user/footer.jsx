import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
const Footer = () => {
  return (
    <Box sx={{ bottom: 0, width: "100%" }}>
      <AppBar position="static" className="py-12" id="background">
        <Container>
          <Grid container spacing={6}>
            <Grid item md={4}>
              <img
                src={require("../../assets/logoKingH.jpg")}
                alt=""
                className="mx-auto w-40 rounded-full"
              ></img>
              <Typography
                className="text-neutral-900 font-bold my-6"
                align="center"
              >
                KING HOUSE - Nâng tầm giá trị sống
              </Typography>
              <Typography className="text-neutral-900 font-bold" align="center">
                &copy; Website be develop by{" "}
                <a className="text-red-700" href="/">
                  {" "}
                  ASTROTECH.VN{" "}
                </a>
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography className="text-neutral-900 font-bold pb-3">
                HOTLINE
              </Typography>
              <Typography className="bg-slate-50 rounded-full text-neutral-900 font-bold p-2">
                &emsp; <PhoneIcon></PhoneIcon> &emsp;
                {process.env.REACT_APP_AUTH_PHONE}
              </Typography>
              <Typography className="text-neutral-900 font-bold pb-3 pt-8">
                EMAIL
              </Typography>
              <Typography className="bg-slate-50 rounded-full text-neutral-900 font-bold p-2">
                &emsp; <EmailIcon></EmailIcon> &emsp;{" "}
                {process.env.REACT_APP_EMAIL}
              </Typography>
            </Grid>
            <Grid item md={4}>
            <Typography className="text-neutral-900 font-bold pb-3">
                FACEBOOK
              </Typography>
            <Typography
                align="center"
                className="bg-slate-50 rounded-full text-sky-500 font-bold p-2"
              >
                <a href={process.env.REACT_APP_FB}>
                  <FacebookIcon></FacebookIcon>
                  &emsp;FACEBOOK
                </a>
              </Typography>
              <Typography className="text-neutral-900 font-bold  pb-3 pt-8">
                ĐỊA CHỈ
              </Typography>
              <Typography
                align="center"
                className="bg-slate-50 rounded-full text-neutral-900  font-bold p-2 "
              >
                <PlaceIcon></PlaceIcon>
                &emsp;{process.env.REACT_APP_ADDRESS}
              </Typography>

            
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Footer;
