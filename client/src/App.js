import { BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./page/user/homePage";
import './App.scss'
import HomeDepart from "./page/admin/homeDepart";
import HomeForm from "./page/admin/homeForm";
import DetailPage from "./page/user/detailPage";
import DepartDetailAdminPage from "./page/admin/detailPage";
import DepartUpdatePage from "./page/admin/departUpdate";
import HomeService from "./page/admin/homeServices";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}> </Route>
      <Route path="/depart/:id" element={<DetailPage/>}> </Route>

      <Route path="/admin/form" element={<HomeForm/>}> </Route>
      <Route path="/admin/service" element={<HomeService/>}> </Route>
      <Route path="/admin/depart" element={<HomeDepart/>}> </Route>

      <Route path="/admin/depart/:id" element={<DepartDetailAdminPage/>}> </Route>
      <Route path="/admin/departUpdate/:id" element={<DepartUpdatePage/>}> </Route>


    </Routes>
    </BrowserRouter>
      
  );
}

export default App;
