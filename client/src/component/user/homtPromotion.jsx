import {
  Box,
  Container,
  Avatar,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  selectListDepart,
  selectStatusDepart,
} from "../../redux/depart/departSelector";
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
  const isLoading = useSelector(selectStatusDepart);

  return (
    <Container className="my-12">
      <Typography align="center" className="font-bold text-2xl mb-10">
        DANH SÁCH CĂN HỘ <b className="text-yellow-400">ĐANG KHUYẾN MÃI</b>
      </Typography>
      {isLoading === true ? (
        <div>
          <Grid container spacing={0}>
            <Grid item xs={6} sm={4} md={3} lg={3} xl={3} className="py-3">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 rounded-lg"
              />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={3} xl={3} className="py-3">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 rounded-lg"
              />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={3} xl={3} className="py-3">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 rounded-lg"
              />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={3} xl={3} className="py-3">
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 rounded-lg"
              />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="80%" />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Box>
          <Grid container spacing={0}>
            {listDepart?.map((data, index) =>
              data.status === "Đang khuyến mãi" ? (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={3}
                  xl={3}
                  className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3 hover:scale-105 rounded-lg "
                >
                  <Link to={`/depart/` + data?._id} className="relative">
                    <Typography className="absolute top-0 right-5 z-50 text-red-600 font-bold line-through ">
                      {data?.price} đ
                    </Typography>
                    <Avatar
                      variant="square"
                      className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded mb-2 mx-auto"
                      src={
                        process.env.REACT_APP_API_URL +
                        "/departs/" +
                        data?.photo?.[0]
                      }
                    ></Avatar>
                    <Typography
                      sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                      className="font-bold text-md "
                    >
                      {data?.name}
                    </Typography>
                    <Typography
                      sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                      className="font-bold text-sky-500 mt-2 text-sm"
                    >
                      <PlaceIcon className="w-5"></PlaceIcon>
                      {data?.districtHouse}
                    </Typography>
                    <Typography
                      sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                      className="text-green-600 font-bold text-md"
                    >
                      {data?.type}
                    </Typography>
                    <Typography
                      sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                      className="text-red-500 font-bold mt-2 text-sm"
                    >
                      {data?.pricePromotion} VNĐ
                    </Typography>
                  </Link>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
export default HomePromotion;
