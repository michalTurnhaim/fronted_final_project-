import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { About } from "./about";
import { EzorIshi } from "./ezorIshi";
import { Register } from "./register"
import { ShowEventInvited } from "./showEventInvited";
import { ShowEventOfOwner } from "./showEventOfOwner";
import { ToEnterInvitedAmount } from "./toEnterHowMuchInvited";
import { ShowAllInvitedTrue } from "./showAllInvitedTrue"
import { ShowAllInvited } from "./showAllInvited";
import { AddInvited } from "./addInvited";
import { Navbar } from "./navbar";
import { Sidebar1 } from "./sideBar";
import { AddNewEvent } from "./addNewEvent";
import { ChangePassword } from "./changePassword";
import { ChooseNewPassword } from "./ChooseNewPassword";

export const Routing = () => {
    return <Routes>
        <Route path="/" element={<Navbar></Navbar>}>
            <Route path="about" element={<About></About>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="newEvent" element={<AddNewEvent></AddNewEvent>}></Route>
            <Route path="connect" element={<EzorIshi></EzorIshi>}></Route>
            <Route path="ShowEventOfOwner" element={<ShowEventOfOwner></ShowEventOfOwner>}></Route>
            <Route path="showeventorders" element={<ShowEventInvited></ShowEventInvited>}></Route>
            <Route path="toEnterinvited" element={<ToEnterInvitedAmount></ToEnterInvitedAmount>}></Route>
            <Route path="/sideBar" element={<Sidebar1></Sidebar1>}>
                <Route path="addInvited" element={<AddInvited></AddInvited>}></Route>
                <Route path="showAllInvited" element={<ShowAllInvited></ShowAllInvited>}></Route>
                <Route path="showAllInvitedTrue" element={<ShowAllInvitedTrue></ShowAllInvitedTrue>}></Route>
            </Route>
            <Route path="/changePassword" element={<ChangePassword></ChangePassword>}></Route>
            <Route path="chooseNewPassword" element={<ChooseNewPassword></ChooseNewPassword>}></Route>
        </Route>
    </Routes>

}