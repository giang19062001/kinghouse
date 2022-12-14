import { Box, Container, Typography, Divider, Stack,Dialog,Skeleton } from "@mui/material";

import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
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


const DepartDetailAdmin = () => {
  window.scrollTo({ top: 5, behavior: "auto" });

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

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);


  const templateIconSer = (data) => {
    const result = service.find((element) => element.name === data);
    return (
      <div className="flex flex-row flex-wrap">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{marginX:2}}
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
          sx={{marginX:2}}
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
          sx={{marginX:2}}
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

  return (
    <Container sx={{ marginY: 20 }}>
      {Object.keys(depart)?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Stack>
       
          <Box className="pt-2">
            <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
              TH??NG TIN C??N H???
            </Typography>
            <Typography>
              T??n c??n h???: <b> {depart?.name}</b>
            </Typography>
            <Typography>
              Lo???i c??n h???: <b> {depart?.type}</b>
            </Typography>
            {depart?.status === "??ang khuy???n m??i"?(
              <div>
              <Typography>
              G??a g???c:{" "}
              <b className="text-red-500 line-through "> {depart?.price} VN??</b>
              </Typography>
               <Typography>
               G??a Khuy???n m??i:{" "}
               <b className="text-red-500"> {depart?.pricePromotion} VN??</b>
               </Typography>
               </div>
            ):(
              <Typography>
              G??a thu?? c??n h???:{" "}
              <b className="text-red-500"> {depart?.price} VN??</b>
            </Typography>
            )}
            <Typography>
              Di???n t??ch (d??i * r???ng):{" "}
              <b>
                {" "}
                {depart?.length} * {depart?.width} m2
              </b>{" "}
            </Typography>
            <Typography>
              M?? t??? v??? c??n h???: <i>{depart?.description}</i>{" "}
            </Typography>
            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              CHI PH??
            </Typography>
            <Typography>
              Ti???n ??i???n: <b> {depart?.electricMoney}??/kw</b>{" "}
            </Typography>
            <Typography>
              Ti???n n?????c: <b> {depart?.waterMoney}??/ng?????i</b>
            </Typography>

            
            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TH??NG TIN T??A NH?? S??? H???U
            </Typography>
            <Typography>
              T??n t??a nh?? s??? h???u: <b>{depart?.nameHouse}</b>
            </Typography>
            <Typography>
              ?????a ch??? t??a nh??: <b> {depart?.addressHouse}</b>
            </Typography>
            <Typography>
              M?? t??? ti???n ??ch xung quanh t??a nh??:{" "}
              <i>{depart?.descriptionHouse}</i>
            </Typography>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              NH???NG D???CH V??? ???? BAO G???M GI?? THU??
            </Typography>
            <Box className=" py-6 flex flex-wrap">
              {depart?.service?.map((data, index) => templateIconSer(data))}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TI???N ??CH B??N TRONG C??N H???
            </Typography>
            <Box className="py-6 flex flex-wrap">
              {depart?.ultilitiesDepart?.map((data, index) =>
                templateIconUlDepart(data)
              )}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TI???N ??CH B??N TRONG T??A NH??
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


