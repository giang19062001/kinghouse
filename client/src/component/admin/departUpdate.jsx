import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  fetchDepartDetail,
  updateDepart,
  updateImage,
} from "../../redux/depart/departThunk";
import { district, status, type } from "../../util/data";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { selectStatusDepart } from "../../redux/depart/departSelector";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
  },
});

const CssSelect = styled(Select)({
  borderRadius: "30px",
});

const CssInputLabel = styled(InputLabel)({
  // "&.Mui-focused": {
  //   color: "#facc15",
  // },
});
const DepartUpdate = () => {
  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);
  const isLoading = useSelector(selectStatusDepart);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);
  const dispatch = useDispatch();
  const params = useParams();

  const [departUpdate, setDepartUpdate] = useState({
    name: "",
    price: "",
    pricePromotion: "",
    description: "",
    width: "",
    length: "",
    status: "",
    service: [],
    ultilitiesDepart: [],
    electricMoney: "",
    waterMoney: "",
    photo: [],
    nameHouse: "",
    descriptionHouse: "",
    districtHouse: "",
    addressHouse: "",
    ultilitiesHouse: [],
  });
  const [openSucces, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartDetail(params.id)).then((res) => {
      setDepartUpdate(res.payload);
    });
  }, [dispatch, params.id]);

  const handleChangeCheckbox = (event) => {
    console.log(event.target.checked, event.target.value, [event.target.name]);

    if (event.target.name === "service") {
      if (event.target.checked) {
        setDepartUpdate((preState) => ({
          ...preState,
          service: [...preState.service, event.target.value],
        }));
      } else {
        setDepartUpdate((preState) => ({
          ...preState,
          service: preState.service.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    } else if (event.target.name === "ultilitiesHouse") {
      if (event.target.checked) {
        setDepartUpdate((preState) => ({
          ...preState,
          ultilitiesHouse: [...preState.ultilitiesHouse, event.target.value],
        }));
      } else {
        setDepartUpdate((preState) => ({
          ...preState,
          ultilitiesHouse: preState.ultilitiesHouse.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    } else {
      if (event.target.checked) {
        setDepartUpdate((preState) => ({
          ...preState,
          ultilitiesDepart: [...preState.ultilitiesDepart, event.target.value],
        }));
      } else {
        setDepartUpdate((preState) => ({
          ...preState,
          ultilitiesDepart: preState.ultilitiesDepart.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    }
  };

  const handleChange = (event) => {
    setDepartUpdate((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCloseDialogSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseDialogError = () => {
    setOpenError(false);
  };

  const hanldeUpdate = () => {
    dispatch(updateDepart(departUpdate)).then((res) => {
      if (!res.error) {
        setOpenSuccess(true);
        setDepartUpdate(res.payload);
      } else {
        setOpenError(true);
      }
    });
  };

  const handleDeleteImage = (image) => {
    const data = { _id: departUpdate._id, photo: image };
    dispatch(deleteImage(data)).then((res) => {
      if (!res.error) {
        setDepartUpdate(res.payload);
      } else {
        setOpenError(true);
      }
    });
  };
  const handleupdateImage = (event) => {
    const data = { _id: departUpdate._id, photo: event.target.files };
    dispatch(updateImage(data)).then((res) => {
      if (!res.error) {
        setDepartUpdate(res.payload);
      } else {
        setOpenError(true);
      }
    });
  };

  console.log(departUpdate);
  return (
    <Container sx={{ marginY: 20 }}>
      <Box>
        <Paper elevation={6} className=" p-12">
          <p className="p">
            <span className="fancy">Chỉnh sửa căn hộ</span>
          </p>

          {departUpdate === undefined ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <Grid container spacing={4} key={departUpdate._id}>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Stack spacing={2}>
                  <CssTextField
                    type="text"
                    name="name"
                    defaultValue={departUpdate.name}
                    label="Tên căn hộ"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="text"
                    name="price"
                    placeholder="VD: 15.000.000"
                    defaultValue={departUpdate.price}
                    label="Gía căn hộ"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                  {departUpdate.status === "Đang khuyến mãi" ? (
                    <CssTextField
                      type="text"
                      name="pricePromotion"
                      defaultValue={departUpdate?.pricePromotion}
                      label="Gía khuyến mãi "
                      placeholder="VD: 13.000.000"
                      fullWidth
                      onChange={handleChange}
                    ></CssTextField>
                  ) : null}
                  <Stack direction="row">
                    <CssTextField
                      type="number"
                      name="width"
                      placeholder="VD: 50"
                      defaultValue={departUpdate.width}
                      fullWidth
                      label="Chiều rộng (m2)"
                      onChange={handleChange}
                    ></CssTextField>
                    <CssTextField
                      type="number"
                      name="length"
                      placeholder="VD: 50"
                      defaultValue={departUpdate.length}
                      fullWidth
                      label="Chiều dài (m2)"
                      onChange={handleChange}
                    ></CssTextField>
                  </Stack>
                  <Stack direction="row">
                    <CssTextField
                      type="text"
                      name="electricMoney"
                      placeholder="VD: 5.000"
                      defaultValue={departUpdate.electricMoney}
                      label="Tiền điện"
                      fullWidth
                      onChange={handleChange}
                    ></CssTextField>
                    <CssTextField
                      type="text"
                      name="waterMoney"
                      placeholder="VD: 100.000"
                      defaultValue={departUpdate.waterMoney}
                      label="Tiền nước"
                      fullWidth
                      onChange={handleChange}
                    ></CssTextField>
                  </Stack>

                  <FormControl fullWidth>
                    <CssInputLabel>Loại căn hộ</CssInputLabel>
                    <CssSelect
                      name="type"
                      onChange={handleChange}
                      defaultValue={departUpdate.type}
                      // value={1}
                      label="Loại căn hộ"
                    >
                      {type.map((data, index) => (
                        <MenuItem value={data}>{data}</MenuItem>
                      ))}
                    </CssSelect>
                  </FormControl>
                  <FormControl fullWidth>
                    <CssInputLabel>Tình trạng căn hộ</CssInputLabel>
                    <CssSelect
                      name="status"
                      onChange={handleChange}
                      defaultValue={departUpdate.status}
                      // value={1}
                      label="Tình trạng căn hộ"
                    >
                      {status.map((data, index) => (
                        <MenuItem value={data}>{data}</MenuItem>
                      ))}
                    </CssSelect>
                  </FormControl>
                  <label for="photo">Ảnh mô tả căn hộ</label>

                  <Box className="flex flex-row flex-wrap">
                    {departUpdate?.photo?.map((dataImage, index) => (
                      <Box className="relative" key={index}>
                        <img
                          className="w-56 object-contain p-1"
                          alt=""
                          src={
                            process.env.REACT_APP_API_URL +
                            "/departs/" +
                            dataImage
                          }
                        />
                        <button
                          onClick={() => handleDeleteImage(dataImage)}
                          className="hover:scale-105 absolute font-bold right-0 top-0 text-slate-50 bg-red-500 rounded-lg py-1 px-3 text-xs"
                        >
                          X
                        </button>
                      </Box>
                    ))}
                  </Box>
                  <label
                    for="photo"
                    className="hover:scale-105 cursor-pointer text-slate-50 font-bold rounded-lg bg-green-500 w-24 p-2"
                  >
                    Thêm ảnh
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleupdateImage}
                    accept="image/png, image/jpg, image/jpeg"
                    multiple
                  />
                  <label>Những dịch vụ đã bao gồm giá thuê: </label>
                  <FormGroup className="flex flex-row flex-wrap">
                    {service?.map((data, index) =>
                      departUpdate.service?.includes(data?.name) ? (
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          name="service"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      ) : (
                        <FormControlLabel
                          control={<Checkbox />}
                          name="service"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      )
                    )}
                  </FormGroup>
                  <CssTextField
                    type="text"
                    name="description"
                    defaultValue={departUpdate.description}
                    label="Mô tả căn hộ"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                  ></CssTextField>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Stack spacing={2}>
                  <CssTextField
                    type="text"
                    name="nameHouse"
                    defaultValue={departUpdate.nameHouse}
                    label="Tên tòa nhà sỡ hữu"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                  <FormControl fullWidth>
                    <CssInputLabel>Khu vực</CssInputLabel>
                    <CssSelect
                      // value={1}
                      label="Khu vực"
                      name="districtHouse"
                      defaultValue={departUpdate.districtHouse}
                      onChange={handleChange}
                    >
                      {district.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </CssSelect>
                  </FormControl>
                  <CssTextField
                    type="text"
                    name="addressHouse"
                    defaultValue={departUpdate.addressHouse}
                    label="Địa chỉ cụ thể tòa nhà"
                    fullWidth
                    multiline
                    rows={2}
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="text"
                    name="descriptionHouse"
                    defaultValue={departUpdate.descriptionHouse}
                    label="Mô tả tiện ích xung quanh tòa nhà "
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                  ></CssTextField>

                  <label>Tiện ích bên trong căn hộ: </label>
                  <FormGroup className="flex flex-row flex-wrap">
                    {ultilitiesDepart?.map((data, index) =>
                      departUpdate.ultilitiesDepart?.includes(data?.name) ? (
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          name="ultilitiesDepart"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      ) : (
                        <FormControlLabel
                          control={<Checkbox />}
                          name="ultilitiesDepart"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      )
                    )}
                  </FormGroup>
                  <label>Tiện ích bên khu vực tòa nhà sở hữu căn hộ: </label>
                  <FormGroup className="flex flex-row flex-wrap">
                    {ultilitiesHouse?.map((data, index) =>
                      departUpdate.ultilitiesHouse?.includes(data?.name) ? (
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          name="ultilitiesHouse"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      ) : (
                        <FormControlLabel
                          control={<Checkbox />}
                          name="ultilitiesHouse"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                      )
                    )}
                  </FormGroup>
                </Stack>
              </Grid>
            </Grid>
          )}
          <Button
            className="bg-green-500 text-slate-50 font-bold hover:scale-105 mt-12 "
            sx={{ display: "block", margin: "auto" }}
            onClick={hanldeUpdate}
          >
            Lưu thay đổi
          </Button>
        </Paper>
      </Box>
      {isLoading === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Dialog open={openSucces} onClose={handleCloseDialogSuccess}>
        <DialogContent>
          <img
            src={require("../../assets/tick-xanh.png")}
            alt=""
            width={200}
            style={{ display: "block", margin: "auto" }}
          ></img>
          <Typography align="center">Cập nhập căn hộ thành công</Typography>
        </DialogContent>
      </Dialog>
      <Dialog open={openError} onClose={handleCloseDialogError}>
        <DialogContent>
          <img
            src={require("../../assets/error.jpg")}
            alt=""
            width={200}
            style={{ display: "block", margin: "auto" }}
          ></img>
          <Typography align="center">
            Đang có lỗi xảy ra vui lòng thử lại sau
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DepartUpdate;
