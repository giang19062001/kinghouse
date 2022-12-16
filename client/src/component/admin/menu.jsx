import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
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
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { offAuth } from "../../redux/auth/authSlice";


const drawerWidth = 230;

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleLogOut = () => {
    dispatch(offAuth());
    navigate("/");
  };


  return (

         <div>
         <AppBar
           position="fixed"
           open={open}
           className=" p-4 bg-neutral-700"
         >
           <Toolbar className="flex justify-between">
             <IconButton
               color="inherit"
               onClick={handleDrawerOpen}
               edge="start"
               // sx={{ ml: 5, ...(open && { display: 'none' }) }}
               sx={{  display: { xs: "block", sm:"block",md: "block",lg:"block" },marginLeft:{xs:0,sm:5,md:5,lg:5}}}
             >
               <MenuIcon  className="MenuIcon" />
             </IconButton>
             <Box className="float-right">
               <Typography
                 variant="h6"
                 className="text3d"
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
               backgroundColor: "#404040",
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
           <hr/>

           <List>
             {[
               "Danh sách toàn bộ căn hộ",
               "Danh sách đăng ký tư vấn",
               "Danh sách dịch vụ trong căn hộ",
               "Danh sách tiện ích trong căn hộ",
               "Danh sách tiện ích của tòa nhà",
             ].map((text, index) => (
               <Box>
                 <ListItem key={text} disablePadding>
                   <Link
                     to={
                       index === 0
                         ? `/admin/depart`
                         : index === 1
                         ? `/admin/form`
                         : index === 2
                         ? `/admin/service`
                         : index === 3
                         ? `/admin/ultilitiesDepart`
                         : index === 4
                         ? `/admin/ultilitiesHome`
                         : null
                     }
                   >
                     <ListItemButton sx={{ fontWeight: "bold",borderBlockEnd:"1px solid white" }}>
                       <ListItemIcon>
                         {index === 0 ? (
                           <HouseIcon className="text-slate-50" />
                         ) : index === 1 ? (
                           <PeopleAltIcon className="text-slate-50" />
                         ) : index === 2 ? (
                           <MiscellaneousServicesIcon className="text-slate-50" />
                         ) : index === 3 ? (
                           <AutoAwesomeOutlinedIcon className="text-slate-50" />
                         ) : index === 4 ? (
                           <AutoAwesomeIcon className="text-slate-50" />
                         ) : null}
                       </ListItemIcon>
                       <Typography className="text-slate-50">{text}</Typography>
                     </ListItemButton>
                   </Link>
                 </ListItem>
               </Box>
             ))}
             <Button
               sx={{ display: "block", margin: "auto" }}
               className="text-slate-50 bg-red-500 mt-6 hover:scale-105"
               onClick={handleLogOut}
             >
               Đăng xuất
             </Button>
           </List>
         </Drawer>
       </div>
   

  );
};
export default Menu;
