import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import { Container, Divider, Typography, Badge, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { TextField } from "@mui/material";
import { useSelector ,useDispatch} from "react-redux";
import { selectListDepart } from "../../redux/depart/departSelector";
import { fetchDeparts } from "../../redux/depart/departThunk";
import { Form } from "./form";
import "../../css/appbarSearch.scss"
import { Stack } from "@mui/system";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
 
  },
});
const CssTextFieldMobile = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
  },
});
const drawerWidth = 250;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
const Appbar = () => {
  const [open, setOpen] = React.useState(false);
  const [openSearchMobile, setOpenSearchMobile] = React.useState(false);
  const [openBoxSearch, setOpenBoxSearch] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState();
  const listDepart = useSelector(selectListDepart);
  const [openDialogForm, setOpenDialogForm] = React.useState(false);

  const dispatch = useDispatch();

  
  React.useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);
  
  const handleChangeValueSearch = (e) => {
    setValueSearch(e.target.value);
  };
  const handleFindSearch = React.useCallback(() => {
    setDataSearch(
      listDepart.filter((item) =>
        item.name.toUpperCase().includes(valueSearch.toUpperCase())
      )
    );
  }, [listDepart, valueSearch]);

  React.useEffect(() => {
    if (valueSearch === "") {
      setOpenBoxSearch(false);
    } else {
      handleFindSearch();
      setOpenBoxSearch(true);
    }
  }, [handleFindSearch, valueSearch]);


  const handleClickOpenDialogForm = () => {
    setOpenDialogForm(true);
  };

  const handleCloseDialogForm = () => {
    setOpenDialogForm(false);
  };


  return (
    <Box>
      <AppBar position="static" className="bg-slate-50 ">
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1, mr: 5 }}>
              <Link to="/">
                <Stack direction="row"
                 justifyContent="center"
                 alignItems="center"
                 id="idHoverImage"
                 >
                <img
                  src={require("../../assets/logoKingH.jpg")}
                  alt=""
                  className="mx-auto w-24 rounded-full"
                />
                <Box >
                <Typography id="idHoverTypography" align="center" className="text-slate-900 text-md tracking-tight font-bold		">King House</Typography>
                <Typography id="idHoverTypography"  align="center" className="text-slate-900 text-md	tracking-tight	">N??ng t???m gi?? tr??? s???ng</Typography>
                </Box>
              
                </Stack>
              
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
                mr: 1,
              }}
            >
              <Link to="/">
                <Typography id="idHover">TRANG CH???</Typography>
              </Link>
            </Box>

            <Box
              id="idBoxSearchLive"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
                mr: 6,
              }}
            >
              <CssTextField
                label="T??m ki???m c??n h???..."
                type="text"
                fullWidth
                onChange={handleChangeValueSearch}
              />
              <Box data-open={openBoxSearch}>
                {dataSearch?.length === 0 ? (
                  <p>
                    Kh??ng t??m th???y c??n h??? t??n "<b>{valueSearch}</b>"
                  </p>
                ) : (
                  dataSearch?.map((data, index) => (
                    <Link to={`/depart/` + data?._id}  key={data}>
                      <Box id="idBoxDataSearch">
                        <img
                          src={
                            process.env.REACT_APP_API_URL + "/departs/" +
                            data?.photo?.[0]
                          }
                          className="w-12 h-12 rounded-lg"
                          alt=""
                        />
                        &emsp;
                        <p>{data?.name}</p>
                      </Box>
                    </Link>
                  ))
                )}
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
                mr: 1,
              }}
            ></Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
                mr: 1,
              }}
            >
              
              <Button  onClick={() => {
                  handleClickOpenDialogForm();
                }}>
                <Typography id="idHover">????NG K?? T?? V???N</Typography>
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex" },
                mr: 1,
              }}
            >
              <Link to="/">
                <Typography id="idHover">LI??N H???</Typography>
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none", md: "none" },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="default"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        // variant="persistent"
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
          setOpenSearchMobile(false);
          setValueSearch("");
        }}
      >
        <DrawerHeader sx={{ backgroundColor: "#DDDDDD" }}>
          <Typography
            sx={{
              display: "block",
              margin: "auto",
              fontWeight: "bold",
              padding: 4.5,
            }}
          >
            MENU
          </Typography>
        </DrawerHeader>
        <Divider />

        <List sx={{ display: openSearchMobile === false ? "block" : "none" }}>
          <ListItem disablePadding>
            <Link to="/">
              <ListItemButton>
                <Typography
                  sx={{ fontSize: 15, padding: 1, fontFamily: "revert" }}
                >
                  <HomeIcon></HomeIcon> &ensp; TRANG CH???
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <Box>
              <ListItemButton
                onClick={() => {
                  setOpenSearchMobile(true);
                }}
              >
                <Typography
                  sx={{ fontSize: 15, padding: 1, fontFamily: "revert" }}
                >
                  <SearchIcon></SearchIcon> &ensp; T??M KI???M
                </Typography>
              </ListItemButton>
            </Box>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <Box>
              <ListItemButton onClick={() => {
                  handleClickOpenDialogForm();
                }}>
                <Typography
                  sx={{ fontSize: 15, padding: 1, fontFamily: "revert" }}
                >
                  <ContactMailIcon></ContactMailIcon> &ensp; ????NG K?? T?? V???N
                </Typography>
              </ListItemButton>
            </Box>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <Box>
              <ListItemButton>
                <Typography
                  sx={{ fontSize: 15, padding: 1, fontFamily: "revert" }}
                >
                  <PhoneIcon></PhoneIcon> &ensp;LI??N H???
                </Typography>
              </ListItemButton>
            </Box>
          </ListItem>
          <Divider />
        </List>
        <Box
          sx={{
            display: openSearchMobile === true ? "block" : "none",
            marginTop: 2,
          }}
        >
          <Box sx={{ padding: 2 }}>
            <CssTextFieldMobile
              label="T??m ki???m c??n h???..."
              type="text"
              fullWidth
              onChange={handleChangeValueSearch}
            />
          </Box>

          <Box data-open-mobile={openBoxSearch}>
            <p>Danh s??ch t??m ki???m</p>

            {dataSearch?.length === 0 ? (
              <p style={{ fontSize: "small" }}>
                Kh??ng t??m th???y c??n h??? t??n "<b>{valueSearch}</b>"
              </p>
            ) : (
              dataSearch?.map((data, index) => (
                <Link to={`/depart/` + data?._id} key={data}>
                  <Box sx={{ display: "flex", margin: 2 }}>
                    <img
                      src={
                        process.env.REACT_APP_API_URL + "/departs/"  + data?.photo?.[0]
                      }
                      alt=""
                      id="imgAppbarMobile"
                    />
                    <p style={{ fontSize: "small" }}>{data?.name}</p>

                  </Box>
                  <Divider className="my-6"/>

                </Link>
              ))
            )}
          </Box>
        </Box>
      </Drawer>
      {openDialogForm === true ? (<Form open={openDialogForm}  handleCallbackCloseDialog={handleCloseDialogForm}></Form>):null}

    </Box>
  );
};
export default Appbar;
