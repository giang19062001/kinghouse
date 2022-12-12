import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  DialogContent,
  Dialog,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import { selectDepartDetail } from "../../redux/depart/departSelector";
import { styled } from "@mui/material/styles";
import { postForm } from "../../redux/form/formThunk";
import { selectSuccessForm } from "../../redux/form/formSelector";
import { turnOffSuccess } from "../../redux/form/formSlice";
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
  StackedCarouselSlideProps 
} from "react-stacked-center-carousel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import '../../css/carouselmg.scss'

const DepartDetailAdmin = () => {
  window.scrollTo({ top: 5, behavior: "smooth" });

  const ref = React.useRef();
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);
  const depart = useSelector(selectDepartDetail);

  const params = useParams();
  const dispatch = useDispatch();
  const [data,setData] = useState()

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    const arr = [] 
    if (Object.keys(depart)?.length !== 0) {
      depart.photo.forEach((element) => {
        arr.push({ photo: element });
      });
      setData(arr)
    }
  }, [depart]);


  const templateIconSer = (data) => {
    const result = service.find((element) => element.name === data);
    return (
      <div className="space-x-10  flex flex-col flex-wrap">
        <img
          className="w-12 mx-auto"
          alt=""
          src={process.env.REACT_APP_API_URL + "/services/" + result?.photo}
        />
        <Typography align="center"  className="mt-4 mb-10">{result?.name}</Typography>
      </div>
    );
  };
  const templateIconUlDepart = (data) => {
    const result = ultilitiesDepart.find((element) => element.name === data);
    return (
      <div className="space-x-10 flex flex-col flex-wrap">
        <img
          className="w-12 mx-auto"
          alt=""
          src={process.env.REACT_APP_API_URL + "/ulDepart/" + result?.photo}
        />
        <Typography align="center" className="mt-4 mb-10">{result?.name}</Typography>
      </div>
    );
  };
  const templateIconUlHouse = (data) => {
    const result = ultilitiesHouse.find((element) => element.name === data);
    return (
      <div className="space-x-10 flex flex-col flex-wrap">
        <img
          className="w-12 mx-auto"
          alt=""
          src={process.env.REACT_APP_API_URL + "/ulHome/" + result?.photo}
        />
        <Typography align="center"  className="mt-4 mb-10">{result?.name}</Typography>
      </div>
    );
  };

  return (
    <Container sx={{ marginY: 10 }}>
      {Object.keys(depart)?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Stack>
          <Box className="mb-2">
          {data !== undefined ? (
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
                    if (parentWidth <= 1080) currentVisibleSlide = 1;
                    return (
                      <StackedCarousel
                        ref={carouselRef}
                        slideComponent={Card}
                        slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
                        carouselWidth={parentWidth}
                        data={data && data}
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
                      left: 30,
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
                      right: 30,
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
            ) : <p>Loading...</p>}
          </Box>
          <Box className="pt-2">
            <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
              THÔNG TIN CĂN HỘ
            </Typography>
            <Typography>
              Tên căn hộ: <b> {depart?.name}</b>
            </Typography>
            <Typography>
              Loại căn hộ: <b> {depart?.type}</b>
            </Typography>
            <Typography>
              Gía thuê căn hộ:{" "}
              <b className="text-red-500"> {depart?.price} VNĐ</b>
            </Typography>
            <Typography>
              Diện tích (dài * rộng):{" "}
              <b>
                {" "}
                {depart?.length} * {depart?.width} m2
              </b>{" "}
            </Typography>
            <Typography>
              Tiền điện: <b> {depart?.electricMoney}đ/kw</b>{" "}
            </Typography>
            <Typography>
              Tiền nước: <b> {depart?.waterMoney}đ/người</b>
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
            <Box className=" py-6 flex flex-wrap">
              {depart?.service?.map((data, index) => templateIconSer(data))}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TIỆN ÍCH BÊN TRONG CĂN HỘ
            </Typography>
            <Box className="py-6 flex flex-wrap">
              {depart?.ultilitiesDepart?.map((data, index) =>
                templateIconUlDepart(data)
              )}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TIỆN ÍCH BÊN TRONG TÒA NHÀ
            </Typography>
            <Box className="py-6 flex flex-wrap">
              {depart?.ultilitiesHouse?.map((data, index) =>
                templateIconUlHouse(data)
              )}
            </Box>
            <Divider />
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default DepartDetailAdmin;
export const Card = React.memo(function (props) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const [loadDelay, setLoadDelay] = React.useState();
  const [removeDelay, setRemoveDelay] = React.useState();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (isCenterSlide) {
      clearTimeout(removeDelay);
      setLoadDelay(setTimeout(() => setLoaded(true), 1000));
    } else {
      clearTimeout(loadDelay);
      if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
    }
  }, [isCenterSlide]);

  React.useEffect(() => () => {
    clearTimeout(removeDelay);
    clearTimeout(loadDelay);
  });

  const { photo } = data[dataIndex];

  return (
    <div className='twitch-card' draggable={false}>
        <div
          className='card-overlay fill'
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        <img
        className='cover-image fill' alt="" src={process.env.REACT_APP_API_URL + "/departs/" + photo} />
   
    </div>
  );
});