import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
export const ShowEventOfOwner = () => {
    let user = JSON.parse(sessionStorage.getItem('Current_User'))
    const [arrNameImg, setarrNameImg] = useState([])
    let d=useDispatch()
    useEffect(() => {

        if (arrNameImg.length == 0) {
            axios.get(`https://localhost:44325/api/Functions/returnListOfOwnerByEmail/${user.emailInvitedDto}`).then(l => {
                if (l.data.length == 0)
                    alert("לא יצרת שום ארוע")
                else {
                    setarrNameImg(l.data)
                    debugger
                    console.log(l.data);
                }
            })
        }
    }, [])
    return <>
        {arrNameImg.map((p) =>
            <Link key={p} to="/moreDetails" state={p} ><img key={p} width={'30%'} height={'50%'} style={{marginLeft:'0.5%'}} alt="" src={`https://localhost:44325/${p.nameFileInvitationDto}`}></img></Link>
        )}
    </>
}