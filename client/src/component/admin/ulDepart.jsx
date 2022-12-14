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
    dispatch(postUlDepart(ulDepartPost)).then(() => {
      dispatch(fetchUlDeparts())
    });
  };
  const handleDelete = () => {
    setOpenDialogDelete(false)

    dispatch(deleteUlDepart(dataDelete)).then(() => {
      dispatch(fetchUlDeparts())
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
            TH??M TI???N ??CH C??N H???
          </Typography>
          <Box className="space-y-5 flex flex-col  items-center ">
            <TextField
              label="T??n ti???n ??ch c??n h???"
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
              Th??m ti???n ??ch
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
                T??N TI???N ??CH
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
                    X??a
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
      >        <DialogTitle sx={{backgroundColor:"#dc2626",color:"white",fontWeight:"bold"}}>C???nh b??o</DialogTitle>
      <Divider/>

        <DialogContent>
            <Typography variant="h5" align="center" sx={{fontWeight:"bold",padding:2}}>B???n c?? ch???c mu???n x??a</Typography>
        </DialogContent>
        <Divider/>

        <DialogActions>
          <Button onClick={handleDelete} sx={{display:"block",margin:"auto" }}  variant="outlined">X??c nh???n</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UlDepartComponent;
