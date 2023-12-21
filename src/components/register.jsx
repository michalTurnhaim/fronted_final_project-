import { TextField, Box, Button, Card, Typography, CardHeader, CardContent } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import Grid from "@mui/system/Unstable_Grid";
import imageOrder from "../img/backGround.png"
import '../index.css';
import { styled } from "@mui/system";
export const Register = () => {
    let myfirstName = useRef()
    let mylastName = useRef()
    let myemail = useRef()
    let newobj = {}


    const Background = styled("div")({
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${imageOrder})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    });
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
        <Background sx={{ opacity: 0.3, mt: -4 }}></Background>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
                pt: 12
            }}>
                       {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        </svg> */}
                <Card item xs={12} sm={12}>
                    <CardHeader
                        sx={{ bgcolor: "#b2c2bf" }}
                        action={
                            <>
                                <Typography sx={{ml:4,mr:8}} variant="h5" component="h5" gutterBottom color="#3b3a30">הכנס את הפרטים הבאים </Typography>
                            </>
                        }
                    />
                    <hr />
                    <CardContent>

                        <Grid item xs={12} sm={12}  >

                            <TextField  sx={{ mt: 2 ,ml:6,mr:4}} inputRef={myfirstName} required id="outlined-number" color="primary" label="שם פרטי" type="text" InputLabelProps={{ shrink: true, }} />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField  sx={{ mt: 2 ,ml:6,mr:4}} inputRef={mylastName} required id="outlined-number" color="primary" label="שם משפחה" type="text" InputLabelProps={{ shrink: true, }} />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField  sx={{ mt: 2 ,ml:6,mr:4}} inputRef={myemail} required id="outlined-number" color="primary" label="מייל" type="text" InputLabelProps={{ shrink: true, }} />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Button  sx={{ mt: 2,ml:6,mr:6, bgcolor: "#c0ded9", color: "#3b3a30" }} onClick={() => chec()}>להוספה</Button>
                        </Grid>
                    </CardContent>
                </Card>
        </Box>
    </div>





}