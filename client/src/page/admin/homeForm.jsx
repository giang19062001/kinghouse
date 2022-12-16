import ListForm from "../../component/admin/listForm"
import Menu from "../../component/admin/menu"
import { selectStatusAuth } from "../../redux/auth/authSelector";
import { PageForbidden } from "../../page/admin/pageForbidden";
import {  useSelector } from "react-redux";

const HomeForm = () =>{
    const auth = useSelector(selectStatusAuth);

    return (
        <>
        {auth === false?(
                <PageForbidden></PageForbidden>
        ):(
            <div>
            <Menu></Menu>
            <ListForm></ListForm>
               </div>
        )}
    </>
      
    )

}
export default HomeForm