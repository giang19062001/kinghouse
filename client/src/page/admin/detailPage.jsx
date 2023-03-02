import Menu from "../../component/admin/menu"
import DepartDetailAdmin from "../../component/admin/departDetailAdmin"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";
import Footer from "../../component/user/footer";


const DepartDetailAdminPage = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <DepartDetailAdmin ></DepartDetailAdmin>
            <Footer></Footer>
               </div>
        )}
    </React.Fragment>
      
    )
}
export default DepartDetailAdminPage