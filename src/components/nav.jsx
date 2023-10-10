import { color } from "@mui/system"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"

export const Nav=()=>{
  debugger
  let user = useSelector(n => n.InvitedtReducer.obj)
  let flago=useSelector(x=>x.FlagReducer.flagO)
  let flagi=useSelector(x=>x.FlagReducer.flagI)
  console.log(user);
    return <div>
    <nav className="navbar navbar-inverse" >
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" ></a>
        </div>
        <ul className="nav navbar-nav">
          <li className = "active" style={{color:"white",position:"sticky"}}>שלום {user.firstNameInvitedDto}  {user.lastNameInvitedDto} </li>
        
         <li className = "active"><NavLink to={"about"}>אודות</NavLink></li>
         <li className = "active"><NavLink to={"showMyEvents"}>הזדהות</NavLink></li>
         <li className = "active"><NavLink to={"register"}>הרשמה</NavLink></li>  
         {/* <li className = "active"><NavLink to={"chooseTypeService"}>בחירת סוג שרות</NavLink></li> */}

      {(flago || flagi) &&<li className = "active"><NavLink to={"newEvent"}>להוספת ארוע חדש</NavLink></li>}
      {(flago || flagi) &&<li className = "active"><NavLink to={"ShowEventOfOwner"}>להצגת ארועים  קודמים</NavLink></li>}
     {(flago || flagi) &&<li className = "active"><NavLink to={"showeventorders"}>אישור השתתפות בשמחות שהוזמנתי אליהם</NavLink></li>}

     {/* {flago  && <li className = "active"><NavLink to={"pay"}>תשלום</NavLink></li>} */}
         
       </ul>

      </div>

      </nav>
      {/* <a href='../try.xlsx' download>Click to download</a> */}
    <Outlet></Outlet>
  </div>
}