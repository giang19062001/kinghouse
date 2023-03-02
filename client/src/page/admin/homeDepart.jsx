import Menu from "../../component/admin/menu"
import Depart from "../../component/admin/depart"
import ListDepart from "../../component/admin/listDepart"

import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";
import Footer from "../../component/user/footer";
const HomeDepart = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div >
            <Menu></Menu>
            <Depart></Depart>
            <ListDepart></ListDepart>
            <Footer></Footer>
               </div>
)}
    
    </React.Fragment>
      
    )
 
}
export default HomeDepart