import { TextField } from "@mui/material";
import { useRef } from "react";
import axios from "axios";

export const Register = () => {
    let myfirstName = useRef()
    let mylastName = useRef()
    let myemail = useRef()
    let newobj = {}

    const chec = () => {
        debugger
        let obj = {
            emailInvitedDto: myemail.current ?.value,
            firstNameInvitedDto: myfirstName.current ?.value,
            lastNameInvitedDto: mylastName.current ?.value}
        newobj = { ...obj }
        addInvited()
    }
    const addInvited = () => {
        debugger
        axios.post(`https://localhost:44325/api/Invited/addTheInvited`, newobj).then(x => {
            debugger

            console.log(x.data)
        })
        myfirstName.current.value = ""
        mylastName.current.value = ""
        myemail.current.value = ""
    }
    return <div>
        <h1>הכנס את הפרטים הבאים</h1>
        <TextField inputRef={myfirstName} required color="secondary" id="outlined-number" label="שם פרטי" type="text" InputLabelProps={{ shrink: true, }} />
        <TextField inputRef={mylastName} required color="secondary" id="outlined-number" label="שם משפחה" type="text" InputLabelProps={{ shrink: true, }} />
        <TextField inputRef={myemail} required color="secondary" id="outlined-number" label="מייל" type="text" InputLabelProps={{ shrink: true, }} />
        <button onClick={() => chec()}>להוספה</button>

    </div>
}