import Menu from "../../component/admin/menu"
import UlHomeComponent from "../../component/admin/ulHome"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";

const HomeUlHome = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <UlHomeComponent></UlHomeComponent>
               </div>
        )}
    </>
      
    )
   
}
export default HomeUlHome