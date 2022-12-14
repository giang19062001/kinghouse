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
  import { useDispatch,useSelector } from "react-redux";
  import { deleteImage, fetchDepartDetail, updateDepart, updateImage } from "../../redux/depart/departThunk";
  import {
    district,
    status,
    type,

  } from "../../util/data";
  import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
  
    const service = useSelector(selectListServices)
    const ultilitiesDepart = useSelector(selectListUlDeparts)
    const ultilitiesHouse = useSelector(selectListUlHomes)
    const isLoading = useSelector(selectStatusDepart)

    useEffect(()=>{
       dispatch(fetchServices())
       dispatch(fetchUlDeparts())
       dispatch(fetchUlHomes())
    },[])
    const dispatch = useDispatch()
    const params = useParams();

    const [departUpdate, setDepartUpdate] = useState({
      name: "",
      price: "",
      pricePromotion:"",
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
      dispatch(updateDepart(departUpdate))
      .then((res)=>{
        setDepartUpdate(res.payload)
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
      <Container sx={{marginY:20}}>
        <Box >
          <Paper elevation={6} className=" p-12">
          <p className="p"><span className="fancy">Ch???nh s???a c??n h???</span></p>

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
                  label="T??n c??n h???"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="price"
                  placeholder="VD: 15.000.000"
                  defaultValue={departUpdate.price}
                  label="G??a c??n h???"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                  {departUpdate.status === "??ang khuy???n m??i" ? (
                  <CssTextField
                    type="text"
                    name="pricePromotion"
                    defaultValue={departUpdate?.pricePromotion}

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
                  placeholder="VD: 50"
                  defaultValue={departUpdate.width}
                  fullWidth
                  label="Chi???u r???ng (m2)"
                  onChange={handleChange}
                ></CssTextField>
                  <CssTextField
                  type="number"
                  name="length"
                  placeholder="VD: 50"
                  defaultValue={departUpdate.length}
                  fullWidth
                  label="Chi???u d??i (m2)"
                  onChange={handleChange}
                ></CssTextField>
                </Stack>
                <Stack direction="row">
                <CssTextField
                  type="text"
                  name="electricMoney"
                  placeholder="VD: 5.000"
                  defaultValue={departUpdate.electricMoney}
                  label="Ti???n ??i???n"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="waterMoney"
                  placeholder="VD: 100.000"
                  defaultValue={departUpdate.waterMoney}
                  label="Ti???n n?????c"
                  fullWidth
                  onChange={handleChange}
                ></CssTextField>
                </Stack>
               
              
              <FormControl fullWidth>
                  <CssInputLabel>Lo???i c??n h???</CssInputLabel>
                  <CssSelect
                    name="type"
                    onChange={handleChange}
                    defaultValue={departUpdate.type}
                    // value={1}
                    label="Lo???i c??n h???"
                  >
                    {type.map((data,index)=>(
                       <MenuItem value={data}>{data}</MenuItem>
                    ))}
  
                  </CssSelect>
                </FormControl>
                <FormControl fullWidth>
                  <CssInputLabel>T??nh tr???ng c??n h???</CssInputLabel>
                  <CssSelect
                    name="status"
                    onChange={handleChange}
                    defaultValue={departUpdate.status}
                    // value={1}
                    label="T??nh tr???ng c??n h???"
                  >
                     {status.map((data,index)=>(
                       <MenuItem value={data}>{data}</MenuItem>
                    ))}
  
                  </CssSelect>
                </FormControl>
                <label for="photo">
                  ???nh m?? t??? c??n h??? 
                </label>
                
                <div className="flex flex-row flex-wrap">
                {departUpdate?.photo?.map((dataImage,index)=>(
                  <div className="relative" key={index}>
                   <img className="w-56 object-contain p-1" alt="" src={process.env.REACT_APP_API_URL + "/departs/" + dataImage} />
                   <button 
                   onClick={()=>handleDeleteImage(dataImage)}
                   className="hover:scale-105 absolute font-bold right-0 top-0 text-slate-50 bg-red-500 rounded-lg py-1 px-3 text-xs">X</button>
                   </div>
                ))}
                </div>
                <label for="photo" className="hover:scale-105 cursor-pointer text-slate-50 font-bold rounded-lg bg-green-500 w-24 p-2">Th??m ???nh</label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleupdateImage}
                  accept="image/png, image/jpg, image/jpeg"
                  multiple
                />
                <label>Nh???ng d???ch v??? ???? bao g???m gi?? thu??: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {service?.map((data, index) => (
                       departUpdate.service.includes(data?.name) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="service"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="service"
                            label={data?.name}
                            onChange={handleChangeCheckbox}
                            value={data?.name}
                          />                          
                        )
                    ))}
                </FormGroup>
                <CssTextField
                  type="text"
                  name="description"
                  defaultValue={departUpdate.description}
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
                  defaultValue={departUpdate.nameHouse}
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
                  label="?????a ch??? c??? th??? t??a nh??"
                  fullWidth
                  multiline
                  rows={2}
                  onChange={handleChange}
                ></CssTextField>
                <CssTextField
                  type="text"
                  name="descriptionHouse"
                  defaultValue={departUpdate.descriptionHouse}
                  label="M?? t??? ti???n ??ch xung quanh t??a nh?? "
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                ></CssTextField>
  
                <label>Ti???n ??ch b??n trong c??n h???: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {ultilitiesDepart?.map((data, index) => (
                       departUpdate.ultilitiesDepart.includes(data?.name) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="ultilitiesDepart"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="ultilitiesDepart"
                            label={data?.name}
                            onChange={handleChangeCheckbox}
                            value={data?.name}
                          />                          
                        )
                    ))}
                </FormGroup>
                <label>Ti???n ??ch b??n khu v???c t??a nh?? s??? h???u c??n h???: </label>
                <FormGroup className="flex flex-row flex-wrap">
                  {ultilitiesHouse?.map((data, index) => (
                       departUpdate.ultilitiesHouse.includes(data?.name) ?(
                          <FormControlLabel
                          control={<Checkbox defaultChecked  />}
                          name="ultilitiesHouse"
                          label={data?.name}
                          onChange={handleChangeCheckbox}
                          value={data?.name}
                        />
                        ):(
                            <FormControlLabel
                            control={<Checkbox   />}
                            name="ultilitiesHouse"
                            label={data?.name}
                            onChange={handleChangeCheckbox}
                            value={data?.name}
                          />                          
                        )
                    ))}
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
           L??u thay ?????i
          </Button>
          </Paper>
        </Box>
        {isLoading === true ?(
           <Backdrop
           sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={isLoading}
         >
           <CircularProgress color="inherit" />
         </Backdrop>
      ):null}
      </Container>
    );
  };
  
  export default DepartUpdate;
  