import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import { selectListDepart, selectStatusDepart } from "../../redux/depart/departSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDeparts,deleteDepart } from "../../redux/depart/departThunk";
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight:"bold"
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

export default function ListDepart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);

  const listDepart = useSelector(selectListDepart);
  const isLoading = useSelector(selectStatusDepart)
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const handleDelete = () =>{
    setOpenDialogDelete(false)
    dispatch(deleteDepart(dataDelete))
    .then(()=>{
      dispatch(fetchDeparts());
    })
  }

  console.log(listDepart);
  return (
    <Container sx={{ marginY: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-sky-500">
              <StyledTableCell align="center" className="font-bold">
                ???nh c??n h???
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                T??n c??n h???
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                G??a thu??
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Lo???i c??n h???
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                ?????a ch???
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
            {listDepart?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">
                  <Link to={`/admin/depart/` + row?._id}>
                    <Avatar
                      variant="square"
                      className="w-48 h-48 rounded transition duration-300 ease-in-out hover:scale-110"
                      src={
                        process.env.REACT_APP_API_URL + "/departs/" + row?.photo?.[0]
                      }
                    />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/admin/depart/` + row?._id}  className="hover:text-sky-500"> {row?.name}</Link>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="text-red-500 font-bold"
                >
                  {row?.price} VN??
                </StyledTableCell>
                <StyledTableCell align="center">{row?.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.addressHouse}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/admin/departUpdate/`+ row?._id}>
                  <Button className="bg-yellow-400 text-slate-50  hover:shadow-lg  hover:shadow-yellow-500/50"                 
                  >
                    Ch???nh s???a
                  </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button className="bg-red-600 text-slate-50  hover:bg-red-700 hover:shadow-lg  hover:shadow-red-500/50"
                  onClick={
                    ()=>{setOpenDialogDelete(true);setDataDelete({id:row?._id,photo:row?.photo})}
                  }
                  >
                    X??a
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
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
}
