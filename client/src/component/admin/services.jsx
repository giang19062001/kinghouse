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
  Avatar
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectListServices } from "../../redux/service/serviceSelector";
import { deleteService, fetchServices, postService } from "../../redux/service/serviceThunk";

const ServicesComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const listService = useSelector(selectListServices)
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
      navigate(0)
    })
  };
  const handleDelete = (data) => {
    dispatch(deleteService(data))
    .then(()=>{
      // navigate(0)
    })
  };
  

  return (
    <Container sx={{ marginY: 20 }}>
      <Paper className="mb-6" elevation={2}>
        <Stack className="p-6">
          <Typography align="center" className="font-bold text-lg pb-6">
            THÊM DỊCH VỤ
          </Typography>
          <Box className="space-x-3 flex  items-center ">
            <TextField
              label="Tên dịch vụ"
              fullWidth
              type="text"
              name="name"
              onChange={handleChange}
            ></TextField>
            <input
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
                    onClick={()=>handleDelete({id:row?._id,name:row?.name,photo:row?.photo})}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ServicesComponent;
