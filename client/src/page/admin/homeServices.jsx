import Menu from "../../component/admin/menu"
import ServicesComponent from "../../component/admin/services"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";
import Footer from "../../component/user/footer";

const HomeService = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <ServicesComponent></ServicesComponent>
            <Footer></Footer>
               </div>
        )}
    </React.Fragment>
      
    )

}
export default HomeService