import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Stack,
  Dialog,

} from "@mui/material";

import { useState, useEffect,  } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import { selectDepartDetail, selectStatusDepart } from "../../redux/depart/departSelector";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "../../css/departDetail.scss";

import Home from "./home";
import { Form } from "./form";

const DepartDetail = () => {
  // window.scrollTo({ top: 5, behavior: "auto" });

  const ref = React.useRef();

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
  const isLoading = useSelector(selectStatusDepart)

  const depart = useSelector(selectDepartDetail);
  const [arrayImages, setArrayImages] = useState();
  const [arrayImagesSub, setArrayImagesSub] = useState();

  useEffect(()=>{
    setArrayImages(depart.photo)
    setArrayImagesSub(depart.photo)
  },[depart.photo])
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [imageDialog, setImageDialog] = useState({
    open: false,
    value: "",
  });
  const handleCloseImageDialog = () => {
    setImageDialog({ open: false, value: "" });
  };
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

  const [value, setValue] = useState(0);
  const moveNext = (data) => {
    setValue(value - 100);

    // let fristElement = arrayImagesSub[0];

    // let arrayAfterRemove = arrayImagesSub.filter(
    //   (element) => element !== fristElement
    // );

    setArrayImagesSub([...arrayImagesSub, data]);
  };
  const movePre = (data) => {
    setValue(value + 100);

    // let lastElement = arrayImagesSub[arrayImagesSub.length - 1];
    // let arrayAfterRemove = arrayImagesSub.filter(
    //   (element) => element !== lastElement
    // );
    setArrayImagesSub([data, ...arrayImagesSub]);
  };


  console.log("arrayImages", arrayImages);
  return (
    <Container sx={{ marginY: 10 }}>
      
        <Stack>
          <Stack
            className="bg-slate-50"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box id="BoxGlobalSubDepartDetail">
              {arrayImagesSub?.map((data, index) => (
                <Box
                  key={data}
                  id="BoxChildSubDepartDetail"
                  style={{ transform: `translateY(${value}%)` }}
                >
                  <img
                    key={data}
                    src={process.env.REACT_APP_API_URL + "/departs/" + data}
                    alt=""
                    id="ImageSubDepartDetail"
                    onClick={() => setImageDialog({ open: true, value: data })}

                  />
                </Box>
              ))}
            </Box>

            <Box id="BoxGlobalMainDepartDetail">
              {arrayImages?.map((data, index) => (
                <Box
                  key={data}
                  id="BoxChildMainDepartDetail"
                  style={{ transform: `translateX(${value}%)` }}
                >
                  <img
                    key={data}
                    src={process.env.REACT_APP_API_URL + "/departs/" + data}
                    alt=""
                    id="ImageMainDepartDetail"
                    onClick={() => setImageDialog({ open: true, value: data })}
                  />
                  <Box>
                    {index === 0?(
                      null
                    ):(
                      <ArrowCircleLeftIcon
                      id="movePre"
                      onClick={() => movePre(data)}
                    />
                    )}
                  
                     {index === arrayImages.length -1 ?(
                      null
                     ):(
                      <ArrowCircleRightIcon
                      id="moveNext"
                      onClick={() => moveNext(data)}
                    />
                     )}
                 
                  </Box>
                </Box>
              ))}
            </Box>
          </Stack>

          <Box>
            <Typography className=" text-sky-400 font-semibold mb-6 bg-slate-50 shadow  p-2 mt-6 font-sans">
              TH??NG TIN C??N H???
            </Typography>
            <Typography>
              T??n c??n h???: <b> {depart?.name}</b>
            </Typography>
            <Typography>
              Lo???i c??n h???: <b> {depart?.type}</b>
            </Typography>
            {depart?.status === "??ang khuy???n m??i" ? (
              <div>
                <Typography>
                  G??a g???c:{" "}
                  <b className="text-red-500 line-through ">
                    {" "}
                    {depart?.price} VN??
                  </b>
                </Typography>
                <Typography>
                  G??a Khuy???n m??i:{" "}
                  <b className="text-red-500"> {depart?.pricePromotion} VN??</b>
                </Typography>
              </div>
            ) : (
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
              Ti???n ??i???n: <b> {depart?.electricMoney} ??/kw</b>{" "}
            </Typography>
            <Typography>
              Ti???n n?????c: <b> {depart?.waterMoney} ??/ng?????i</b>
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
            <Box className="py-6 flex flex-wrap">
              {depart?.service?.map((data) => templateIconSer(data))}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TI???N ??CH B??N TRONG C??N H???
            </Typography>
            <Box className="py-6 flex flex-wrap">
              {depart?.ultilitiesDepart?.map((data) =>
                templateIconUlDepart(data)
              )}
            </Box>

            <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
              TI???N ??CH B??N TRONG T??A NH??
            </Typography>
            <Box className="py-6 flex flex-wrap">
              {depart?.ultilitiesHouse?.map((data) =>
                templateIconUlHouse(data)
              )}
            </Box>
            <Divider variant="middle" />
            <Box className="py-6 ">
              <Typography className=" float-left font-bold mb-6">
                M???i chi ti???t vui l??ng li??n h??? s???: {process.env.REACT_APP_PHONE}{" "}
                ho???c ????ng k?? t?? v???n t???i ????y
              </Typography>
              <Button
                sx={{ display: "block", margin: "auto" }}
                className="float-none  md:float-right lg:float-right xl:float-right
                 text-slate-50 bg-sky-500 font-bold  hover:bg-sky-700"
                onClick={() => {
                  handleClickOpenDialogForm();
                }}
              >
                ????ng k?? t?? v???n
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
        {isLoading === true ?(
           <Backdrop
           sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={isLoading}
         >
           <CircularProgress color="inherit" />
         </Backdrop>
      ):null}
      <Home></Home>
    </Container>
  );
};

export default DepartDetail;
