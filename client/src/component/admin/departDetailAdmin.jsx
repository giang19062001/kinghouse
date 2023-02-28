import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Paper,
  Dialog,
  Backdrop,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CategoryIcon from "@mui/icons-material/Category";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PlaceIcon from "@mui/icons-material/Place";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
const DepartDetailAdmin = () => {
  // window.scrollTo({ top: 5, behavior: "auto" });

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);
  const depart = useSelector(selectDepartDetail);
  const [value, setValue] = useState(0);
  const [arrayImage, setArrayImage] = useState([]);
  const [indexCurrent, setIndexCurrent] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();
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
    <Container sx={{ marginY: 20 }}>
      <Stack>
        <Paper sx={{ padding: 1 }} elevation={2}>
          <Stack className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
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
                    className=" my-2  font-bold text-lg md:text-lg lg:text-xl xl:text-xl rounded-sm p-2"
                  >
                    <b style={{ color: "#FF1E1E" }}>
                      {" "}
                      {depart?.pricePromotion} VNĐ
                    </b>
                  </Typography>
                ) : (
                  <Typography
                    align="center"
                    className="  my-2  font-bold text-lg md:text-lg lg:text-xl xl:text-xl  rounded-sm p-2"
                  >
                    <b style={{ color: "#FF1E1E" }}> {depart?.price} VNĐ</b>
                  </Typography>
                )}
              </Box>
              <Grid container className="mt-2">
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Typography className="my-2 ">
                    <b>
                      {" "}
                      <CategoryIcon className="text-green-700 "></CategoryIcon>{" "}
                      {depart?.type}
                    </b>
                  </Typography>
                  <Typography className="my-2  ">
                    <b>
                      {" "}
                      <CropSquareIcon className="text-orange-600"></CropSquareIcon>{" "}
                      {depart?.length} * {depart?.width} m2
                    </b>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
                  <Typography className="my-2   ">
                    <b>
                      {" "}
                      <ElectricBoltIcon className="text-yellow-400 "></ElectricBoltIcon>{" "}
                      {depart?.electricMoney} đ/kw
                    </b>
                  </Typography>
                  <Typography className="my-2  ">
                    <b>
                      {" "}
                      <InvertColorsIcon className="text-sky-600 "></InvertColorsIcon>
                      {depart?.waterMoney} đ/người
                    </b>
                  </Typography>
                </Grid>
              </Grid>
              <Button
                sx={{ display: "block", margin: "auto", width: 250 }}
                disabled
              ></Button>
            </Paper>
          </Stack>
        </Paper>

        <Box>
          <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
            THÔNG TIN CHI TIẾT
          </Typography>
          <Typography>
            Tên căn hộ: <b> {depart?.name}</b>
          </Typography>
          <Typography>
            Loại căn hộ: <b> {depart?.type}</b>
          </Typography>
          {depart?.status === "Đang khuyến mãi" ? (
            <Box>
              <Typography>
                Gía gốc:{" "}
                <b className="text-red-500 line-through ">
                  {" "}
                  {depart?.price} VNĐ
                </b>
              </Typography>
              <Typography>
                Gía Khuyến mãi:{" "}
                <b className="text-red-500"> {depart?.pricePromotion} VNĐ</b>
              </Typography>
            </Box>
          ) : (
            <Typography>
              Gía thuê căn hộ:{" "}
              <b className="text-red-500"> {depart?.price} VNĐ</b>
            </Typography>
          )}

          <Typography>
            Diện tích (dài * rộng):{" "}
            <b>
              {" "}
              {depart?.length} * {depart?.width} m2
            </b>{" "}
          </Typography>
          <Typography>
            Mô tả về căn hộ: <i>{depart?.description}</i>{" "}
          </Typography>
          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            CHI PHÍ
          </Typography>
          <Typography>
            Tiền điện: <b> {depart?.electricMoney} đ/kw</b>{" "}
          </Typography>
          <Typography>
            Tiền nước: <b> {depart?.waterMoney} đ/người</b>
          </Typography>

          <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
            THÔNG TIN TÒA NHÀ SỞ HỮU
          </Typography>
          <Typography>
            Tên tòa nhà sở hữu: <b>{depart?.nameHouse}</b>
          </Typography>
          <Typography>
            Địa chỉ tòa nhà: <b> {depart?.addressHouse}</b>
          </Typography>
          <Typography>
            Mô tả tiện ích xung quanh tòa nhà: <i>{depart?.descriptionHouse}</i>
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
    </Container>
  );
};

export default DepartDetailAdmin;
