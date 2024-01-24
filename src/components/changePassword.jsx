import { Box, Grid, TextField, Typography, Button, CardContent, Card, CardHeader, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { error, success } from "./sweetAlert";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router";

export const ChangePassword = () => {
    let myemail = useRef()
    let mypassword = useRef()
    const [flag, setflag] = useState(false)
    var flag2 = false
    let password = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    // const [text, setText] = useState("")
    var obj = {}
    let navigate = useNavigate()

    async function Change() {
        debugger

        if (myemail.current.value != null) {
            try {  // בדיקה אם כתובת מייל זו קיימת במערכת כבר
                await axios.get(`https://localhost:44325/api/Invited/checEmailIfExists/${myemail.current.value}`).then(c => {
                    debugger
                    //אם מחזיר אוביקט כלומר קיים משתמש זה כבר
                    if (c.status == 200) {
                        //בשביל הצגת תיבת אינפוט
                        setflag(true)
                        flag2 = true
                        //שמירה באוביקט
                        obj = c.data
                    }
                })
            }
            catch{ }
        }
        if (flag2 == false)
            error("אינך רשום במערכת")
        //במקרה שקיים במערכת
        else {
            try {
                //שליחת מייל עם סיסמא זמנית
                await axios.get(`https://localhost:44325/api/Functions/SendEmail/${myemail.current.value}/${password}/${"1"}`).then(
                )
            }
            catch{
            }
        }
        //שמירת הנתונים באוביקט כולל הסיסמא הזמנית
        var apdateInvited = {
            emailInvitedDto: obj.emailInvitedDto,
            firstNameInvitedDto: obj.firstNameInvitedDto,
            lastNameInvitedDto: obj.lastNameInvitedDto,
            passWordDto: password
        }

        sessionStorage.setItem('Change_User_Password', JSON.stringify(apdateInvited))

    }
    //פונקציה שבודקת האם הסיסמא שהוזנה  אכן תואמת לסיסמא שהתקבלה במייל
    const checkIfPasswordCorrect = () => {
        let Change_User_Password = JSON.parse(sessionStorage.getItem('Change_User_Password'))
        debugger
        if (mypassword.current.value != null) {
            if (Change_User_Password.passWordDto != Number(mypassword.current.value))
                error(":( סיסמא שגויה")
                // setText(`סיסמא שגויה!!! יש להזין את הסיסמא שהתקבלה במייל`)
            else {
                success("סיסמא נכונה")
                // setText(`סיסמא נכונה`)
                //בחירת סיסמא חדשה
                navigate("/chooseNewPassword")
            }

        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return <div>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center', 
                pt: 12
            }}> 
            <Card item xs={12} sm={12}>
                <CardHeader
                    sx={{ bgcolor: "#b2c2bf" }}
                    action={
                        <>
                            <div className="icon-container" style={{marginRight:"46%"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg></div>
                            <Typography sx={{ mr: 12, mt: 1 }} align="center"  variant="h5" component="h5" gutterBottom color="#3b3a30">איפוס סיסמא</Typography>
                        </>
                    }
                />
                <hr />
                <CardContent>
                    <Grid item xs={12} sm={12} >
                        <TextField sx={{ mt: 2, ml: 4, mr: 4 }} inputRef={myemail} required id="outlined-basic" color="primary" variant="outlined" label="מייל" />
                    </Grid>
                    <Grid>
                        <Button sx={{ bgcolor: "#c0ded9", color: "#3b3a30", mt: 2, mr: 4, ml: 4 }} onClick={() => Change()}>אישור</Button>
                    </Grid>
                    {flag && <Grid>
                        <Grid container >
                            <Typography sx={{ ml: 4, mr: 8, mt: 3 }} variant="h7" component="h7" gutterBottom color="#3b3a30">הכנס/י את הסיסמא שקיבלת למייל
                            </Typography></Grid>
                        <Grid item xs={12} sm={12}  >

                            <FormControl sx={{ mt: 2, ml: 4, mr: 4, width: '26ch' }}  >
                                <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                                <OutlinedInput
                                    inputRef={mypassword}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}

                                    endAdornment={
                                        <InputAdornment position="end"  >

                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="סיסמא"
                                />
                            </FormControl>
                            {/* {text} */}
                        </Grid>
                        <Grid>
                            <Button sx={{ bgcolor: "#c0ded9", color: "#3b3a30", mt: 2, mr: 4, ml: 4 }} onClick={() => { checkIfPasswordCorrect() }} >אישור</Button>
                        </Grid>
                    </Grid>}
                </CardContent>
            </Card>
        </Box>
    </div>
}