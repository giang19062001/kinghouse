import ListForm from "../../component/admin/listForm"
import Menu from "../../component/admin/menu"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";
import Footer from "../../component/user/footer";

const HomeForm = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <ListForm></ListForm>
            <Footer></Footer>
               </div>
        )}
    </React.Fragment>
      
    )

}
export default HomeForm