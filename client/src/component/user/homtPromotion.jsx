import {
    Box,
    Container,
    Avatar,
    Grid,
    Typography,

  } from "@mui/material";
  import { selectListDepart } from "../../redux/depart/departSelector";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { fetchDeparts } from "../../redux/depart/departThunk";
  import PlaceIcon from "@mui/icons-material/Place";
  import { Link } from "react-router-dom";
  
  const HomePromotion = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchDeparts());
    }, [dispatch]);
  
    const listDepart = useSelector(selectListDepart);
  
    return (
      <Container className="my-12">
        <Box>
          <Typography align="center" className="font-bold text-2xl mb-10" >
            DANH SÁCH CĂN HỘ <b className="text-yellow-400">ĐANG KHUYẾN MÃI</b>
          </Typography>
          <Grid container spacing={2}>
            {listDepart?.map((data, index) => (
                data.status === "Đang khuyến mãi"?(
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={3}
                className="ease-in duration-75 hover:shadow hover:shadow-slate-500 pb-5 hover:scale-105 rounded-lg"
              >
                <Link to={`/depart/` + data?._id}>
                  <Avatar
                    variant="square"
                    className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded mb-2"
                    src={process.env.REACT_APP_API_URL + "/departs/" + data?.photo?.[0]}
                  />
                  <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="font-bold text-md ">
                    {data?.name}
                  </Typography>
                  <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="font-bold text-sky-500 mt-2 text-sm">
                    <PlaceIcon className="w-5"></PlaceIcon>
                    {data?.districtHouse}
                  </Typography>
                  <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="text-green-600 font-bold text-md">
                  {data?.type}
                </Typography>
                  <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}} className="text-red-500 font-bold mt-2 text-sm">
                    {data?.price} VNĐ
                  </Typography>
                </Link>
              </Grid>)
              :null
            ))}
          </Grid>
        </Box>
      </Container>
    );
  };
  export default HomePromotion;
  