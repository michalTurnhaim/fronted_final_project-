import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { FillFlagO } from '../redux/action/flagAction'


export const Navbar = () => {
  let d = useDispatch()
  let user = JSON.parse(sessionStorage.getItem('Current_User'))
  let isCurrentUser = useSelector(n => n.FlagReducer.flagO)
  let n = useNavigate()

  useEffect(() => {
    n("/about")
    if (user != null && user != undefined)
      d(FillFlagO(true))
    else
      d(FillFlagO(false))
  }, [])


  return <>
    <nav dir="rtl" className="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm" >
      <div className="container">
        <a href="#" className="navbar-brand">

          <img src="https://bootstrapious.com/i/snippets/sn-nav-logo/logo.png" width="45" alt="" className="d-inline-block align-middle mr-2"></img>

          <span className="text-uppercase font-weight-bold">Company</span>
        </a>

        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
        {/* <p>שלום {user.firstNameInvitedDto}  {user.lastNameInvitedDto}</p> */}
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink className="nav-link" to={"about"}>אודות</NavLink></li>
            {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"}>הזדהות</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"} onClick={() => { d(FillFlagO(false), sessionStorage.setItem('Current_User', null)) }}>התנתקות</NavLink></li>}
            <li className="nav-item"><NavLink className="nav-link" to={"register"}>הרשמה</NavLink></li>
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"newEvent"}>להוספת ארוע חדש</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"ShowEventOfOwner"}>להצגת ארועים  קודמים</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"showeventorders"}>אישור השתתפות בשמחות שהוזמנתי אליהם</NavLink></li>}

          </ul>
        </div>
      </div>
    </nav>
    <Outlet></Outlet>
  </>
}