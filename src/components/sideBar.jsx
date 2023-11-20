
import "./css/sideBar.css"
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const Sidebar1 =() => {
  const params = useLocation()
  let obj = params.state
  let list = useSelector(n => n.ListInvitedReducer.list)
  return <div>
  <div className="sidebar">
  
  <h1>Sidebar</h1>
  <ul>
    
    <li><NavLink to={"addInvited"}>הוספת מוזמנים</NavLink></li>
    <li><NavLink to={{path:"showAllInvited"  }}  state={{ obj }} >הצגת המוזמנים</NavLink></li>
    <li><NavLink to={"showAllInvitedTrue"}>הצגת המוזמנים שאישרו</NavLink></li>
  </ul>
</div>
<Outlet></Outlet>
 </div>
 
}