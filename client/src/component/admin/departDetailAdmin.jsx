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
              THÔNG TIN CĂN HỘ
            </Typography>
            <Typography>
              Tên căn hộ: <b> {depart?.name}</b>
            </Typography>
            <Typography>
              Loại căn hộ: <b> {depart?.type}</b>
            </Typography>
            {depart?.status === "Đang khuyến mãi"?(
              <div>
              <Typography>
              Gía gốc:{" "}
              <b className="text-red-500 line-through "> {depart?.price} VNĐ</b>
              </Typography>
               <Typography>
               Gía Khuyến mãi:{" "}
               <b className="text-red-500"> {depart?.pricePromotion} VNĐ</b>
               </Typography>
               </div>
            ):(
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
              Tiền điện: <b> {depart?.electricMoney}đ/kw</b>{" "}
            </Typography>
            <Typography>
              Tiền nước: <b> {depart?.waterMoney}đ/người</b>
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


