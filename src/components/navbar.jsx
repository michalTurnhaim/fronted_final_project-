import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { FillFlagO } from '../redux/action/flagAction'
import '../App.css'
import logoImage from "../img/logoNavBar.png"

// export const Navbar = () => {
//   let d = useDispatch()
//   let user = JSON.parse(sessionStorage.getItem('Current_User'))
  
//   let n = useNavigate()

//   useEffect(() => {
//     n("/about")
//     if (user != null && user != undefined)
//       d(FillFlagO(true))
//     else
//       d(FillFlagO(false))
//   }, [])


//   return <>
//     <nav style={{
//       backgroundColor: ' #3b3a30', position: 'fixed', width: '100%', top: 0, 'z-index': '1000',
//     }} dir="rtl" className="navbar navbar-expand-lg py-3 navbar-dark shadow-sm" >

//       <div className="container">
//         {/* <a href="#"> */}

//         <img src={logoImage} width="100" />

//         {/* <span className="text-upperwidtheight-bold">Company</span> */}
//         {/* </a> */}

//         {/* <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button> */}

//         <div id="navbarSupportedContent" className="collapse navbar-collapse">
//           <ul className="navbar-nav ml-auto">
//             <div className="row">
//               <li className="nav-item"><NavLink className="nav-link" to={"about"}>אודות</NavLink></li>
//               {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"}>התחברות</NavLink></li>}
//               {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"} onClick={() => { d(FillFlagO(false), sessionStorage.setItem('Current_User', null)) }}>התנתקות</NavLink></li>}
//               {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"register"}>הרשמה</NavLink></li>}
//               {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"newEvent"}>הוספת ארוע חדש</NavLink></li>}
//               {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"ShowEventOfOwner"}>הצגת הארועים שלי</NavLink></li>}
//               {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"showeventorders"}>אשור השתתפות בשמחות</NavLink></li>}
//               {(user != null) && <li >שלום {user.firstNameInvitedDto}  {user.lastNameInvitedDto}</li>}
//             </div>
//           </ul>
//         </div>
//       </div>
//     </nav>
//     <Box sx={{ pt: 13 }}>

//       <Outlet></Outlet>
//     </Box>
//   </>
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { right, left } from "@popperjs/core";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

 export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let user = JSON.parse(sessionStorage.getItem('Current_User'))
  let isCurrentUser = useSelector(n => n.FlagReducer.flagO)
  let d = useDispatch()
  let n = useNavigate()
  
  useEffect(() => {
        n("/about")
        if (user != null && user != undefined)
          d(FillFlagO(true))
        else
          d(FillFlagO(false))
       }, [])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return <>
    <AppBar position="static" >
        <Toolbar disableGutters dir="rtl"  sx={{backgroundColor: ' #3b3a30', position: 'fixed', width: '100%', top: 0, 'z-index': '1000',}}>
          <img src={logoImage} width="180" style={{marginRight:'0.5%'}} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#3b3a30"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             <MenuItem onClick={handleCloseNavMenu}>
             <Typography textAlign="center">
             {/* <ul className="navbar-nav ml-auto"> */}
          {/* <div className="row"> */}
            <li className="nav-item"><NavLink className="nav-link" to={"about"}style={{color:"#3b3a30"}}>אודות</NavLink></li>
            {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"} style={{color:"#3b3a30"}}>התחברות</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"connect"} onClick={() => { d(FillFlagO(false), sessionStorage.setItem('Current_User', null)) }} style={{color:"#3b3a30"}}>התנתקות</NavLink></li>}
            {(!isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"register"} style={{color:"#3b3a30"}}>הרשמה</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"newEvent"} style={{color:"#3b3a30"}}>הוספת ארוע חדש</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"ShowEventOfOwner"} style={{color:"#3b3a30"}}>הצגת הארועים שלי</NavLink></li>}
            {(isCurrentUser) && <li className="nav-item"><NavLink className="nav-link" to={"showeventorders"} style={{color:"#3b3a30"}}>אשור השתתפות בשמחות</NavLink></li>}
          {/* </div> */}
        {/* </ul> */}
        </Typography>
              </MenuItem>
            
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
          <div className="row" >
          {(user != null) && <Box sx={{color:"#c0ded9",fontSize:"100%",marginTop:'3%',mr:5}} >שלום {user.firstNameInvitedDto}  {user.lastNameInvitedDto}</Box>}

            <Button
              onClick={handleCloseNavMenu}
               sx={{ my: 2, color: 'white',mr:18 }}
         >
            <NavLink className="nav-link" to={"about"} style={{color:"#eaece5",fontSize:"130%"}}>אודות</NavLink>
            {(!isCurrentUser) && <NavLink className="nav-link" to={"connect"} style={{color:"#eaece5",fontSize:"130%"}}>התחברות</NavLink>}
            {(isCurrentUser) && <NavLink className="nav-link" to={"connect"} onClick={() => { d(FillFlagO(false), sessionStorage.setItem('Current_User', null)) }} style={{color:"#eaece5",fontSize:"130%"}}>התנתקות</NavLink>}
            {(!isCurrentUser) && <NavLink className="nav-link" to={"register"} style={{color:"#eaece5",fontSize:"130%"}}>הרשמה</NavLink>}
            {(isCurrentUser) && <NavLink className="nav-link" to={"newEvent"} style={{color:"#eaece5",fontSize:"130%"}}>הוספת ארוע חדש</NavLink>}
            {(isCurrentUser) && <NavLink className="nav-link" to={"showeventorders"} style={{color:"#eaece5",fontSize:"130%"}}>אשור השתתפות בשמחות</NavLink>}
            {(isCurrentUser) && <NavLink className="nav-link" to={"ShowEventOfOwner"} style={{color:"#eaece5",fontSize:"130%",}}>הצגת הארועים שלי</NavLink>}
              </Button>
               </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
    </AppBar>
     <Box sx={{ pt: 13 }}>

           <Outlet></Outlet>
         </Box>
  </>
}
