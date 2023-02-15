import Menu from "../../component/admin/menu"
import Depart from "../../component/admin/depart"
import ListDepart from "../../component/admin/listDepart"

import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";
const HomeDepart = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <>
        {/* {auth === false?(
                <PageForbidden></PageForbidden>
        ):( */}
            <div>
            <Menu></Menu>
            <Depart></Depart>
            <ListDepart></ListDepart>
               </div>
        {/* )} */}
    
    </>
      
    )
 
}
export default HomeDepart