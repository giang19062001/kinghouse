import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchForm, fetchFormDetail } from "../../redux/form/formThunk";
import {
  selectFormDetail,
  selectListForms,
} from "../../redux/form/formSelector";
import { useState } from "react";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import { selectDepartDetail } from "../../redux/depart/departSelector";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListForm() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    dispatch(fetchForm());
  }, [dispatch]);

  const ListForm = useSelector(selectListForms);
  const formDetail = useSelector(selectFormDetail);
  const departDetail = useSelector(selectDepartDetail);

  console.log(ListForm);
  return (
    <Container sx={{ marginY: 10 }}>
      <Typography align="center" className="font-bold text-2xl mb-6">
        DANH SÁCH KHÁCH HÀNG ĐĂNG KÝ TƯ VẤN
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-sky-400">
              <StyledTableCell align="center" className="font-bold">
                Họ và tên
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Email
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Thời gian đăng ký tư vấn
              </StyledTableCell>

              <StyledTableCell
                align="center"
                className="font-bold"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListForm?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">
                  <Typography className=" font-bold"> {row?.name}</Typography>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="text-red-500 font-bold"
                >
                  {row?.phone}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row?.createdAt).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    className="bg-sky-400 text-slate-50  hover:bg-sky-600   "
                    onClick={() => {
                      handleClickOpenDialog();
                      dispatch(fetchFormDetail(row?._id));
                      dispatch(fetchDepartDetail(row?.depart));
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <Divider />
        <DialogContent> 
          <Typography sx={{fontWeight:"bold",padding:1,backgroundColor:"#47B5FF",marginBottom:1,color:"white"}}
           align="center" variant="h6">CHI TIẾT ĐƠN ĐĂNG KÝ</Typography>
          <Grid container >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  sx={{border:"1px solid #47B5FF",padding:2,borderRadius:2}}>
              <Stack spacing={2} sx={{ paddingY: 2 }}>
                <Typography>Họ tên: <b>{formDetail?.name}</b></Typography>
                <Typography>SĐT: <b>{formDetail?.phone}</b></Typography>
                <Typography>Email: <b>{formDetail?.email}</b></Typography>
                <Typography>Nội dung tư vấn: <b>{formDetail?.note}</b></Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}  sx={{border:"1px solid #47B5FF",padding:2,borderRadius:2}}>
              <Stack spacing={2} sx={{ paddingY: 2 }}>
                <Typography><b>{departDetail?.name}</b></Typography>
                <Typography><b>{departDetail?.type}</b></Typography>
                <Typography>Gía thuê: <b>{departDetail?.price} VNĐ </b></Typography>
                <Typography>Tiền điện: <b>{departDetail?.electricMoney}/kw </b></Typography>
                <Typography>Tiền nước: <b>{departDetail?.waterMoney}/người </b></Typography>
                <Typography>Địa chỉ: <b>{departDetail?.addressHouse} </b></Typography>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
