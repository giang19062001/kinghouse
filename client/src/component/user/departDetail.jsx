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
import { Carousel } from "3d-react-carousal";
import { templateIcon } from "../../util/templateIcon";
import { styled } from "@mui/material/styles";
import { postForm } from "../../redux/form/formThunk";
import { selectSuccessForm } from "../../redux/form/formSelector";
import { turnOffSuccess } from "../../redux/form/formSlice";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
  },
});

const DepartDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const successForm = useSelector(selectSuccessForm);

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id));
  }, [dispatch, params.id]);

  
  useEffect(() => {
    if(successForm === true ){
      setOpenDialogSuccess(true)
    }
  }, [successForm]);

  const depart = useSelector(selectDepartDetail);

  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
    depart: "",
  });

  const handleClickOpenDialogForm = () => {
    setOpenDialogForm(true);
  };

  const handleCloseDialogForm = () => {
    setOpenDialogForm(false);
  };
  const handleCloseDialogSuccess = () => {
    setOpenDialogForm(false);
    setOpenDialogSuccess(false);
    dispatch(turnOffSuccess())
  };


  const handleChange = (event) => {
    setDataForm((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSend = () => {
    if(dataForm.name === "admin" && dataForm.phone === "123" && dataForm.email === "admin@123"){
      navigate("/admin/depart")
    }else{
    dispatch(postForm(dataForm));
    }
  };

  const slides = depart?.photo?.map((data, index) => (
    <img
      className="hover:cursor-grabbing rounded-lg w-max h-max "
      src={process.env.REACT_APP_API_URL + "/departs/" + data}
      alt={index}
      key={index}
    />
  ));

  return (
    <Container sx={{ marginY: 10 }}>
      {depart === undefined ? (
        <p>Loading...</p>
      ) : (
        <Stack>
          <Box className="mb-2 ">
            {slides === undefined ? (
              <p>Loading...</p>
              
            ) : (
              <div>
                <Carousel slides={slides} autoplay={false} interval={1} />
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
            <Box className="py-6 flex flex-wrap">
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
            <Box className="py-6 ">
              <Typography className=" float-left font-bold mb-6">
                Mọi chi tiết vui lòng liên hệ số: 0901.311.113 hoặc đăng ký tư
                vấn tại đây
              </Typography>
              <Button
                sx={{display:"block",margin:"auto"}}
                className="float-none  md:float-right lg:float-right xl:float-right
                 text-slate-50 bg-sky-500 font-bold  hover:bg-yellow-400"
                onClick={() => {
                  handleClickOpenDialogForm();
                  setDataForm((preState) => ({
                    ...preState,
                    depart: depart?._id,
                  }));
                }}
              >
                Đăng ký tư vấn
              </Button>
            </Box>
          </Box>

          <Dialog
            open={openDialogForm}
            onClose={handleCloseDialogForm}
            maxWidth="sm"
            fullWidth
          >
            <Typography id="idTitle">ĐĂNG KÝ TƯ VẤN</Typography>
            <Divider />
            <DialogContent>
              <Stack spacing={2} sx={{ paddingY: 2 }}>
                <CssTextField
                  type="text"
                  name="name"
                  label="Họ và tên"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <PersonIcon></PersonIcon>,
                  }}
                ></CssTextField>
                <CssTextField
                  type="number"
                  name="phone"
                  label="Số điện thoại"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <LocalPhoneIcon></LocalPhoneIcon>,
                  }}
                ></CssTextField>
                <CssTextField
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <EmailIcon></EmailIcon>,
                  }}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="note"
                  onChange={handleChange}
                  label="Nội dung tư vấn"
                  multiline
                  rows={4}
                ></CssTextField>
                <Divider />
              </Stack>
            </DialogContent>
            <Button id="idButton" onClick={handleSend}>
              GỬI
            </Button>
          </Dialog>

          <Dialog open={openDialogSuccess} onClose={handleCloseDialogSuccess}>
            <DialogContent>
              <img
                src={require("../../assets/tick-xanh.png")}
                alt=""
                width={200}
                 style={{display:"block",margin:"auto"}}
              ></img>
              <Typography align="center">Đăng ký tư vấn thành công. Vui lòng đợi sẽ có bộ phận liên hệ tư vấn cho bạn. Xin cảm ơn</Typography>
            </DialogContent>
          </Dialog>
        </Stack>
      )}
    </Container>
  );
};

export default DepartDetail;
