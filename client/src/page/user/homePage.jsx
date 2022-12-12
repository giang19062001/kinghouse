import Appbar from "../../component/user/appbar"
import CarouselComponent from "../../component/user/carousel"
import Footer from "../../component/user/footer"
import Home from "../../component/user/home"
import HomeHot from "../../component/user/homeHot"
import HomePromotion from "../../component/user/homtPromotion"
import Search from "../../component/user/search"
import background from "../../assets/background.jpg"
const HomePage = () =>{
    return (
        <div>
       <Appbar></Appbar>
       {/* <CarouselComponent></CarouselComponent> */}
       <div style={{backgroundImage: `url(${background})`,paddingTop:10,paddingBottom:10}}>
       <Search></Search>

       </div>
       <HomeHot></HomeHot>
       <HomePromotion></HomePromotion>
       <Home></Home>
       <Footer></Footer>
       </div>
    )
}
export default HomePage