import Menu from "../../component/admin/menu"
import ServicesComponent from "../../component/admin/services"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";

const HomeService = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <ServicesComponent></ServicesComponent>
               </div>
        )}
    </>
      
    )

}
export default HomeService