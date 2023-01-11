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
  deleteUlHome,
  fetchUlHomes,
  postUlHome,
} from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListUlHomes, selectStatusUlHome } from "../../redux/ultilitiesHome/ulHomeSelector";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UlHomeComponent = () => {
  const dispatch = useDispatch();
  const listUlHome = useSelector(selectListUlHomes);
  const isLoading = useSelector(selectStatusUlHome)
  const [ulHomePost, setUlHomePost] = useState({
    name: "",
    photo: undefined,
  });
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  useEffect(() => {
    dispatch(fetchUlHomes());
  }, [dispatch]);

  const handleChange = (event) => {
    setUlHomePost((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePhoto = (event) => {
    setUlHomePost((preState) => ({
      ...preState,
      photo: event.target.files[0],
    }));
  };

  const handleAdd = () => {
    dispatch(postUlHome(ulHomePost)).then(()=>(
      dispatch(fetchUlHomes())
    ))
  };
  const handleDelete = () => {
    setOpenDialogDelete(false)

    dispatch(deleteUlHome(dataDelete)).then(()=>(
      dispatch(fetchUlHomes())

    ))
  };

  return (
    <Container sx={{ marginY: 20 }}>
      <Paper className="mb-6" elevation={2}>
        <Stack className="p-6">
          <Typography
            align="center"
            className="font-bold text-lg pb-6 font-sans underline decoration-green-500" 
          >
            THÊM TIỆN ÍCH TÒA NHÀ
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
            {listUlHome?.map((row, index) => (
              <TableRow className="" key={index}>
                <TableCell align="center">
                  <Avatar
                    variant="square"
                    className="mx-auto rounded transition duration-300 ease-in-out hover:scale-110"
                    src={
                      process.env.REACT_APP_API_URL + "/ulHome/" + row?.photo
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
    </Container>
  );
};

export default UlHomeComponent;
