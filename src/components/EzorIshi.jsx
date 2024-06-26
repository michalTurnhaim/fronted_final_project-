import * as React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FillAllInvitedToEvent } from "../redux/action/InvitedToEventAction";
import { TextField, Grid, Box, Typography, Button, Card, CardHeader, CardContent, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { FillFlagI, FillFlagO } from "../redux/action/flagAction";
import { useNavigate } from "react-router-dom";
import { FillInvited } from "../redux/action/InvitedAction";
import imageOrder from "../img/backGround.png"
import { styled } from "@mui/system";
import '../index.css';

//יבוא ספריות לבדיקת תקינות
import { useFormik } from 'formik';
import * as yup from 'yup';

//סכמה של ערכים תקינים
const validationSchema = yup.object({
    email: yup
        .string()
        .email('הכנס מייל תקין')
        .required('שדה חובה'),
    password: yup
        .string()
        .min(2, 'מינימום אורך הסיסמא הוא 2')
        .max(20, 'מקסימום אורך הסיסמא הוא 20')
        .required('שדה חובה'),
});

export const EzorIshi = () => {
    let n = useNavigate()
    let d = useDispatch()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const Background = styled("div")({
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${imageOrder})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    });

    //משתנה לבדיקת תקינות
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { connect(values) },
    });

    //אם שכח סיסמא שולח לעמוד שינוי סיסמא
    const forgetPassword = () => {
        n("/changePassword")
    }

    //התחברות למערכת
    const connect = (values) => {
        axios.get(`https://localhost:44325/api/Invited/login/${values.email}/${values.password}`).then(c => {
            console.log(c.data);

            //אם קיים במערכת
            if (c.status == 200) {
                d(FillFlagO(true))
                d(FillFlagI(true))
                d(FillInvited(c.data))
                sessionStorage.setItem('Current_User', JSON.stringify(c.data))
                n("/ShowEventOfOwner")
            }

            //אם המשתמש לא קיים
            else
                n("/register")
        })
    }

    //בעת טעינת העמוד
    useEffect(() => {
        axios.get('https://localhost:44325/api/InvitedToEvent/getAllInvitedToEvent').then(k => {

            // console.log(k.data)
            d(FillAllInvitedToEvent(k.data))
        })
    }, [])


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigateRegister = () => {
        n("/register")
    }

    return <div>
        <Background sx={{ opacity: 0.3, mt: -2 }}></Background>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
                pt: 12
            }}>
            <Typography variant="h3" sx={{ mt: -8, textAlign: "center", fontFamily: 'Arial', fontWeight: 'bold', color: '#b2c2bf', position: 'relative' }} >
                התחברות לאתר
            </Typography>
            <Card sx={{ mt: 4 }}>
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
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={12}  >
                            <TextField sx={{ mt: 2, ml: 4, mr: 4 }}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                id="email"
                                name="email"
                                autoComplete="email"
                                label="הכנס כתובת מייל לזיהוי"
                                variant="outlined"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}  >
                            <FormControl sx={{ mt: 2, ml: 4, mr: 4, width: '26ch' }}  >
                                <InputLabel htmlFor="outlined-adornment-password"
                                >סיסמא</InputLabel>
                                <OutlinedInput
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
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
                        </Grid >
                        <Grid item xs={12} sm={12} >
                            <Button sx={{ mt: 2, mr: 4 }} onClick={() => forgetPassword()} >? שכחת סיסמא</Button>
                            <Button sx={{ mt: 2, ml: 6 }} onClick={() => navigateRegister()} >? אין לך חשבון</Button>
                        </Grid>
                        <Grid item xs={12} sm={12}  >
                            <Button sx={{ mt: 2, ml: 13, mr: 4, mb: 8, bgcolor: "#c0ded9", color: "#3b3a30" }} variant="contained" type="submit">אישור</Button>
                        </Grid>
                    </Box >
                </CardContent >
            </Card >
        </Box >
    </div >
}