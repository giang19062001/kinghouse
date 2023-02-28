import Menu from "../../component/admin/menu"
import UlDepartComponent from "../../component/admin/ulDepart"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";

const HomeUlDepart = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <UlDepartComponent></UlDepartComponent>
               </div>
        )}
    </React.Fragment>
      
    )

}
export default HomeUlDepart