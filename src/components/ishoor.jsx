
import { ImageListItem } from "@mui/material"
import { ImageList } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FillAllInvitedToEventObj } from "../redux/action/invitedToEventObj";

export const Ishoor = () => {
    let user = useSelector(n => n.InvitedtReducer.obj)
    const myd=useDispatch()
    const [list, setlist] = useState([])

    useEffect(() => {
        if(list.length==0){

       
        axios.get(`https://localhost:44325/api/InvitedToEvent/InvitedToEventbyEmail/${user.emailInvitedDto}`).then(k => {
              if (k.data.length == 0)
                alert("אינך מוזמן לשום ארוע")
                else
            setlist(k.data)
            console.log(k.data)
            
        })
    }
    }, [])

    
    const sendObj=(item)=>{
        debugger
        console.log(item)
       myd(FillAllInvitedToEventObj(item))
    }
   
    return <>
      
  {list.map((item) => (
   <button onClick={()=>sendObj(item)}> <Link to={"/toEnterinvited"} state = {item}><img width={'30%'} height={'50%'} style={{marginLeft:'0.5%'}} key={item} src={`https://localhost:44325/${item.pic}` }></img></Link></button>
  ))}
    </>
    
}