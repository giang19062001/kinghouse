import {
    Box,
    Container,
    Typography,
    Divider,
    Stack,

  } from "@mui/material";

  import {  useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchDepartDetail } from "../../redux/depart/departThunk";
  import { selectDepartDetail } from "../../redux/depart/departSelector";
  import { Carousel } from "3d-react-carousal";
  import { templateIcon } from "../../util/templateIcon";

  const DepartDetailAdmin = () => {
    const params = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchDepartDetail(params.id));
    }, [dispatch, params.id]);

  
    const depart = useSelector(selectDepartDetail);
  
  
  
    const slides = depart?.photo?.map((data, index) => (
      <img
        className="hover:cursor-grabbing		rounded-lg "
        src={process.env.REACT_APP_API_URL + "/departs/" + data}
        alt={index}
        key={index}
      />
    ));
    // console.log("slides", slides);
  
    return (
      <Container sx={{ marginY: 10 }}>
        {depart === undefined ? (
          <p>Loading...</p>
        ) : (
          <Stack>
            <Box className="mb-2">
              {slides === undefined ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <Carousel slides={slides} autoplay={false} interval={0} />
                  <br />
                  <hr />
                </div>
              )}
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
                {depart?.service?.map((data, index) => templateIcon(data))}
              </Box>
  
              <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
                TIỆN ÍCH BÊN TRONG CĂN HỘ
              </Typography>
              <Box className="py-6 flex flex-wrap">
                {depart?.ultilitiesDepart?.map((data, index) =>
                  templateIcon(data)
                )}
              </Box>
  
              <Typography className="  text-sky-400 font-semibold mb-6  bg-slate-50 shadow  p-2 mt-6  font-sans">
                TIỆN ÍCH BÊN TRONG TÒA NHÀ
              </Typography>
              <Box className="py-6 flex flex-wrap">
                {depart?.ultilitiesHouse?.map((data, index) =>
                  templateIcon(data)
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
  