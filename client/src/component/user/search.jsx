import {
  Box,
  Container,
  Typography,
  Slider,
  Paper,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  Stack,
  Button,
  Checkbox,
  ListItemText,
  Grid,Avatar, Divider
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import { styled } from "@mui/material/styles";
import {
  district,
  service,
  type,
  ultilitiesDepart,
  ultilitiesHouse,
} from "../../util/data";
import { useSelector } from "react-redux";
import { selectListDepart } from "../../redux/depart/departSelector";
import { useEffect } from "react";
import { useState } from "react";

const CssSelect = styled(Select)({
  borderRadius: "30px",
});

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
  },
});

const minDistance = 10;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Search = () => {

  const listDepart = useSelector(selectListDepart)
  const [dataSearch,setDataSearch] = React.useState()
  const [valueDistrict,setValueDistrict] = React.useState()
  const [valueType,setValueType] = React.useState()
  const [valueArea, setValueArea] = React.useState({
    length:0,
    width:0
  });
  const [valuePrice, setValuePrice] = React.useState([0, 50000000]);
  const [value_ultilities_Depart, set_value_ultilities_Depart] = React.useState([]);
  const [value_ultilities_Home, set_value_ultilities_Home] = React.useState([]);

  const handleChangePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValuePrice([
        Math.min(newValue[0], valuePrice[1] - minDistance),
        valuePrice[1],
      ]);
    } else {
      setValuePrice([
        valuePrice[0],
        Math.max(newValue[1], valuePrice[0] + minDistance),
      ]);
    }
  };

  const handleChangeUltilitiesDepart = (event) => {
    const {
      target: { value },
    } = event;
    set_value_ultilities_Depart(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeUltilitiesHome = (event) => {
    const {
      target: { value },
    } = event;
    set_value_ultilities_Home(
      typeof value === "string" ? value.split(",") : value
    );
  };



  const handleClickSearch = () =>{

    setDataSearch(
      listDepart.filter((
    item => (
    (parseInt(item.price) >=valuePrice[0] 
    && parseInt(item.price) <= valuePrice[1])

    && (valueDistrict !== undefined 
    ? item.districtHouse === valueDistrict
    :  item.districtHouse !== valueDistrict)
    
    && (valueType !== undefined 
    ? item.type === valueType
    : item.type !== valueType)

    &&(valueArea.length !== 0 || valueArea.width !== 0
    ? item.length === valueArea.length && item.width === valueArea.width
    : item.length !== valueArea.length && item.width !== valueArea.width )
  
    &&(value_ultilities_Depart.length !==0
      ? item.ultilitiesDepart.some(element=> value_ultilities_Depart.includes(element))
      :item.ultilitiesDepart !== value_ultilities_Depart)
    
      &&(value_ultilities_Home.length !==0
        ? item.ultilitiesHouse.some(element=> value_ultilities_Home.includes(element))
        :item.ultilitiesHouse !== value_ultilities_Home)

    ))))

    // console.log("dataSearch",dataSearch)


  }


  return (
    <Container sx={{ marginY: 10 }}>
      <Paper elevation={2} className="p-6">
        <Typography>Khoảng giá</Typography>
        <Box sx={{ width: "100%" }} className="mx-auto mb-10">
          <Slider
            value={valuePrice}
            onChange={handleChangePrice}
            disableSwap
            min={0}
            step={1000000}
            max={50000000}
          />
          <Typography className="float-left">
            Min: {valuePrice[0]} VNĐ
          </Typography>
          <Typography className="float-right">
            Max: {valuePrice[1]} VNĐ
          </Typography>
        </Box>
        <Stack direction={{ sm: "column", md: "row" }} spacing={2} >
          <FormControl fullWidth className="pb-3">
            <InputLabel>Khu vực</InputLabel>
            <CssSelect
              label="Khu vực"
              name="districtHouse"
              onChange={(e)=>setValueDistrict(e.target.value)}
            >
              {district.map((data, index) => (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ))}
            </CssSelect>
          </FormControl>
          <FormControl fullWidth className="pb-3">
            <InputLabel>Loại phòng</InputLabel>
            <CssSelect
              label="Khu vực"
              name="type"
              onChange={(e)=>setValueType(e.target.value)}
            >
              {type.map((data, index) => (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ))}
            </CssSelect>
          </FormControl>
          <FormControl fullWidth className="pb-3">
            <InputLabel>Tiện ích căn hộ</InputLabel>
            <CssSelect
              multiple
              label="Tiện ích căn hộ"
              name="ultilitiesDepart"
              value={value_ultilities_Depart}
              onChange={handleChangeUltilitiesDepart}
              input={<OutlinedInput label="Tiện ích căn hộ" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {ultilitiesDepart.map((data) => (
                <MenuItem key={data} value={data}>
                  <Checkbox checked={value_ultilities_Depart.indexOf(data) > -1} />
                  <ListItemText primary={data} />
                </MenuItem>
              ))}
            </CssSelect>
          </FormControl>
          <FormControl fullWidth className="pb-3">
            <InputLabel>Tiện ích tòa nhà sở hữu</InputLabel>
            <CssSelect
              multiple
              label="Tiện ích tòa nhà sở hữu"
              name="ultilitiesHouse"
              value={value_ultilities_Home}
              onChange={handleChangeUltilitiesHome}
              input={<OutlinedInput label="Tiện ích tòa nhà sở hữu" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {ultilitiesHouse.map((data) => (
                <MenuItem key={data} value={data}>
                  <Checkbox checked={value_ultilities_Home.indexOf(data) > -1} />
                  <ListItemText primary={data} />
                </MenuItem>
              ))}
            </CssSelect>
          </FormControl>

        </Stack>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className="mt-6 space-y-6"
        >
          <label>Diện tích</label>
          <CssTextField label="Chiều dài" type="number" name="length" 
          defaultValue={0}
          onChange={(e)=>setValueArea((preState)=> ({...preState,length:parseInt(e.target.value)}))}></CssTextField>
          <CssTextField label="Chiều rộng" type="number" name="width"
           defaultValue={0}
          onChange={(e)=>setValueArea((preState)=> ({...preState,width:parseInt(e.target.value)}))}></CssTextField>
         
        </Stack>
        <Button
          sx={{ margin: "auto", display: "block" }}
          className="bg-sky-400 text-slate-50 hover:bg-sky-500 mt-6 w-32"
          onClick={handleClickSearch}
        >
          Áp dụng
        </Button>
        {/*  */}
        {dataSearch === undefined ?(
           null
        ):(
       <Box className="mt-12">
        <Divider/>
        {dataSearch.length === 0 ?(
          <Typography align="center" className="font-bold text-red-500 text-xl my-6">Không tìm thấy kết quả tìm kiếm</Typography>
        ):(
          <div>
        <Typography align="center" className="font-bold text-xl my-6">DANH SÁCH KẾT QUẢ TÌM KIẾM</Typography>
          <Grid container spacing={2}>
          {dataSearch?.map((data, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={3}
              className="ease-in duration-75 hover:shadow hover:shadow-slate-500 pb-5 hover:scale-105 rounded-lg "
            >
              <Link to={`/depart/` + data?._id}>
                <Avatar
                  variant="square"
                  className="h-32 w-28 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded mx-auto mb-2"
                  src={process.env.REACT_APP_API_URL + "/" + data?.photo?.[0]}
                />
                <Typography  className="font-bold text-md">
                  {data?.name}
                </Typography>
                <Typography className="font-bold text-sky-500 mt-2 text-sm">
                  <PlaceIcon className="w-5"></PlaceIcon>
                  {data?.districtHouse}
                </Typography>
                <Typography className="text-green-600 font-bold text-md">
                  {data?.type}
                </Typography>
                <Typography className="text-red-500 font-bold mt-2 text-sm">
                  {data?.price} VNĐ
                </Typography>
                {/* <Typography className="text-neutral-900 font-bold text-sm">
                Diện tích:  {data?.length} * {data?.width} (dài * rộng)
                </Typography> */}
              </Link>
            </Grid>
          ))}
        </Grid>
        </div>)}
       </Box>
        )}
      
      </Paper>
    </Container>
  );
};

export default Search;
