import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { getList } from "../redux/action/listInvitedAction"

export const AddInvited = () => {
    //https://localhost:44325/api/InvitedToEvent/addTheInvitedToEvent
    //post
    let list = useSelector(n => n.ListInvitedReducer.list)
    let myfirstName = useRef()
    let mylastName = useRef()
    let myidtype = useRef()
    let myemail = useRef()
    const params = useLocation()
    let id = params.state
    const [user, setuser] = useState({})
    const [invitedtoevent, setinvitedtoevent] = useState({ emailInvitedDto: "", idEventDto: id, idTypeInviteDto: 6002, isComeDto: false })
    let d = useDispatch()

    const chec = (e) => {
        setuser({ ...user, emailInvitedDto: e.target.value })
        setinvitedtoevent({ ...invitedtoevent, emailInvitedDto: e.target.value })

    }
    const add = () => {
        debugger
        //שמירת כתובת מייל שהוזנה
        let email = user.emailInvitedDto
        let flag = false
        let flag2 = false
        //מעבר על רשימת המוזמנים לארוע הספציפי 

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            //בדיקה אם קיים מוזמן זה כבר
            if (email == element.emailInvitedDto) {
                flag = true
                alert("הזמנתם את המוזמן הזה")
                break;
            }
        }
        //אם לא קיים
        if (flag == false) {
            //בדיקה אם כתובת מייל זה רשומה במערכת בתור INVITED
            axios.get(`https://localhost:44325/api/Invited/login/${email}`).then(c => {
                //אם לא רשום
                if (c.status != 200) {
                    debugger
                    flag2 = true
                    //הכנסת מוזמן חדש

                    axios.post("https://localhost:44325/api/Invited/addTheInvited", user).then(x => {
                        console.log(x.data)
                        d(getList(x.data))

                    })
                }
            }
            )
            //הכנסת מוזמן לארוע חדש
            // else {
            console.log("*****************");
            console.log(invitedtoevent);

            axios.post("https://localhost:44325/api/InvitedToEvent/addTheInvitedToEvent", invitedtoevent).then(x => {
                console.log(x.data)
            })

            axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${invitedtoevent.idEventDto}`).then((k) => {
                    // d(getList(k.data),
                    sessionStorage.setItem('ListOfInvitedPerOwner',  JSON.stringify(k.data))
                }
            )

            // }

        }
    }

    return <>
        <TextField color="secondary" id="outlined-basic" label="שם פרטי" variant="outlined" onChange={(e) => setuser({ ...user, firstNameInvitedDto: e.target.value })} />
        <TextField color="secondary" id="outlined-basic" label="שם משפחה" variant="outlined" onChange={(e) => setuser({ ...user, lastNameInvitedDto: e.target.value })} />
        <TextField color="secondary" id="outlined-basic" label="סוג מוזמן" variant="outlined" />
        <TextField color="secondary" id="outlined-basic" label="כתובת מייל" variant="outlined" onChange={(e) => chec(e)} />
        <button onClick={() => add()}>📥</button>
    </>

}