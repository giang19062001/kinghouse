import {
  Box,
  Container,
  Avatar,
  Grid,
  Typography,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  selectListDepart,
  selectStatusDepart,
} from "../../redux/depart/departSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDeparts } from "../../redux/depart/departThunk";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../util/pagination";

const PER_PAGE = 8;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);

  const listDepart = useSelector(selectListDepart);
  const isLoading = useSelector(selectStatusDepart);

  let [page, setPage] = useState(1);
  const count = Math.ceil(listDepart?.length / PER_PAGE);
  const dataPagination = usePagination(listDepart, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    dataPagination.jump(p);
  };

  return (
    <Container className="my-12">
      <Typography align="center" className="font-bold text-2xl mb-10">
        DANH SÁCH TOÀN BỘ CĂN HỘ <b className="text-sky-400">KING HOUSE</b>
      </Typography>
      {isLoading === true ? (
        <Box>
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
        </Box>
      ) : (
        <Box>
          <Box>
            <Grid container spacing={0}>
              {dataPagination?.currentData()?.map((data, index) =>
                data?.status === "Đang Hot" ? (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={3}
                    xl={3}
                    className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3  hover:scale-105 rounded-lg relative"
                  >
                    <Link 
                 to={`/depart/` + data?.name.replace(/\s+/g, '-')} state={{ id: data?._id }}                >
                    <p
                    alt=""
                    className="absolute top-5 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-red-600 text-slate-50 p-1 rounded-sm text-xs md:text-sm lg:text-md xl:text-md"
                  >Hot</p> 
                      <p className="absolute top-5 right-6 md:right-5 lg:right-5 xl:right-5 z-50 text-red-600 font-bold   bg-slate-50 rounded-full p-1 text-xs md:text-sm lg:text-md xl:text-md">
                        {data?.price} đ
                      </p>
                      {data?.isDelete === true ? (
                      <p className="absolute top-32  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-sky-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Đã thuê
                      </p>
                    ) : (
                      <p className="absolute top-32  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-green-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Còn trống
                      </p>
                    )}
                      <Avatar
                        variant="square"
                        className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded  mb-2 mx-auto"
                        src={
                          process.env.REACT_APP_API_URL +
                          "/departs/" +
                          data?.photo?.[0]
                        }
                      />
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
                        {data?.price} VNĐ
                      </Typography>
                    </Link>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={3}
                    xl={3}
                    className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3 hover:scale-105 rounded-lg relative"
                  >
                    <Link 
                     to={`/depart/` + data?.name.replace(/\s+/g, '-')} state={{ id: data?._id }}
                     >
                    <p
                    className="absolute top-5 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-yellow-400 text-slate-50 p-1 rounded-sm text-xs md:text-sm lg:text-md xl:text-md"
                  >Sale</p> 
                      <p className="absolute top-5 right-6 md:right-5 lg:right-5 xl:right-5 z-50 text-red-600 font-bold line-through  bg-slate-50 rounded-full p-1 text-xs md:text-sm lg:text-md xl:text-md">
                        {data?.price} đ
                      </p>
                      {data?.isDelete === true ? (
                      <p className="absolute top-32  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-sky-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Đã thuê
                      </p>
                    ) : (
                      <p className="absolute top-32  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-green-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Còn trống
                      </p>
                    )}
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
                )
              )}
            </Grid>
          </Box>
          <Stack className="flex justify-center items-center py-12">
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
};
export default Home;
