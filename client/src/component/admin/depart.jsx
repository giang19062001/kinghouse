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
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeparts, postDepart } from "../../redux/depart/departThunk";
import ClearIcon from "@mui/icons-material/Clear";
import { district, status, type } from "../../util/data";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";

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

const Depart = () => {
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);

  const [departPost, setDepartPost] = useState({
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

  function uploadSingleFile(e) {
    handlePhoto(e.target.files);
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log("ImagesArray", ImagesArray);
    setFile([...file, ...ImagesArray]);
  }

  function deleteFile(indexDelete) {
    console.log("indexDelete", indexDelete);
    const fileDelete = file.filter((item, index) => index !== indexDelete);
    setDepartPost((preState) => ({
      ...preState,
      photo: preState.photo.filter((item, index) => index !== indexDelete),
    }));
    setFile(fileDelete);
  }

  const handlePhoto = (files) => {
    console.log("files photo", files);
    const photo = [];

    for (let i = 0; i < files.length; i++) {
      photo.push(files[i]);
    }

    console.log("photo", photo);
    setDepartPost((preState) => ({
      ...preState,
      photo: photo,
    }));
  };

  const handleChangeCheckbox = (event) => {
    console.log(event.target.checked, event.target.value, [event.target.name]);

    if (event.target.name === "service") {
      if (event.target.checked) {
        setDepartPost((preState) => ({
          ...preState,
          service: [...preState.service, event.target.value],
        }));
      } else {
        setDepartPost((preState) => ({
          ...preState,
          service: preState.service.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    } else if (event.target.name === "ultilitiesHouse") {
      if (event.target.checked) {
        setDepartPost((preState) => ({
          ...preState,
          ultilitiesHouse: [...preState.ultilitiesHouse, event.target.value],
        }));
      } else {
        setDepartPost((preState) => ({
          ...preState,
          ultilitiesHouse: preState.ultilitiesHouse.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    } else {
      if (event.target.checked) {
        setDepartPost((preState) => ({
          ...preState,
          ultilitiesDepart: [...preState.ultilitiesDepart, event.target.value],
        }));
      } else {
        setDepartPost((preState) => ({
          ...preState,
          ultilitiesDepart: preState.ultilitiesDepart.filter(
            (value) => value !== event.target.value
          ),
        }));
      }
    }
  };

  const handleChange = (event) => {
    setDepartPost((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAdd = () => {
    console.log(departPost);
    dispatch(postDepart(departPost)).then(()=>{
      dispatch(fetchDeparts());
    })
  };

  console.log(departPost);
  return (
    <Container sx={{ marginTop: 20 }}>
      <Box>
        <Paper elevation={6} className=" p-12">
        <p className="p"><span className="fancy">Thêm căn hộ</span></p>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Stack spacing={2}>
                <CssTextField
                  type="text"
                  name="name"
                  label="Tên căn hộ"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="price"
                  label="Gía thuê căn hộ "
                  placeholder="VD: 15.000.000"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                {departPost.status === "Đang khuyến mãi" ? (
                  <CssTextField
                    type="text"
                    name="pricePromotion"
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
                    fullWidth
                    placeholder="VD: 50"
                    label="Chiều rộng (m2)"
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="number"
                    name="length"
                    fullWidth
                    placeholder="VD: 50"
                    label="Chiều dài (m2)"
                    onChange={handleChange}
                  ></CssTextField>
                </Stack>
                <Stack direction="row">
                  <CssTextField
                    type="text"
                    name="electricMoney"
                    label="Tiền điện (kw)"
                    placeholder="VD: 5.000"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="text"
                    name="waterMoney"
                    label="Tiền nước (1 người)"
                    placeholder="VD: 100.000"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                </Stack>

                <FormControl fullWidth>
                  <CssInputLabel>Loại căn hộ</CssInputLabel>
                  <CssSelect
                    name="type"
                    onChange={handleChange}
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
                    // value={1}
                    label="Tình trạng căn hộ"
                  >
                    {status.map((data, index) => (
                      <MenuItem value={data}>{data}</MenuItem>
                    ))}
                  </CssSelect>
                </FormControl>
                <Divider />

                <label for="photo">
                  Ảnh mô tả căn hộ <i>(yêu cầu trên 5 tấm)</i>
                </label>
                <div className="flex flex-row flex-wrap">
                  {file.length > 0 &&
                    file.map((item, index) => {
                      return (
                        <div key={item} className="relative p-2">
                          <img
                            src={item}
                            alt=""
                            className="w-36 h-36 object-contain"
                          />
                          <IconButton
                            className="text-slate-50 bg-red-400 absolute top-0 right-0 hover:scale-105"
                            onClick={() => deleteFile(index)}
                          >
                            <ClearIcon></ClearIcon>
                          </IconButton>
                        </div>
                      );
                    })}
                </div>
                <label
                  for="photo"
                  className="hover:scale-105 cursor-pointer text-slate-50 font-bold rounded-lg  bg-green-500 w-24 p-2"
                >
                  Thêm ảnh
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={uploadSingleFile}
                  accept="image/png, image/jpg, image/jpeg"
                  multiple
                />
                <Divider />

                <label>Những dịch vụ đã bao gồm giá thuê: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {service.map((data, index) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      name="service"
                      label={data?.name}
                      onChange={handleChangeCheckbox}
                      value={data?.name}
                    />
                  ))}
                </FormGroup>
                <CssTextField
                  type="text"
                  name="description"
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
                  label="Địa chỉ cụ thể tòa nhà"
                  fullWidth
                  multiline
                  rows={2}
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="descriptionHouse"
                  label="Mô tả tiện ích xung quanh tòa nhà "
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                ></CssTextField>

                <label>Tiện ích bên trong căn hộ: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {ultilitiesDepart.map((data, index) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      name="ultilitiesDepart"
                      label={data?.name}
                      onChange={handleChangeCheckbox}
                      value={data?.name}
                    />
                  ))}
                </FormGroup>
                <label>Tiện ích bên khu vực tòa nhà sở hữu căn hộ: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {ultilitiesHouse.map((data, index) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      name="ultilitiesHouse"
                      label={data?.name}
                      onChange={handleChangeCheckbox}
                      value={data?.name}
                    />
                  ))}
                </FormGroup>
              </Stack>
            </Grid>
          </Grid>
          <Button
            className=" bg-green-500 text-slate-50 font-bold hover:scale-105 mt-12 "
            sx={{ display: "block", margin: "auto" }}
            onClick={handleAdd}
          >
            Thêm căn hộ mới
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Depart;
