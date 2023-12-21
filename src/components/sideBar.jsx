
import "./css/sideBar.css"
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { objownerOfEvent } from "../redux/action/ownerOfEventAction";
import { getList } from "../redux/action/listInvitedAction";
import axios from "axios";
export const Sidebar1 = () => {
  const params = useLocation();
  let d = useDispatch();
  let obj = params.state;
  debugger
  console.log(obj);
  let list = useSelector(n => n.ListInvitedReducer.list);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    debugger
    
    axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${obj.idEventDto}`).then((k) => {
      d(getList(k.data))
      // sessionStorage.setItem('ListOfInvitedPerOwner', JSON.stringify(k.data))
  })

    d(objownerOfEvent(obj))
    navigate('showAllInvited', {state: obj});
  }, [])



  return <div>
    <div className="sidebar">

      <h1>Sidebar</h1>
      <ul>

        <li><NavLink to={"addInvited"}>הוספת מוזמנים</NavLink></li>
        <li><NavLink to={"showAllInvited"}  >הצגת המוזמנים</NavLink></li>
        <li><NavLink to={"showAllInvitedTrue"}>הצגת המוזמנים שאישרו</NavLink></li>
      </ul>
    </div>
    <Outlet></Outlet>
  </div>

}