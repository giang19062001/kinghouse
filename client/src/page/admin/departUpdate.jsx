import Menu from "../../component/admin/menu"

import DepartUpdate from "../../component/admin/departUpdate"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
import React from "react";


const DepartUpdatePage = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
     <React.Fragment>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <DepartUpdate></DepartUpdate>
        </div>
        )}
    </React.Fragment>
    )
}
export default DepartUpdatePage