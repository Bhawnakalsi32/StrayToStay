 
import Adminheader from "./Adminheader";
import AdminFooter from "./AdminFooter";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLayout(){
    //  let isLogin=sessionStorage.getItem("isLogin")
    // let userType=sessionStorage.getItem("userType")
    // if(!isLogin || userType!=1){
    //     toast.error("You cannot access this page");
    //     return <Navigate to={"/"}/>
    // }
    return(
        <>
        <Adminheader/>
        <Outlet/>
        <AdminFooter/>

        </>
        
    )
}
export default AdminLayout;
