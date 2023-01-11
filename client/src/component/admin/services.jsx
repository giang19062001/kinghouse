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
import { useDispatch,useSelector } from "react-redux";
import { selectListServices, selectStatusServices } from "../../redux/service/serviceSelector";
import { deleteService, fetchServices, postService } from "../../redux/service/serviceThunk";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ServicesComponent = () => {
  const dispatch = useDispatch();
  const listService = useSelector(selectListServices)
  const isLoading = useSelector(selectStatusServices)
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [servicePose, serServicePost] = useState({
    name: "",
    photo: undefined,
  });
 
  useEffect(()=>{
   dispatch(fetchServices())
  },[dispatch])


  const handleChange = (event) => {
    serServicePost((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePhoto = (event) => {
    serServicePost((preState) => ({
      ...preState,
      photo: event.target.files[0],
    }));
  };

  const handleAdd = () => {
    console.log(servicePose);
    dispatch(postService(servicePose))
    .then(()=>{
      dispatch(fetchServices())

    })
  };
  const handleDelete = () => {
    setOpenDialogDelete(false)
    dispatch(deleteService(dataDelete))
    .then(()=>{
      dispatch(fetchServices())
    })
  };
  

  return (
    <Container sx={{ marginY: 20 }}>
      <Paper className="mb-6" elevation={2}>
        <Stack className="p-6">

          <Typography align="center" className="font-bold text-lg pb-6 font-sans  underline decoration-green-500">
            THÊM DỊCH VỤ
          </Typography>
          <Box className="space-y-5 flex flex-col  items-center ">
            <TextField
              label="Tên dịch vụ"
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
              Thêm dịch vụ
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
                TÊN DỊCH VỤ
              </TableCell>
              
              <TableCell
                align="center"
                className="font-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listService?.map((row, index) => (
            <TableRow className="" key={index}>
                <TableCell
                  align="center"
                >
                   <Avatar
                      variant="square"
                      className="mx-auto rounded transition duration-300 ease-in-out hover:scale-110"
                      src={
                        process.env.REACT_APP_API_URL + "/services/" + row?.photo
                      }
                    />
                </TableCell>
                <TableCell align="center">
                  {row?.name}
                </TableCell>
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

export default ServicesComponent;
