import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FillAllInvitedToEvent } from "../redux/action/InvitedToEventAction";
import { TextField, Grid, Box, Typography, Button, Card, CardHeader, CardContent } from "@mui/material";
import { FillFlagI, FillFlagO } from "../redux/action/flagAction";
import { useNavigate } from "react-router-dom";
import { FillInvited } from "../redux/action/InvitedAction";
import imageOrder from "../img/backGround.png"
import { styled } from "@mui/system";
import '../index.css';

export const EzorIshi = () => {
    debugger
    let n = useNavigate()
    let mail = useRef()
    let list = useSelector(n => n.InvitedToEventReducer.listInvitedToEvent)
    let d = useDispatch()
    let listF = []
    const Background = styled("div")({
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${imageOrder})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    });
    // const [listF, setlistF]=useState([])
    const connect = () => {
        debugger
        if (mail.current.value != null) {
            axios.get(`https://localhost:44325/api/Invited/login/${mail.current.value}`).then(c => {
                console.log(c.data);
                if (c.status == 200) {
                    d(FillFlagO(true))
                    d(FillFlagI(true))
                    d(FillInvited(c.data))


                    sessionStorage.setItem('Current_User', JSON.stringify(c.data))

                    n("/ShowEventOfOwner")
                }
                else
                    n("/register")
            })
        }


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
        <Background sx={{ opacity: 0.3, mt: -4 }}></Background>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
                pt: 12
            }}>


            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
            </svg>



            {/* <div className="mui-card"> */}
            <Card sx={{ mt: 2 }}>
                <CardHeader
                    sx={{ bgcolor: "#b2c2bf" }}
                    action={
                        <>
                            <Typography sx={{ ml: 4, mr: 4 }} variant="h5" component="h5" gutterBottom color="#3b3a30" >הזן את כתובת המייל שלך</Typography>
                        </>
                    }
                />
                <hr />
                <CardContent>
                    <div className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                    </svg></div>
                    
                    <Grid item xs={12} sm={12}  >
                        <TextField sx={{ mt: 2, ml: 4, mr: 4 }} inputRef={mail} id="outlined-number" label="הכנס כתובת מייל לזיהוי" variant="outlined" type="text" label="מייל" InputLabelProps={{ shrink: true, }} />
                        {/* <TextField  sx={{ mt: 2 ,ml:6,mr:4}} inputRef={myemail} required id="outlined-number" color="primary" label="מייל" type="text" InputLabelProps={{ shrink: true, }} /> */}
                    </Grid>
                    <Grid item xs={12} sm={12}  >
                        <Button sx={{ mt: 2, ml: 13, mr: 4, mb: 8, bgcolor: "#c0ded9", color: "#3b3a30" }} onClick={() => connect()}>אישור</Button>
                    </Grid>
                </CardContent>
            </Card>
            {/* </div> */}
        </Box>
    </div>
}