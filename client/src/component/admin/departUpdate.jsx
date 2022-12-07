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
    Button,Paper, Avatar
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { deleteImage, fetchDepartDetail, updateDepart, updateImage } from "../../redux/depart/departThunk";
  import {
    district,
    service,
    status,
    type,
    ultilitiesDepart,
    ultilitiesHouse,
  } from "../../util/data";
  import { useParams } from "react-router-dom";
import { useEffect } from "react";

  const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "30px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#facc15      ",
      },
    },
    "& label.Mui-focused": {
      color: "#facc15",
    },
  });
  
  const CssSelect = styled(Select)({
    borderRadius: "30px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#facc15 ",
    },
  });
  
  const CssInputLabel = styled(InputLabel)({
    "&.Mui-focused": {
      color: "#facc15",
    },
  });
  const DepartUpdate = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();

    const [departUpdate, setDepartUpdate] = useState({
      name: "",
      price: "",
      description: "",
      width: "",
      length:"",
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

    useEffect(()=>{
        dispatch(fetchDepartDetail(params.id))
          .then((res)=>{
            setDepartUpdate(res.payload)
          })
    },[dispatch, params.id])


  
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
  
    const hanldeUpdate = () =>{
      console.log(setDepartUpdate)
      dispatch(updateDepart(departUpdate))
      .then(()=>{
        navigate(0)
      })
    }

    const handleDeleteImage = (image) =>{
      const data = {_id:departUpdate._id,photo:image}
      dispatch(deleteImage(data))
      .then((res)=>{
            setDepartUpdate(res.payload)
      })
    }
    const handleupdateImage = (event) =>{
      const data = {_id:departUpdate._id,photo:event.target.files}
      dispatch(updateImage(data))
      .then((res)=>{
        setDepartUpdate(res.payload)
  })
    }


  console.log(departUpdate)
    return (
      <Container sx={{marginTop:20}}>
        <Box >
          <Paper elevation={6} className=" p-12">
          <Typography className="text-2xl  font-bold mb-10  underline decoration-double decoration-sky-500" align="center">
            CHỈNH SỬA CĂN HỘ
          </Typography>
          {departUpdate === undefined?(
            <p>Loading...</p>
          ):(
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
                  type="number"
                  name="price"
                  defaultValue={departUpdate.price}
                  label="Gía căn hộ"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <Stack direction="row">
                <CssTextField
                  type="number"
                  name="width"
                  defaultValue={departUpdate.width}
                  fullWidth
                  label="Chiều rộng (m2)"
                  onChange={handleChange}
                ></CssTextField>
                  <CssTextField
                  type="number"
                  name="length"
                  defaultValue={departUpdate.length}
                  fullWidth
                  label="Chiều dài (m2)"
                  onChange={handleChange}
                ></CssTextField>
                </Stack>
                <Stack direction="row">
                <CssTextField
                  type="number"
                  name="electricMoney"
                  defaultValue={departUpdate.electricMoney}
                  label="Tiền điện"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="number"
                  name="waterMoney"
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
                    {type.map((data,index)=>(
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
                     {status.map((data,index)=>(
                       <MenuItem value={data}>{data}</MenuItem>
                    ))}
  
                  </CssSelect>
                </FormControl>
                <label for="photo">
                  Ảnh mô tả căn hộ 
                </label>
                <div className="flex flex-row flex-wrap">
                {departUpdate.photo.map((dataImage,index)=>(
                  <div className="relative" key={index}>
                   <img className="w-56 object-contain p-1" alt="" src={process.env.REACT_APP_API_URL + "/departs/" + dataImage} />
                   <button 
                   onClick={()=>handleDeleteImage(dataImage)}
                   className="hover:scale-105 absolute font-bold right-0 top-0 text-slate-50 bg-red-500 rounded-lg py-1 px-3 text-xs">X</button>
                   </div>
                ))}
                </div>
                <label for="photo" className="hover:scale-105 cursor-pointer text-slate-50 font-bold rounded-lg bg-sky-500 w-24 p-2">Thêm ảnh</label>
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
                  {service.map((data, index) => (
                       departUpdate.service.includes(data) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="service"
                          label={data}
                          onChange={handleChangeCheckbox}
                          value={data}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="service"
                            label={data}
                            onChange={handleChangeCheckbox}
                            value={data}
                          />                          
                        )
                    ))}
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
                  {ultilitiesDepart.map((data, index) => (
                       departUpdate.ultilitiesDepart.includes(data) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="ultilitiesDepart"
                          label={data}
                          onChange={handleChangeCheckbox}
                          value={data}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="ultilitiesDepart"
                            label={data}
                            onChange={handleChangeCheckbox}
                            value={data}
                          />                          
                        )
                    ))}
                </FormGroup>
                <label>Tiện ích bên khu vực tòa nhà sở hữu căn hộ: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {ultilitiesHouse.map((data, index) => (
                       departUpdate.ultilitiesHouse.includes(data) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="ultilitiesHouse"
                          label={data}
                          onChange={handleChangeCheckbox}
                          value={data}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="ultilitiesHouse"
                            label={data}
                            onChange={handleChangeCheckbox}
                            value={data}
                          />                          
                        )
                    ))}
                </FormGroup>
              </Stack>
            </Grid>
          </Grid>
          )}
          <Button
            className="bg-sky-500 text-slate-50 font-bold hover:scale-105 mt-12 "
            sx={{ display: "block", margin: "auto" }}
            onClick={hanldeUpdate}
          >
           Lưu thay đổi
          </Button>
          </Paper>
        </Box>
      </Container>
    );
  };
  
  export default DepartUpdate;
  