
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FillAllInvitedToEventObj } from "../redux/action/invitedToEventObj";
import { error } from "./sweetAlert";
import Grid from "@mui/system/Unstable_Grid";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { getList } from "../redux/action/listInvitedAction";

export const Ishoor = () => {
    debugger
    let user = useSelector(n => n.InvitedtReducer.obj)
    const [listUsers, setlistUsers] = useState([])
    const myd = useDispatch()
    const [list, setlist] = useState([])
    const [listOwnerOfEvent, setlistOwnerOfEvent] = useState([])
    let nowDate = Date.now();

    console.log(list);
    useEffect(() => {
        debugger
        axios.get("https://localhost:44325/api/OwnerOfEvent/getAllOwnerOfEvent").then(c => {
            setlistOwnerOfEvent(c.data)
        })

        axios("https://localhost:44325/api/Invited/getAllInvited").then(x=>{
            setlistUsers(x.data)
            myd(getList(x.data))
            
            //  listUsers.filter(x=>x.emailOwnerOfEventDto==listOwnerOfEvent.emailOwnerOfEventDto)
           })

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
    
        <Typography variant="h3" style={{ textAlign: "center", fontFamily: 'Arial', fontWeight: 'bold', color: '#b2c2bf', position: 'relative' }} >
            אישור הגעה לארועים שהוזמנת אליהם
    <span style={{ display: 'block', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: '5px', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23b2c2bf\' d=\'M0,288L80,245.3C160,203,320,117,480,117.3C640,117,800,203,960,213.3C1120,224,1280,160,1360,128L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z\'%3E%3C/path%3E%3C/svg%3E")' }}></span>
        </Typography>
        <Grid container spacing={2} sx={{ paddingX: 12, paddingY: 6 }}>
            {list.map((item, index) => (
                <Grid item key={index} xs={12} sm={12} md={4} lg={4} >
                    <Card style={{ backgroundColor: '#eaece5' }}>
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
                            <CardMedia
                                component="img"
                                //   alt={`Image ${index + 1}`}
                                height="300"
                                image={`https://localhost:44325/${item.pic}`}
                                style={{ objectFit: 'contain', maxHeight: '100%' }}
                            />
                        </Link>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                       הוזמנת ע"י : {item.firstNameOwner}  {item.lastNameOwner} 
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

        {/* {list.map((item) => (
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
        ))} */}
    </>

}