import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Container } from "@mui/material";
import { selectListDepart } from "../../redux/depart/departSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDeparts,deleteDepart } from "../../redux/depart/departThunk";
import { Link,useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);

  const listDepart = useSelector(selectListDepart);
  
  const handleDelete = (data) =>{
    dispatch(deleteDepart(data))
    .then(()=>{
      navigate(0)
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
                Ảnh căn hộ
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Tên căn hộ
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Gía thuê
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Loại căn hộ
              </StyledTableCell>
              <StyledTableCell align="center" className="font-bold">
                Địa chỉ
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
                  {row?.price} VNĐ
                </StyledTableCell>
                <StyledTableCell align="center">{row?.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.addressHouse}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/admin/departUpdate/`+ row?._id}>
                  <Button className="bg-yellow-400 text-slate-50  hover:shadow-lg  hover:shadow-yellow-500/50"                 
                  >
                    Chỉnh sửa
                  </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button className="bg-red-600 text-slate-50  hover:bg-red-700 hover:shadow-lg  hover:shadow-red-500/50"
                  onClick={()=>handleDelete({id:row?._id,photo:row?.photo})}
                  >
                    Xóa
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
