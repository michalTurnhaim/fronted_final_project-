
import "./css/sideBar.css"
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { objownerOfEvent } from "../redux/action/ownerOfEventAction";
import { getList } from "../redux/action/listInvitedAction";
import axios from "axios";
import { Box } from "@mui/system";
import { error } from "./sweetAlert";
export const Sidebar1 = () => {
  const params = useLocation();
  let d = useDispatch();
  let obj = params.state;
  let myObj = useSelector(x => x.OwnerOfEventReducer.object)
  let dateOfEvent = myObj.dateOfEventDto
  debugger
  console.log(obj);
  let list = useSelector(n => n.ListInvitedReducer.list);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let nowDate = Date.now();
  useEffect(() => {
    debugger

    axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${obj.idEventDto}`).then((k) => {
      d(getList(k.data))
      // sessionStorage.setItem('ListOfInvitedPerOwner', JSON.stringify(k.data))
    })

    d(objownerOfEvent(obj))
    navigate('showAllInvited', { state: obj });
  }, [])



  return <div>


    <div className="sidebar" style={{ marginTop: "87px" }}>

      <ul>

        {<li><NavLink
          onClick={(e) => {
            if (Date.parse(dateOfEvent) < nowDate) {
            e.preventDefault();
            error("תאריך הארוע עבר, לא ניתן להוסיף מוזמנים")
          
          }
       }
          }
          style={{ color: '#3b3a30' }} to={"addInvited"}>הוספת מוזמנים</NavLink></li>}
        <li><NavLink style={{ color: '#3b3a30' }} to={"showAllInvited"}  >הצגת המוזמנים</NavLink></li>
        <li><NavLink style={{ color: '#3b3a30' }} to={"showAllInvitedTrue"}>הצגת המוזמנים שאישרו</NavLink></li>
      </ul>
    </div>


    <Outlet ></Outlet>
  </div>

}