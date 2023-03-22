import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  Dialog,
  Paper,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";
import {  useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import {
  selectDepartDetail,
  selectStatusDepart,
} from "../../redux/depart/departSelector";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HouseIcon from "@mui/icons-material/House";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";

import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import "../../css/departDetail.scss";

import Home from "./home";
import { Form } from "./form";

const DepartDetail = () => {
  // window.scrollTo({ top: 5, behavior: "auto" });
  // const { state } = useLocation()
  const params = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, [dispatch]);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);
  const isLoading = useSelector(selectStatusDepart);

  const depart = useSelector(selectDepartDetail);

  useEffect(() => {
    document.title = depart?.name;
  }, [depart?.name]);

  const [value, setValue] = useState(0);
  const [arrayImage, setArrayImage] = useState([]);
  const [indexCurrent, setIndexCurrent] = useState(0);

  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [imageDialog, setImageDialog] = useState({
    open: false,
    value: "",
  });

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    setArrayImage(depart?.photo);
  }, [depart]);

  const handleCloseImageDialog = () => {
    setImageDialog({ open: false, value: "" });
  };
  const handleClickOpenDialogForm = () => {
    setOpenDialogForm(true);
  };

  const handleCloseDialogForm = () => {
    setOpenDialogForm(false);
  };

  const templateIconSer = (data) => {
    const result = service.find((element) => element.name === data);
    return (
      <Box className="flex flex-row flex-wrap">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginX: 2 }}
        >
          <img
            className="w-10 mx-auto"
            alt=""
            src={process.env.REACT_APP_API_URL + "/services/" + result?.photo}
          />
          <Typography align="center" className="mt-4 mb-10">
            {result?.name}
          </Typography>
        </Stack>
      </Box>
    );
  };
  const templateIconUlDepart = (data) => {
    const result = ultilitiesDepart.find((element) => element.name === data);
    return (
      <Box className=" flex flex-row flex-wrap">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginX: 2 }}
        >
          <img
            className="w-10 mx-auto"
            alt=""
            src={process.env.REACT_APP_API_URL + "/ulDepart/" + result?.photo}
          />
          <Typography align="center" className="mt-4 mb-10">
            {result?.name}
          </Typography>
        </Stack>
      </Box>
    );
  };
  const templateIconUlHouse = (data) => {
    const result = ultilitiesHouse.find((element) => element.name === data);
    return (
      <Box className="flex flex-row flex-wrap">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginX: 2 }}
        >
          <img
            className="w-10 mx-auto"
            alt=""
            src={process.env.REACT_APP_API_URL + "/ulHome/" + result?.photo}
          />
          <Typography align="center" className="mt-4 mb-10">
            {result?.name}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const moveNext = (number) => {
    console.log("number", number);

    setValue(value - number);
  };
  const movePre = (number) => {
    console.log("number", number);

    setValue(value + number);
  };

  const moveCurrent = (data) => {
    console.log(data);
    let index = depart?.photo.findIndex((e) => e === data);
    console.log("index", index);
    console.log("indexCurrent", indexCurrent);

    if (index > indexCurrent) {
      moveNext((index - indexCurrent) * 100);
      setIndexCurrent(index);
    } else if (index === indexCurrent) {
      return;
    } else {
      movePre((indexCurrent - index) * 100);
      setIndexCurrent(index);
    }
  };

  // swipe
  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (data) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = data.event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      if (data.index === depart?.photo?.length - 1) {
        return;
      } else {
        moveNext(100);
        setIndexCurrent(data.index + 1);
      }
    }

    if (diff < -5) {
      if (data.index === 0) {
        return;
      } else {
        movePre(100);
        setIndexCurrent(data.index - 1);
      }
    }

    setTouchPosition(null);
  };
  // swipe

  return (
    <Container sx={{ marginY: 10 }}>
      <Stack>
        <Paper sx={{ padding: 1 }} elevation={2}>
          <Stack
            className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row"
            sx={{ width: "auto" }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Box id="BoxGlobalSubDepartDetail">
                {arrayImage?.map((data, index) => (
                  <Box key={index} id="BoxChildSubDepartDetail">
                    <img
                      key={index}
                      src={process.env.REACT_APP_API_URL + "/departs/" + data}
                      alt=""
                      id="ImageSubDepartDetail"
                      onClick={() => moveCurrent(data)}
                    />
                  </Box>
                ))}
              </Box>

              <Box id="BoxGlobalMainDepartDetail">
                {depart?.photo?.map((data, index) => (
                  <Box
                    key={index}
                    id="BoxChildMainDepartDetail"
                    style={{ transform: `translateX(${value}%)` }}
                    onTouchStart={(e) => handleTouchStart(e)}
                    onTouchMove={(e) =>
                      handleTouchMove({ event: e, index: index })
                    }
                  >
                    <img
                      key={index}
                      src={process.env.REACT_APP_API_URL + "/departs/" + data}
                      alt=""
                      id="ImageMainDepartDetail"
                      onClick={() =>
                        setImageDialog({ open: true, value: data })
                      }
                    />
                    <Box>
                      {index === 0 ? null : (
                        <ArrowCircleLeftIcon
                          id="movePre"
                          onClick={() => {
                            movePre(100);
                            setIndexCurrent(index - 1);
                          }}
                        />
                      )}

                      {index === depart?.photo?.length - 1 ? null : (
                        <ArrowCircleRightIcon
                          id="moveNext"
                          onClick={() => {
                            moveNext(100);
                            setIndexCurrent(index + 1);
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Stack>
            <Paper
              elevation={2}
              sx={{ padding: 0.5 }}
              className="my-2 mx-0 md:mx-2 md:my-0 lg:mx-2 lg:my-0 xl:mx-2 xl:my-0"
            >
              <Box className="bg-sky-500 p-2 rounded-sm">
                <Typography className="my-2  text-slate-50 font-bold">
                  <b> {depart?.name}</b>
                </Typography>
                <Typography className="my-2  text-slate-50">
                  <PlaceIcon></PlaceIcon> {depart?.addressHouse}
                </Typography>
              </Box>
              <Box className="bg-sky-200">
                {depart?.status === "Đang khuyến mãi" ? (
                  <Typography
                    align="center"
                    className=" my-2  font-bold text-lg md:text-xl lg:text-xl xl:text-xl rounded-sm p-2"
                  >
                    <span style={{ color: "#FF1E1E" }}>
                      {" "}
                      {depart?.pricePromotion} VNĐ
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    align="center"
                    className="  my-2  font-bold text-lg md:text-xl lg:text-xl xl:text-xl  rounded-sm p-2"
                  >
                    <span style={{ color: "#FF1E1E" }}> {depart?.price} VNĐ</span>
                  </Typography>
                )}
              </Box>
              <Grid container className="mt-2">
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Typography className="my-2 ">
                    <span>
                      {" "}
                      <HouseIcon className="text-sky-600 "></HouseIcon>{" "}
                      {depart?.isDelete === false ? "Còn trống" : "Đã thuê"}
                    </span>
                  </Typography>

                  <Typography className="my-2  ">
                    <span>
                      {" "}
                      <CropSquareIcon className="text-sky-600"></CropSquareIcon>{" "}
                      {depart?.length} * {depart?.width} m2
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Typography className="my-2  ">
                    <span>
                      {" "}
                      <HotelIcon className="text-sky-600"></HotelIcon>{" "}
                      {depart?.bedroom} phòng ngủ
                    </span>
                  </Typography>
                  <Typography className="my-2  ">
                    <span>
                      {" "}
                      <BathtubIcon className="text-sky-600"></BathtubIcon>{" "}
                      {depart?.bathroom} phòng WC
                    </span>
                  </Typography>
                </Grid>
              </Grid>

              <Divider className="mt-4 mb-8" />

              <Button
                sx={{
                  display: "block",
                  margin: "auto",
                  width: 250,
                  height: 50,
                }}
                className="
                 text-slate-50 bg-sky-500 font-bold  hover:bg-sky-700 flex gap-6"
                onClick={() => {
                  handleClickOpenDialogForm();
                }}
              >
                <MailIcon></MailIcon>
                Đăng ký tư vấn
              </Button>
            </Paper>
          </Stack>
        </Paper>

        <Box>
          <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
            THÔNG TIN CHI TIẾT
          </Typography>
          <Typography>
            Tên căn hộ: <span> {depart?.name}</span>
          </Typography>
          <Typography>
            Loại căn hộ: <span> {depart?.type}</span>
          </Typography>
          <Typography>
            Diện tích (dài * rộng):{" "}
            <span>
              {" "}
              {depart?.length} * {depart?.width} m2
            </span>{" "}
          </Typography>
          <Typography>
            Số phòng ngủ: <span> {depart?.bedroom} phòng</span>
          </Typography>
          <Typography>
            Số phòng vệ sinh: <span> {depart?.bathroom} phòng</span>
          </Typography>
          {depart?.status === "Đang khuyến mãi" ? (
            <Box>
              <Typography>
                Gía gốc:{" "}
                <span className="text-red-500 line-through text-lg">
                  {" "}
                  {depart?.price} VNĐ
                </span>
              </Typography>
              <Typography>
                Gía Khuyến mãi:{" "}
                <span className="text-red-500 text-lg"> {depart?.pricePromotion} VNĐ</span>
              </Typography>
            </Box>
          ) : (
            <Typography>
              Gía thuê căn hộ:{" "}
              <span className="text-red-500 text-lg"> {depart?.price} VNĐ</span>
            </Typography>
          )}
          <Typography>
            Đặt cọc: <span> {depart?.depositMoney}</span>
          </Typography>

          <Typography>
            Mô tả về căn hộ:  <span  style={{whiteSpace: 'pre'}}>{(depart?.description)?.replace(/-/g, '\n- ')}</span>{" "}
          </Typography>
          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            CHI PHÍ
          </Typography>
          <Typography>
            Tiền điện: <span className="text-red-500"> {depart?.electricMoney} VNĐ/kw</span>{" "}
          </Typography>
          <Typography>
            Tiền nước: <span className="text-red-500"> {depart?.waterMoney} VNĐ/người</span>
          </Typography>
          <Typography>
            Chi phí khác: <span> {depart?.anotherMoney}</span>
          </Typography>
          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            THÔNG TIN TÒA NHÀ SỞ HỮU
          </Typography>
          <Typography>
            Tên tòa nhà sở hữu: <span>{depart?.nameHouse}</span>
          </Typography>
          <Typography>
            Địa chỉ tòa nhà: <span> {depart?.addressHouse}</span>
          </Typography>
          <Typography>
            Mô tả tiện ích xung quanh tòa nhà: <span>{depart?.descriptionHouse}</span>
          </Typography>

          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            NHỮNG DỊCH VỤ ĐÃ BAO GỒM GIÁ THUÊ
          </Typography>
          <Box className="py-6 flex flex-wrap">
            {depart?.service?.map((data) => templateIconSer(data))}
          </Box>

          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            TIỆN ÍCH BÊN TRONG CĂN HỘ
          </Typography>
          <Box className="py-6 flex flex-wrap">
            {depart?.ultilitiesDepart?.map((data) =>
              templateIconUlDepart(data)
            )}
          </Box>

          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            TIỆN ÍCH BÊN TRONG TÒA NHÀ
          </Typography>
          <Box className="py-6 flex flex-wrap">
            {depart?.ultilitiesHouse?.map((data) => templateIconUlHouse(data))}
          </Box>
          <Divider variant="middle" />
        </Box>
        <Dialog
          maxWidth={"lg"}
          open={imageDialog.open}
          onClose={handleCloseImageDialog}
        >
          <img
            key={imageDialog.value}
            src={
              process.env.REACT_APP_API_URL + "/departs/" + imageDialog.value
            }
            alt=""
            style={{ display: "block", margin: "auto" }}
          ></img>
        </Dialog>
      </Stack>

      <Divider className="mt-12 mb-4" />
      <Divider className="mb-12 mt-4" />
      {openDialogForm === true ? (
        <Form
          open={openDialogForm}
          handleCallbackCloseDialog={handleCloseDialogForm}
        ></Form>
      ) : null}
      {isLoading === true || arrayImage?.length === 0 ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Home></Home>
    </Container>
  );
};

export default DepartDetail;
