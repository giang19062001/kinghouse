import {
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUlDepart,
  fetchUlDeparts,
  postUlDepart,
} from "../../redux/ultilitiesDepart/ulDepartThunk";
import { selectListUlDeparts, selectStatusUlDeparts } from "../../redux/ultilitiesDepart/ulDepartSelector";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const UlDepartComponent = () => {
  const dispatch = useDispatch();
  const listUlDepart = useSelector(selectListUlDeparts);
  const isLoading = useSelector(selectStatusUlDeparts)
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [ulDepartPost, setUlDepartPost] = useState({
    name: "",
    photo: undefined,
  });

  const [openSucces,setOpenSuccess] = useState(false)
  const [openError,setOpenError] = useState(false)

  
  const handleCloseDialogSuccess = () => {
    dispatch(fetchUlDeparts())
    setOpenSuccess(false)
  };
  const handleCloseDialogError = () =>{
    dispatch(fetchUlDeparts())
    setOpenError(false)
  }
  
  useEffect(() => {
    dispatch(fetchUlDeparts());
  }, [dispatch]);

  const handleChange = (event) => {
    setUlDepartPost((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePhoto = (event) => {
    setUlDepartPost((preState) => ({
      ...preState,
      photo: event.target.files[0],
    }));
  };

  const handleAdd = () => {
    dispatch(postUlDepart(ulDepartPost)).then((res) => {
      if(!res.error){
        setOpenSuccess(true)
      }else{
        setOpenError(true)
      }
    });
  };
  const handleDelete = () => {
    setOpenDialogDelete(false)

    dispatch(deleteUlDepart(dataDelete)).then((res) => {
      if(!res.error){
        setOpenSuccess(true)
      }else{
        setOpenError(true)
      }
    });
  };

  return (
    <Container sx={{ marginY: 20 }}>
      <Paper className="mb-6" elevation={2}>
        <Stack className="p-6">
          <Typography
            align="center"
            className="font-bold text-lg pb-6 font-sans  underline decoration-green-500"
          >
            THÊM TIỆN ÍCH CĂN HỘ
          </Typography>
          <Box className="space-y-5 flex flex-col  items-center ">
            <TextField
              label="Tên tiện ích căn hộ"
              fullWidth
              type="text"
              name="name"
              onChange={handleChange}
            ></TextField>
            <input
              className="w-full"
              type="file"
              id="photo"
              name="photo"
              accept="image/x-icon"
              onChange={(e) => handlePhoto(e)}
            />
            <Button
              className="hover:scale-105 cursor-pointer text-slate-50 font-bold rounded-lg bg-green-500 w-48 p-2"
              onClick={handleAdd}
            >
              Thêm tiện ích
            </Button>
          </Box>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-sky-400 ">
              <TableCell align="center" className="font-bold text-slate-50">
                ICON
              </TableCell>
              <TableCell align="center" className="font-bold text-slate-50">
                TÊN TIỆN ÍCH
              </TableCell>

              <TableCell align="center" className="font-bold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUlDepart?.map((row, index) => (
              <TableRow className="" key={index}>
                <TableCell align="center">
                  <Avatar
                    variant="square"
                    className="mx-auto rounded transition duration-300 ease-in-out hover:scale-110"
                    src={
                      process.env.REACT_APP_API_URL + "/ulDepart/" + row?.photo
                    }
                  />
                </TableCell>
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align="center">
                  <Button
                    className="bg-red-600 text-slate-50  hover:bg-red-700 hover:shadow-lg  hover:shadow-red-500/50"
                    onClick={
                      ()=>{setOpenDialogDelete(true);setDataDelete({id:row?._id,name:row?.name,photo:row?.photo})}
                    }
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading === true ?(
           <Backdrop
           sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open={isLoading}
         >
           <CircularProgress color="inherit" />
         </Backdrop>
      ):null}
         <Dialog
        open={openDialogDelete}
        onClose={()=>{setOpenDialogDelete(false);setDataDelete({})}}
        maxWidth="sm"
        fullWidth
      >        <DialogTitle sx={{backgroundColor:"#dc2626",color:"white",fontWeight:"bold"}}>Cảnh báo</DialogTitle>
      <Divider/>

        <DialogContent>
            <Typography variant="h5" align="center" sx={{fontWeight:"bold",padding:2}}>Bạn có chắc muốn xóa</Typography>
        </DialogContent>
        <Divider/>

        <DialogActions>
          <Button onClick={handleDelete} sx={{display:"block",margin:"auto" }}  variant="outlined">Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSucces} onClose={handleCloseDialogSuccess}>
        <DialogContent>
          <img
            src={require("../../assets/tick-xanh.png")}
            alt=""
            width={200}
            style={{ display: "block", margin: "auto" }}
          ></img>
          <Typography align="center">
            Tác vụ  thành công
          </Typography>
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

export default UlDepartComponent;
