import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FillAllInvitedToEvent } from "../redux/action/InvitedToEventAction";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FillFilterInvitedToEvent } from "../redux/action/InvitedToEventFilterAction";
import { FillFlagI, FillFlagO } from "../redux/action/flagAction";
import { useNavigate } from "react-router-dom";
import { FillInvited } from "../redux/action/InvitedAction";


export const EzorIshi = () => {
    debugger
    let n = useNavigate()
    let mail = useRef()
    let list = useSelector(n => n.InvitedToEventReducer.listInvitedToEvent)
    let d = useDispatch()
    let listF = []
    // const [listF, setlistF]=useState([])
    const mailj = () => {
        debugger
        if (mail.current.value!=null)
        {
        axios.get(`https://localhost:44325/api/Invited/login/${mail.current.value}`).then(c => {
            console.log(c.data);
            if (c.status==200) {
                d(FillFlagO(true))
                d(FillFlagI(true))
                d(FillInvited(c.data))


                sessionStorage.setItem('Current_User', JSON.stringify(c.data))

                n("/ShowEventOfOwner")
            }
            else
            n("/register") 
        })}

        // debugger
        // listF= list.filter(c => c.emailInvitedDto == mail.current.value)
        // d(FillFilterInvitedToEvent(listF))
    }

    useEffect(() => {
        debugger
        axios.get('https://localhost:44325/api/InvitedToEvent/getAllInvitedToEvent').then(k => {
            debugger
            // console.log(k.data)
            d(FillAllInvitedToEvent(k.data))
        })
    }, [])

    return <div>
        <h3>הזן את כתובת המייל ו</h3>
        <TextField inputRef={mail} color="secondary" id="outlined-basic" label="הכנס כתובת מייל לזיהוי" variant="outlined" />
        <button onClick={() => mailj()}>אישור</button>
        {/* <Link to={"/showeventorders"} state = {listF} style={{ color: 'black' }}>
             <h4>אישור</h4></Link> */}
        {/* <button onClick={()=>mailj()}>לסיום</button> */}
       

    </div>
}