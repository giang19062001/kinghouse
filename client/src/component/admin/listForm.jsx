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
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteForm, fetchForm, fetchFormDetail } from "../../redux/form/formThunk";
import {
  selectFormDetail,
  selectListForms,
  selectLoadingForm,
} from "../../redux/form/formSelector";
import { useState } from "react";
import { fetchDepartDetail } from "../../redux/depart/departThunk";
import { selectDepartDetail } from "../../redux/depart/departSelector";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

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
  const isLoading = useSelector(selectLoadingForm)
  const formDetail = useSelector(selectFormDetail);
  const departDetail = useSelector(selectDepartDetail);

  const handleDelete = () =>{
    setOpenDialogDelete(false)
    dispatch(deleteForm(idDelete)).then(()=>{
      dispatch(fetchForm());

    })
  }
  console.log(ListForm);
  return (
    <Container sx={{ marginY: 20 }}>
      <p className="p">
        <span className="fancy"> Danh sách đăng ký tư vấn</span>
      </p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-sky-500">
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
              <StyledTableCell
                align="center"
                className="font-bold"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListForm.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  <Typography className=" font-bold text-red-500">
                    {" "}
                    Danh sách đăng ký tư vấn trống
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ListForm?.map((row, index) => (
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
                      className="bg-sky-500 text-slate-50  hover:bg-sky-700  "
                      onClick={() => {
                        handleClickOpenDialog();
                        dispatch(fetchFormDetail(row?._id));
                        dispatch(fetchDepartDetail(row?.depart));
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className="bg-red-500 text-slate-50  hover:bg-red-700  "
                      onClick={
                        ()=>{setOpenDialogDelete(true);setIdDelete(row?._id)}
                      }
                    >
                     Xóa
                    </Button>
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialogDelete}
        onClose={()=>{setOpenDialogDelete(false);setIdDelete("")}}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <Divider />
        <DialogContent>
          <Typography
            sx={{
              fontWeight: "bold",
              padding: 1,
              backgroundColor: "#38bdf8",
              marginBottom: 1,
              color: "white",
              borderRadius: 10,
            }}
            align="center"
            variant="h6"
          >
            CHI TIẾT ĐƠN ĐĂNG KÝ
          </Typography>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{ border: "1px solid #404040", padding: 2, borderRadius: 2 }}
            >
              <Stack spacing={2} sx={{ paddingY: 2, overflow: "auto" }}>
                <Typography>
                  Họ tên: <b>{formDetail?.name}</b>
                </Typography>
                <Typography>
                  SĐT: <b>{formDetail?.phone}</b>
                </Typography>
                <Typography>
                  Email: <b>{formDetail?.email}</b>
                </Typography>
                <Typography>
                  Nội dung tư vấn: <b>{formDetail?.note}</b>
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{ border: "1px solid #404040", padding: 2, borderRadius: 2 }}
            >
              <Stack spacing={2} sx={{ paddingY: 2, overflow: "auto" }}>
                {departDetail?.isDelete === true ? (
                  <Typography sx={{ color: "red"}}>
                    <b>
                      <p>
                        {departDetail?.name} ({" "}
                        <small>Căn hộ này đã được xóa</small>)
                      </p>
                    </b>
                  </Typography>
                ) : (
                  <Typography sx={{ color: "#38bdf8", cursor: "pointer" }}>
                    <b>
                      <a href={`/admin/depart/${departDetail?._id}`}>
                        {departDetail?.name}
                      </a>
                    </b>
                  </Typography>
                )}

                <Typography>
                  Loại căn hộ: <b>{departDetail?.type}</b>
                </Typography>
                <Typography>
                  Gía thuê: <b>{departDetail?.price} VNĐ </b>
                </Typography>
                <Typography>
                  Tiền điện: <b>{departDetail?.electricMoney}/kw </b>
                </Typography>
                <Typography>
                  Tiền nước: <b>{departDetail?.waterMoney}/người </b>
                </Typography>
                <Typography>
                  Địa chỉ: <b>{departDetail?.addressHouse} </b>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
}
