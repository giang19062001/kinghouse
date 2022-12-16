import Menu from "../../component/admin/menu"
import DepartDetailAdmin from "../../component/admin/departDetailAdmin"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";


const DepartDetailAdminPage = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <DepartDetailAdmin ></DepartDetailAdmin>
               </div>
        )}
    </>
      
    )
}
export default DepartDetailAdminPage