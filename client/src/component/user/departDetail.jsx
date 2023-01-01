import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  DialogContent,
  Dialog,
  Skeleton,
} from "@mui/material";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import { selectDepartDetail } from "../../redux/depart/departSelector";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps,
} from "react-stacked-center-carousel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "../../css/carouselmg.scss";
import Home from "./home";
import { Form } from "./form";
import { borderRadius, maxWidth } from "@mui/system";

const DepartDetail = () => {
  window.scrollTo({ top: 5, behavior: "auto" });

  const ref = React.useRef();

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);

  const depart = useSelector(selectDepartDetail);
  const [openDialogForm, setOpenDialogForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);

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

  // console.log("data", data);

  return (
    <Container sx={{ marginY: 10 }}>
      {Object.keys(depart)?.length === 0 ? (
        <p>Loading... depart</p>
      ) : (
        <Stack>
          <Box>
            {depart.photo.length !== 0 ? (
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  marginBottom: 20,
                }}
              >
                <ResponsiveContainer
                  carouselRef={ref}
                  render={(parentWidth, carouselRef) => {
                    let currentVisibleSlide = 5;
                    if (parentWidth <= 1440) currentVisibleSlide = 3;
                    if (parentWidth <= 1080) currentVisibleSlide = 3;

                    return (
                      <StackedCarousel
                        ref={carouselRef}
                        slideComponent={Card}
                        slideWidth={parentWidth < 800 ? parentWidth - 120 : 750}
                        carouselWidth={parentWidth}
                        data={depart.photo}
                        currentVisibleSlide={currentVisibleSlide}
                        maxVisibleSlide={5}
                        customScales={[1, 0.85, 0.7, 0.55]}
                        transitionTime={450}
                        useGrabCursor={true}
                      />
                    );
                  }}
                />
                <>
                  <ArrowCircleLeftIcon
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: 10,
                      zIndex: 10,
                    }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      ref.current?.goBack();
                    }}
                  ></ArrowCircleLeftIcon>
                  <ArrowCircleRightIcon
                    style={{
                      position: "absolute",
                      top: "40%",
                      right: 10,
                      zIndex: 10,
                    }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      ref.current?.goNext();
                    }}
                  ></ArrowCircleRightIcon>
                </>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Box>
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
              Tiền điện: <b> {depart?.electricMoney} đ/kw</b>{" "}
            </Typography>
            <Typography>
              Tiền nước: <b> {depart?.waterMoney} đ/người</b>
            </Typography>

            <Typography>
              Mô tả về căn hộ: <i>{depart?.description}</i>{" "}
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
              Mô tả tiện ích xung quanh tòa nhà:{" "}
              <i>{depart?.descriptionHouse}</i>
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
              {depart?.ultilitiesHouse?.map((data) =>
                templateIconUlHouse(data)
              )}
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
        </Stack>
      )}
      <Divider className="mt-12 mb-4" />
      <Divider className="mb-12 mt-4" />
      {openDialogForm === true ? (
        <Form
          open={openDialogForm}
          handleCallbackCloseDialog={handleCloseDialogForm}
        ></Form>
      ) : null}
      <Home></Home>
    </Container>
  );
};

export default DepartDetail;

export const Card = React.memo(function (props) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const { photo } = data[dataIndex] || {};

  const [imageDialog, setImageDialog] = useState({
    open: false,
    value: "",
  });
  const handleCloseImageDialog = () => {
    setImageDialog({ open: false, value: "" });
  };
  return photo !== undefined ? (
    <div>
      <div className="twitch-card" draggable={false}>
        <div className={`cover fill`}>
          <div
            className="card-overlay fill"
            onClick={() => {
              if (!isCenterSlide) {
                swipeTo(slideIndex);
              } else {
                setImageDialog({ open: true, value: photo });
              }
            }}
          />
          <img
            key={photo}
            className="cover-image fill"
            src={process.env.REACT_APP_API_URL + "/departs/" + photo}
            alt=""
          />
        </div>
      </div>
      <Dialog
        maxWidth={"lg"}
        open={imageDialog.open}
        onClose={handleCloseImageDialog}
      >
        <img
          key={photo}
          src={process.env.REACT_APP_API_URL + "/departs/" + imageDialog.value}
          alt=""
          style={{ display: "block", margin: "auto" }}
        ></img>
      </Dialog>
    </div>
  ) : (
    <div>
      <div className="twitch-card" draggable={false}>
        <div className={`cover fill`}>
          <div
            className="card-overlay fill"
            onClick={() => {
              if (!isCenterSlide) {
                swipeTo(slideIndex);
              }
            }}
          >
            <Skeleton
                      key={photo}

              animation="wave"
              sx={{ bgcolor: "grey.300" }}
              variant="rectangular"
              width={700}
              height="65vmin"
              className="cover-image fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
