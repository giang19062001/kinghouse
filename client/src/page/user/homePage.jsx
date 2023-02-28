import Appbar from "../../component/user/appbar";
import Footer from "../../component/user/footer";
import Home from "../../component/user/home";
import HomeHot from "../../component/user/homeHot";
import HomePromotion from "../../component/user/homtPromotion";
import Search from "../../component/user/search";
import background from "../../assets/background.jpg";
import React from "react";
const HomePage = () => {
  return (
    <React.Fragment>
      <Appbar></Appbar>
      <React.Fragment
        style={{
          backgroundImage: `url(${background})`,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Search></Search>
      </React.Fragment>
      <HomeHot></HomeHot>
      <HomePromotion></HomePromotion>
      <Home></Home>
      <Footer></Footer>
    </React.Fragment>
  );
};
export default HomePage;
