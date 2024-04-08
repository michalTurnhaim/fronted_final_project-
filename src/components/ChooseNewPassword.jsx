import { Box } from "@mui/system";
import { Card, CardHeader, Typography, CardContent, TextField, Button } from "@mui/material";
import { useRef } from "react";
import Grid from "@mui/system/Unstable_Grid";
import { error, success } from "./sweetAlert";
import axios from "axios";
import { useNavigate } from "react-router";

export const ChooseNewPassword = () => {
    let checkthesamepassword = useRef()
    let password = useRef()
    let navigate = useNavigate()
    async function changePassword() {

        if (checkthesamepassword.current.value != null && password.current.value != null)
            if (checkthesamepassword.current.value != password.current.value)
                error("הסיסמאות לא תואמות")

            else {
                let Change_User_Password = JSON.parse(sessionStorage.getItem('Change_User_Password'))
                let obj = { ...Change_User_Password, passWordDto: Number(password.current.value) }
                //עידכון משתמש
                try {
                    await axios.put(`https://localhost:44325/api/Invited/updateTheInvited/${obj.emailInvitedDto}`, obj).then(
                    )
                }
                catch {
                }
                success("הסיסמא עודכנה בהצלחה")
                navigate("/connect")
            }
    }
    return <div>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
                pt: 12
            }}>

            <Card item xs={12} sm={12}>
                <CardHeader
                    sx={{ bgcolor: "#b2c2bf" }}
                    action={
                        <>
                            <Typography sx={{ ml: 4, mr: 8 }} variant="h5" component="h5" gutterBottom color="#3b3a30">בחר/י סיסמא חדשה</Typography>
                        </>
                    }
                />
                <hr />
                <CardContent>
                    <Grid item xs={12} sm={12}  >
                        <TextField sx={{ mt: 2, ml: 6, mr: 4 }} inputRef={password} required id="outlined-basic" color="primary" variant="outlined" label="סיסמא חדשה" />
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <TextField sx={{ mt: 2, ml: 6, mr: 4 }} inputRef={checkthesamepassword} required id="outlined-basic" color="primary" variant="outlined" label="אימות הסיסמא החדשה" />
                    </Grid>


                    <Grid item xs={12} sm={12} >
                        <Button sx={{ mt: 2, ml: 6, mr: 6, bgcolor: "#c0ded9", color: "#3b3a30" }} onClick={() => changePassword()}>אישור</Button>
                    </Grid>

                </CardContent>
            </Card>
        </Box>
    </div>

}