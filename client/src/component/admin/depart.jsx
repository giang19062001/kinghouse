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
        <p className="p"><span className="fancy">Th??m c??n h???</span></p>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <Stack spacing={2}>
                <CssTextField
                  type="text"
                  name="name"
                  label="T??n c??n h???"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="price"
                  label="G??a thu?? c??n h??? "
                  placeholder="VD: 15.000.000"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                {departPost.status === "??ang khuy???n m??i" ? (
                  <CssTextField
                    type="text"
                    name="pricePromotion"
                    label="G??a khuy???n m??i "
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
                    label="Chi???u r???ng (m2)"
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="number"
                    name="length"
                    fullWidth
                    placeholder="VD: 50"
                    label="Chi???u d??i (m2)"
                    onChange={handleChange}
                  ></CssTextField>
                </Stack>
                <Stack direction="row">
                  <CssTextField
                    type="text"
                    name="electricMoney"
                    label="Ti???n ??i???n (kw)"
                    placeholder="VD: 5.000"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                  <CssTextField
                    type="text"
                    name="waterMoney"
                    label="Ti???n n?????c (1 ng?????i)"
                    placeholder="VD: 100.000"
                    fullWidth
                    onChange={handleChange}
                  ></CssTextField>
                </Stack>

                <FormControl fullWidth>
                  <CssInputLabel>Lo???i c??n h???</CssInputLabel>
                  <CssSelect
                    name="type"
                    onChange={handleChange}
                    // value={1}
                    label="Lo???i c??n h???"
                  >
                    {type.map((data, index) => (
                      <MenuItem value={data}>{data}</MenuItem>
                    ))}
                  </CssSelect>
                </FormControl>
                <FormControl fullWidth>
                  <CssInputLabel>T??nh tr???ng c??n h???</CssInputLabel>
                  <CssSelect
                    name="status"
                    onChange={handleChange}
                    // value={1}
                    label="T??nh tr???ng c??n h???"
                  >
                    {status.map((data, index) => (
                      <MenuItem value={data}>{data}</MenuItem>
                    ))}
                  </CssSelect>
                </FormControl>
                <Divider />

                <label for="photo">
                  ???nh m?? t??? c??n h??? <i>(y??u c???u tr??n 5 t???m)</i>
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
                  Th??m ???nh
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

                <label>Nh???ng d???ch v??? ???? bao g???m gi?? thu??: </label>
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
                  label="M?? t??? c??n h???"
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
                  label="T??n t??a nh?? s??? h???u"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <FormControl fullWidth>
                  <CssInputLabel>Khu v???c</CssInputLabel>
                  <CssSelect
                    // value={1}
                    label="Khu v???c"
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
                  label="?????a ch??? c??? th??? t??a nh??"
                  fullWidth
                  multiline
                  rows={2}
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="descriptionHouse"
                  label="M?? t??? ti???n ??ch xung quanh t??a nh?? "
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                ></CssTextField>

                <label>Ti???n ??ch b??n trong c??n h???: </label>
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
                <label>Ti???n ??ch b??n khu v???c t??a nh?? s??? h???u c??n h???: </label>
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
            Th??m c??n h??? m???i
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Depart;
