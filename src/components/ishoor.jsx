
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FillAllInvitedToEventObj } from "../redux/action/invitedToEventObj";
import { error } from "./sweetAlert";

export const Ishoor = () => {
    debugger
    let user = useSelector(n => n.InvitedtReducer.obj)
    const myd = useDispatch()
    const [list, setlist] = useState([])
    const[listOwnerOfEvent,setlistOwnerOfEvent]=useState([])
    let nowDate = Date.now();
    console.log(list);
    useEffect(() => { 

        debugger
        axios.get("https://localhost:44325/api/OwnerOfEvent/getAllOwnerOfEvent").then(c=>
        {
        setlistOwnerOfEvent(c.data)})
   
        if (list.length == 0) {
            axios.get(`https://localhost:44325/api/InvitedToEvent/InvitedToEventbyEmail/${user.emailInvitedDto}`).then(k => {
                if (k.data.length == 0)
                    error("אינך מוזמן לשום ארוע")
                else
                    setlist(k.data)
                console.log(k.data)

            })
        }
    }, [])


    const sendObj = (item) => {
        debugger
        console.log(item)
        myd(FillAllInvitedToEventObj(item))
    }

    return <>

        {list.map((item) => (
        // (Date.parse(item.dateOfEventDto) > nowDate) ? (
        //     <Link onClick={() => sendObj(item)} to={"/toEnterinvited"} state={item} style={{disabled}} >
        //       <img key={item} width={'30%'} height={'50%'} style={{ marginLeft: '0.5%' }} alt="" src={`https://localhost:44325/${item.pic}`} />
        //     </Link>
        //   ) : (
        //     <Link onClick={() => sendObj(item)} to={"/toEnterinvited"} state={item}>
        //       <img key={item} width={'30%'} height={'50%'} style={{ marginLeft: '0.5%' }} alt="" src={`https://localhost:44325/${item.pic}`} />
        //     </Link>
        //   )
        //  (Date.parse(item.dateOfEventDto))>nowDate &&    <Link onClick={() => sendObj(item)} disabled to={"/toEnterinvited"} state={item}><img key={item} width={'30%'} height={'50%'} style={{ marginLeft: '0.5%' }} alt="" src={`https://localhost:44325/${item.pic}`} disabled></img></Link>
        <Link
  onClick={(e) => {
    if (Date.parse(item.dateOfEventDto) < nowDate) {
      e.preventDefault();
    } else {
      sendObj(item);
    }
  }}
  to={"/toEnterinvited"}
  state={item}
  className={Date.parse(item.dateOfEventDto) < nowDate ? "transparent-link" : ""}
>
  <img
    key={item}
    width={"30%"}
    height={"50%"}
    style={{ marginLeft: "0.5%" }}
    alt=""
    src={`https://localhost:44325/${item.pic}`}
  />
</Link>
        ))}
    </>

}