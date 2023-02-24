import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  Dialog,Paper, LinearProgress
} from "@mui/material";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import "../../css/departDetail.scss";

import Home from "./home";
import { Form } from "./form";

const DepartDetail = () => {
  // window.scrollTo({ top: 5, behavior: "auto" });

  const params = useParams();
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
  const [value, setValue] = useState(0);
  const [arrayImage,setArrayImage] = useState([])
  const [indexCurrent, setIndexCurrent] = useState(0);


  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [imageDialog, setImageDialog] = useState({
    open: false,
    value: "",
  });
 
  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);
  useEffect(()=>{
     setArrayImage(depart?.photo)
  },[depart])

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
      <div className="flex flex-row flex-wrap">
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
      </div>
    );
  };
  const templateIconUlDepart = (data) => {
    const result = ultilitiesDepart.find((element) => element.name === data);
    return (
      <div className=" flex flex-row flex-wrap">
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
      </div>
    );
  };
  const templateIconUlHouse = (data) => {
    const result = ultilitiesHouse.find((element) => element.name === data);
    return (
      <div className="flex flex-row flex-wrap">
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
      </div>
    );
  };

  const moveNext = (number) => {
    console.log("number",number)

    setValue(value - number)

  };
  const movePre = (number) => {
    console.log("number",number)

      setValue(value + number)
     
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
        <Paper sx={{padding:1}} elevation={2}>
        <Stack direction="row" justifyContent="center" alignItems="center" >
          <Box id="BoxGlobalSubDepartDetail">
            {
              arrayImage?.map((data, index) => (
                <Box
                  key={index}
                  id="BoxChildSubDepartDetail"
                >
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
                onTouchMove={(e) => handleTouchMove({ event: e, index: index })}
              >
                <img
                  key={index}
                  src={process.env.REACT_APP_API_URL + "/departs/" + data}
                  alt=""
                  id="ImageMainDepartDetail"
                  onClick={() => setImageDialog({ open: true, value: data })}
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
        </Paper>
       

        <Box>
          <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
            THÔNG TIN CĂN HỘ
          </Typography>
          <Typography>
            Tên căn hộ: <b> {depart?.name}</b>
          </Typography>
          <Typography>
            Loại căn hộ: <b> {depart?.type}</b>
          </Typography>
          {depart?.status === "Đang khuyến mãi" ? (
            <div>
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
            </div>
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
          <Box className="py-6 ">
            <Typography className=" float-left font-bold mb-6">
              Mọi chi tiết vui lòng liên hệ số: {process.env.REACT_APP_PHONE}{" "}
              hoặc đăng ký tư vấn tại đây
            </Typography>
            <Button
              sx={{ display: "block", margin: "auto" }}
              className="float-none  md:float-right lg:float-right xl:float-right
                 text-slate-50 bg-sky-500 font-bold  hover:bg-sky-700"
              onClick={() => {
                handleClickOpenDialogForm();
              }}
            >
              Đăng ký tư vấn
            </Button>
          </Box>
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
      {isLoading === true || arrayImage.length === 0? (
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
