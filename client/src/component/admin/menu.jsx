import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import HouseIcon from "@mui/icons-material/House";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";


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
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box>
      <AppBar
        position="static"
        open={open}
        className=" p-4"
        id="background"
      >
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            // sx={{ ml: 5, ...(open && { display: 'none' }) }}
            sx={{ ml: 5, display: { xs: "block", md: "block" } }}
            className="text-neutral-900"
          >
            <MenuIcon />
          </IconButton>
          <Box className="float-right">
            <Typography
              variant="h6"
              className="text-neutral-900 font-bold "
            >
              KING HOUSE{" "}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor:"#EBEBEB"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="  py-3  ">
          <img
            src={require("../../assets/logoKingH.jpg")}
            alt=""
            className="w-20 p-3  mx-auto rounded-full  bg-slate-50 "
          />
        </DrawerHeader>
        <List >
          {["Danh sách căn hộ", "Danh sách đăng ký tư vấn"].map(
            (text, index) => (
              <Box >
                <ListItem key={text} disablePadding > 
                <Link to={index === 0 ? `/admin/depart` : `/admin/form`} >
                  <ListItemButton sx={{fontWeight:"bold"}} >
                      <ListItemIcon>
                        {index === 0 ? (
                          <HouseIcon className="" />
                        ) : index === 1 ? (
                          <PeopleAltIcon className="" />
                        ) : null}
                      </ListItemIcon>
                      <Typography className="font-bold "  >{text}</Typography>
                  </ListItemButton>
                  </Link>

                </ListItem>
                <Divider />
              </Box>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
};
export default Menu;
