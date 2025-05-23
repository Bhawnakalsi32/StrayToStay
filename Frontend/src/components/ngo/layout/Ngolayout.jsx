import { Outlet } from "react-router-dom";
import Ngoheader from "./Ngoheader";
import Ngofooter from "./Ngofooter";

function Ngolayout(){
    return(
        <>
        <Ngoheader/>
        <Outlet/>
        <Ngofooter/>
        </>
    )
}
export default Ngolayout;