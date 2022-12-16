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
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteUlHome,
  fetchUlHomes,
  postUlHome,
} from "../../redux/ultilitiesHome/ulHomeThunk";
import { selectListUlHomes } from "../../redux/ultilitiesHome/ulHomeSelector";

const UlHomeComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listUlHome = useSelector(selectListUlHomes);
  const [ulHomePost, setUlHomePost] = useState({
    name: "",
    photo: undefined,
  });

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
    dispatch(postUlHome(ulHomePost)).then(() => {
      navigate(0);
    });
  };
  const handleDelete = (data) => {
    dispatch(deleteUlHome(data)).then(() => {
      navigate(0);
    });
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
                    onClick={() =>
                      handleDelete({
                        id: row?._id,
                        name: row?.name,
                        photo: row?.photo,
                      })
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
    </Container>
  );
};

export default UlHomeComponent;
