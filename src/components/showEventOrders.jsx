import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import { FillAllInvitedToEventObj } from "../redux/action/invitedToEventObj";



export const ShowEventOrders = () => {
    // const params = useLocation()

    const listFilter = useSelector(k => k.InvitedToEventReducer.listInvitedToEventFilter);
    console.log(listFilter);
    const myd = useDispatch();

    const sendObj = (p) => {

        console.log(p)
        myd(FillAllInvitedToEventObj(p))
    }

    return <div>

        {listFilter.map(p => (
            <div style={{ width: '20%', border: 'solid 2px gray', backgroundColor: 'pink', display: 'inline-block', marginRight: '30px', marginTop: '30px', boxShadow: '10px 10px' }} >
                <div>
                    <button width={'30%'} height={'50%'} style={{ marginLeft: '0.5%' }} onClick={() => sendObj(p)}><Link to={"/toEnterinvited"} state={p} style={{ color: 'black' }}>{p.lastNameOwnerOfEventDto}</Link> </button>
                </div>
                {/* { <button onClick={()=>chooseEvent(p)}>לאישור</button> } */}
                {/* {isshow == p.prodIdDTO &&<td> <img src={`https://localhost:7195/${p.imgDTO}`} style={{width:'150px',height:'150px'}}></img></td>} */}
                {/* <div><button onClick={() => addShoppingCard(p)}>הוספה לסל</button></div> */}
                <br></br>
                <br></br>
                {/* <div><button onClick={() => addImg(p.prodIdDTO)}>לפרטים נוספים</button></div> */}
                <br></br>
                <br></br>

            </div>
        ))}

    </div>
}
