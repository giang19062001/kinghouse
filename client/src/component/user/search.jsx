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
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import { styled } from "@mui/material/styles";
import { district, type } from "../../util/data";
import { useSelector, useDispatch } from "react-redux";
import { selectListDepart } from "../../redux/depart/departSelector";
import { useEffect } from "react";
import { useState } from "react";
import { fetchServices } from "../../redux/service/serviceThunk";
import { fetchUlDeparts } from "../../redux/ultilitiesDepart/ulDepartThunk";
import { fetchUlHomes } from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListServices } from "../../redux/service/serviceSelector";
import { selectListUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../util/pagination";

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

const PER_PAGE = 8;

const Search = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUlDeparts());
    dispatch(fetchUlHomes());
  }, []);

  const service = useSelector(selectListServices);
  const ultilitiesDepart = useSelector(selectListUlDeparts);
  const ultilitiesHouse = useSelector(selectListUlHomes);

  const listDepart = useSelector(selectListDepart);
  const [dataSearch, setDataSearch] = React.useState();
  const [valueDistrict, setValueDistrict] = React.useState();
  const [valueType, setValueType] = React.useState();
  const [valueArea, setValueArea] = React.useState({
    length: 0,
    width: 0,
  });
  const [valuePrice, setValuePrice] = React.useState([0, 50000000]);
  const [value_ultilities_Depart, set_value_ultilities_Depart] = React.useState(
    []
  );
  const [value_ultilities_Home, set_value_ultilities_Home] = React.useState([]);

  let [page, setPage] = useState(1);
  const count = Math.ceil(dataSearch?.length / PER_PAGE);
  const dataPagination = usePagination(dataSearch, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    dataPagination.jump(p);
  };

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

  const handleClickSearch = () => {
    setDataSearch(
      listDepart.filter(
        (item) =>
          parseInt(item.price.split(".").join("")) >= valuePrice[0] &&
          parseInt(item.price.split(".").join("")) <= valuePrice[1] &&
          (valueDistrict !== undefined
            ? item.districtHouse === valueDistrict
            : item.districtHouse !== valueDistrict) &&
          (valueType !== undefined
            ? item.type === valueType
            : item.type !== valueType) &&
          (valueArea.length !== 0
            ? item.length === valueArea.length
            : item.length !== valueArea.length) &&
          (valueArea.width !== 0
            ? item.width === valueArea.width
            : item.width !== valueArea.width) &&
          (value_ultilities_Depart.length !== 0
            ? item.ultilitiesDepart.some((element) =>
                value_ultilities_Depart.includes(element)
              )
            : item.ultilitiesDepart !== value_ultilities_Depart) &&
          (value_ultilities_Home.length !== 0
            ? item.ultilitiesHouse.some((element) =>
                value_ultilities_Home.includes(element)
              )
            : item.ultilitiesHouse !== value_ultilities_Home)
      )
    );
  };
  const formatter = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  });

  const handleClose = () => {
    setDataSearch(undefined);
    setValueDistrict(undefined);
    setValueType(undefined);
    document.getElementById("type").blur();
    setValuePrice([0, 50000000]);
    set_value_ultilities_Depart([]);
    set_value_ultilities_Home([]);
    setValueArea({
      length: 0,
      width: 0,
    });
  };

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
            Min: {formatter.format(valuePrice[0])}
          </Typography>
          <Typography className="float-right">
            Max: {formatter.format(valuePrice[1])}
          </Typography>
        </Box>
        <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
          <FormControl fullWidth className="pb-3">
            <InputLabel>Khu vực</InputLabel>
            <CssSelect
              label="Khu vực"
              key={valueDistrict}
              value={valueDistrict}
              name="districtHouse"
              onChange={(e) => setValueDistrict(e.target.value)}
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
              label="Loại phòng"
              name="type"
              key={valueType}
              value={valueType}
              onChange={(e) => setValueType(e.target.value)}
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
                <MenuItem key={data?.name} value={data?.name}>
                  <Checkbox
                    checked={value_ultilities_Depart.indexOf(data?.name) > -1}
                  />
                  <ListItemText primary={data?.name} />
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
                <MenuItem key={data?.name} value={data?.name}>
                  <Checkbox
                    checked={value_ultilities_Home.indexOf(data?.name) > -1}
                  />
                  <ListItemText primary={data?.name} />
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
          <CssTextField
            label="Chiều dài"
            type="number"
            name="length"
            value={valueArea.length}
            onChange={(e) =>
              setValueArea((preState) => ({
                ...preState,
                length: parseInt(e.target.value),
              }))
            }
          ></CssTextField>
          <CssTextField
            label="Chiều rộng"
            type="number"
            name="width"
            value={valueArea.width}
            onChange={(e) =>
              setValueArea((preState) => ({
                ...preState,
                width: parseInt(e.target.value),
              }))
            }
          ></CssTextField>
        </Stack>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            className="bg-sky-400 text-slate-50 hover:bg-sky-500 mt-6 w-32"
            onClick={handleClickSearch}
          >
            Áp dụng
          </Button>
          {dataSearch !== undefined ? (
            <Button
              className="bg-slate-400 text-slate-50 hover:bg-slate-500 mt-6 w-32"
              onClick={handleClose}
            >
              Reset
            </Button>
          ) : null}
        </Stack>
        {/*  */}
        {dataPagination?.currentData() === undefined ? null : (
          <Box className="mt-12">
            <Divider />
            {dataPagination?.currentData()?.length === 0 ? (
              <Typography
                align="center"
                className="font-bold text-red-500 text-xl my-6"
              >
                Không tìm thấy kết quả tìm kiếm
              </Typography>
            ) : (
              <Box>
                <Typography align="center" className="font-bold text-xl my-6">
                  DANH SÁCH KẾT QUẢ TÌM KIẾM
                </Typography>
                <Grid container spacing={0}>
                  {dataPagination?.currentData()?.map((data, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={3}
                      xl={3}
                      className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3  rounded-lg relative "
                    >
                      <Link
                to={`/depart/`+data?._id}   
                      >
                        <Avatar
                          variant="square"
                          className="h-32 w-28 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded  mb-2 mx-auto "
                          src={
                            process.env.REACT_APP_API_URL +
                            "/departs/" +
                            data?.photo?.[0]
                          }
                        />
                        {data.status === "Đang khuyến mãi" ? (
                          <p className="absolute top-5 right-6 md:right-5 lg:right-5 xl:right-5 z-50 text-red-600 font-bold  bg-slate-50 rounded-full p-1 text-xs md:text-sm lg:text-md xl:text-md line-through ">
                            {data?.price} VNĐ
                          </p>
                        ) : (
                          <p className="absolute top-5 right-6 md:right-5 lg:right-5 xl:right-5 z-50 text-red-600 font-bold  bg-slate-50 rounded-full p-1 text-xs md:text-sm lg:text-md xl:text-md">
                            {data?.price} VNĐ
                          </p>
                        )}
                         {data?.isDelete === true ? (
                      <p className="absolute top-28  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-sky-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Đã thuê
                      </p>
                    ) : (
                      <p className="absolute top-28  md:top-52 lg:top-52 xl:top-52 left-6 md:left-5 lg:left-5 xl:left-5 z-50 bg-green-500 text-slate-50 p-1 rounded-sm  text-xs md:text-sm lg:text-md xl:text-md ">
                        Còn trống
                      </p>
                    )}

                        <Typography
                          sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                          className="font-bold text-md"
                        >
                          {data?.name}
                        </Typography>
                        <Typography
                          sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                          className="font-bold text-sky-500 mt-2 text-sm"
                        >
                          <PlaceIcon className="w-5"></PlaceIcon>
                          {data?.districtHouse}
                        </Typography>
                        <Typography
                          sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                          className="text-green-600 font-bold text-md"
                        >
                          {data?.type}
                        </Typography>
                        {data.status === "Đang khuyến mãi"?(
                            <Typography
                            sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                            className="text-red-500 font-bold mt-2 text-sm"
                          >
                            {data?.pricePromotion} VNĐ
                          </Typography>
                        ):(
                            <Typography
                            sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                            className="text-red-500 font-bold mt-2 text-sm"
                          >
                            {data?.price} VNĐ
                          </Typography>
                        )}
                      
                        <Typography
                          sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                          className="text-orange-500 font-bold mt-2 text-sm "
                        >
                          {data?.length} * {data?.width} (m2)
                        </Typography>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        )}
        <Stack className="flex justify-center items-center py-12">
          {dataPagination?.currentData() === undefined ? null : (
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              color="primary"
              onChange={handleChange}
            />
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Search;
