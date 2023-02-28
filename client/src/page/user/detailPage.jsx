import React from "react"
import Appbar from "../../component/user/appbar"
import DepartDetail from "../../component/user/departDetail"
import Footer from "../../component/user/footer"

const DetailPage = () =>{
    return (
        <React.Fragment>
       <Appbar></Appbar>
       <DepartDetail></DepartDetail>
       <Footer></Footer>
       </React.Fragment>
    )
}
export default DetailPage