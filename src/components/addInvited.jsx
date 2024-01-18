import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { getList } from "../redux/action/listInvitedAction"
import { error } from "./sweetAlert";

export const AddInvited = () => {
    //https://localhost:44325/api/InvitedToEvent/addTheInvitedToEvent
    //post
    let list = useSelector(n => n.ListInvitedReducer.list)
    let myfirstName = useRef()
    let mylastName = useRef()
    let myidtype = useRef()
    let myemail = useRef()
    const params = useLocation()
    const [password, setPassword] = useState(0)
    let obj = useSelector(x => x.OwnerOfEventReducer.object)
    // let id = params.state
    const [user, setuser] = useState({})
    const [invitedtoevent, setinvitedtoevent] = useState({ emailInvitedDto: "", idEventDto: obj.idEventDto, idTypeInviteDto: 6002, isComeDto: false })
    let d = useDispatch()

    const chec = (e) => {
        let num = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        setPassword(num)
        //changePassword(num)
        setuser({ ...user, emailInvitedDto: e.target.value, passWordDto: num })
        setinvitedtoevent({ ...invitedtoevent, emailInvitedDto: e.target.value })

    }
   
    async function add() {
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
                error("הזמנתם את המוזמן הזה")
                break;
            }
        }
        //אם לא קיים
           if (flag == false) {
       // בדיקה אם כתובת מייל זה רשומה במערכת בתור INVITED
        try {
            await axios.get(`https://localhost:44325/api/Invited/checEmailIfExists/${email}`).then(c => {
                //אם לא רשום
                if (c.status == 204) {
                    debugger
                    flag2 = true
                    //הכנסת מוזמן חדש
                    axios.post("https://localhost:44325/api/Invited/addTheInvited", user).then(x => {
                        console.log(x.data)
                        d(getList(x.data))

                    })
                }

                else{
                    // changePassword(c.data.passWordDto)
                    setPassword(c.data.passWordDto)
                    setuser(({ ...user,passWordDto: c.data.passWordDto }))
                }

            }
            )
        }
        catch{

        }
        //הכנסת מוזמן לארוע חדש
        // else {
        console.log("*****************");
        console.log(invitedtoevent);
        try {
            await axios.post("https://localhost:44325/api/InvitedToEvent/addTheInvitedToEvent", invitedtoevent).then(x => {
                console.log(x.data)
                setuser({});
            })
        }
        catch{

        }
       



            // axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${invitedtoevent.idEventDto}`).then((k) => {
            //         // d(getList(k.data),
            //         // sessionStorage.setItem('ListOfInvitedPerOwner',  JSON.stringify(k.data))
            //         console.log(k.data)
            //     }
            // )

            // }
            try {
                await axios.get(`https://localhost:44325/api/Functions/SendEmail/${user.emailInvitedDto}/${password}/${obj.nameFileInvitationDto}`).then(n => {
                    debugger
                })
            }
            catch{ }


        }
        //יצירת סיסמא למשתמש החדש
        //    async function changePassword (num) {
        //         //הגרלת מספר לסיסמא
        //         debugger




        //     }
    }

    return <>
        <TextField color="secondary" id="outlined-basic" label="שם פרטי" variant="outlined" onChange={(e) => setuser({ ...user, firstNameInvitedDto: e.target.value })} />
        <TextField color="secondary" id="outlined-basic" label="שם משפחה" variant="outlined" onChange={(e) => setuser({ ...user, lastNameInvitedDto: e.target.value })} />
        <TextField color="secondary" id="outlined-basic" label="סוג מוזמן" variant="outlined" />
        <TextField color="secondary" id="outlined-basic" label="כתובת מייל" variant="outlined" onChange={(e) => chec(e)} />
        <button onClick={() => add()}>📥</button>
    </>

}