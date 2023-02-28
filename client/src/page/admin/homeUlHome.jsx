import Menu from "../../component/admin/menu"
import UlHomeComponent from "../../component/admin/ulHome"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";

const HomeUlHome = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <UlHomeComponent></UlHomeComponent>
               </div>
        )}
    </React.Fragment>
      
    )
   
}
export default HomeUlHome