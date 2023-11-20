import { useLocation, useNavigate, Outlet } from "react-router";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getList } from "../redux/action/listInvitedAction"
import { Sidebar1 } from "./sideBar";


export const MoreDetails = () => {
    //https://localhost:44325/api/Functions/invitedToEventDtoList/8109
    const params = useLocation()
    let obj = params.state
    let list = useSelector(n => n.ListInvitedReducer.list)
    let d = useDispatch()
    let navigate = useNavigate()
    console.log(obj);
    useEffect(() => {
        navigate("/sideBar")
        if (list.length == 0)
            axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${obj.idEventDto}`).then((k) => {
                // d(getList(k.data),
                sessionStorage.setItem('ListOfInvitedPerOwner', JSON.stringify(k.data))
            }
            )
    }, [])
    const showAllInvited = () => {
        navigate("/showAllInvited")
    }
    const showAllInvitedTrue = () => {
        navigate("/showAllInvitedTrue")
    }
    const addInvited = () => {
        navigate("/addInvited", { state: obj.idEventDto })
    }
    return <>
        <img src={`https://localhost:44325/${obj.nameFileInvitationDto}`} width={'30%'}></img>
        <button onClick={() => showAllInvited()}>הצגת כל המוזמנים לארוע</button>
        <button onClick={() => showAllInvitedTrue()}>הצגת כל המאשרים</button>
        <button onClick={() => addInvited()}>הוספת מוזמנים</button>
        {/* <Sidebar1></Sidebar1> */}
        
    </>
}