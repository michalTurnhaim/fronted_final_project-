import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { FillFlagO } from '../redux/action/flagAction'
import { Box } from "@mui/system";
import '../App.css'
import logoImage from "../img/logoNavBar.png"

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
    <nav style={{
      backgroundColor: ' #3b3a30', position: 'fixed', width: '100%', top: 0, 'z-index': '1000',
    }} dir="rtl" className="navbar navbar-expand-lg py-3 navbar-dark shadow-sm" >

      <div className="container">
        {/* <a href="#"> */}

        <img src={logoImage} width="100" />

        {/* <span className="text-upperwidtheight-bold">Company</span> */}
        {/* </a> */}

        {/* <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button> */}

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <div className="row">
              <li className="nav-item"><NavLink className="nav-link" to={"about"}>אודות</NavLink></li>
              {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"}>התחברות</NavLink></li>}
              {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"} onClick={() => { d(FillFlagO(false), sessionStorage.setItem('Current_User', null)) }}>התנתקות</NavLink></li>}
              {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"register"}>הרשמה</NavLink></li>}
              {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"newEvent"}>הוספת ארוע חדש</NavLink></li>}
              {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"ShowEventOfOwner"}>הצגת הארועים שלי</NavLink></li>}
              {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"showeventorders"}>אשור השתתפות בשמחות</NavLink></li>}
              {(user != null) && <li >שלום {user.firstNameInvitedDto}  {user.lastNameInvitedDto}</li>}
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <Box sx={{ pt: 13 }}>

      <Outlet></Outlet>
    </Box>
  </>
}