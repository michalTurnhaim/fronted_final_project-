import { TextField, Box, Button, Card, Typography, CardHeader, CardContent, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { useRef } from "react";
import * as React from 'react';
import axios from "axios";
import Grid from "@mui/system/Unstable_Grid";
import imageOrder from "../img/backGround.png"
import '../index.css';
import { styled } from "@mui/system";
import { success, error } from "./sweetAlert";
import { useNavigate } from "react-router";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//יבוא ספריות לבדיקת תקינות
import { useFormik } from 'formik';
import * as yup from 'yup';

//סכמה של ערכים תקינים
const validationSchema = yup.object({
    firstName: yup.string()
        .matches(/^[\u0590-\u05FFa-zA-Z\s]*$/, 'הכנס שם פרטי תקין')
        .min(2, 'השם פרטי חייב להכיל לפחות 2 תווים')
        .max(50, 'השם פרטי יכול להכיל עד 50 תווים')
    ,
    lastName: yup.string()
        .matches(/^[\u0590-\u05FFa-zA-Z\s]*$/, 'הכנס שם משפחה תקין')
        .min(2, 'השם משפחה חייב להכיל לפחות 2 תווים')
        .max(50, 'השם משפחה יכול להכיל עד 50 תווים')
    ,
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

export const Register = () => {

    //משתנים
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    //משתנה לבדיקת התקינות
    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { chec(values) },
    });
    let newobj = {}
    let navigate = useNavigate()

    const Background = styled("div")({
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${imageOrder})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    });

    //שמירת הערכים שהוזנו 
    const chec = (values) => {
        let obj = {
            emailInvitedDto: values.email,
            firstNameInvitedDto: values.firstName,
            lastNameInvitedDto: values.lastName,
            passwordDto: values.password,
        }
        newobj = { ...obj }

        //בדיקה אם משתמש זה קיים כבר במערכת
        axios.get(`https://localhost:44325/api/Invited/checEmailIfExists/${obj.emailInvitedDto}`).then(x => {
            if (x.status == 204)
                addInvited()
            else
                error("פרטיך מזוהים במערכת")
        }
        )
    }

    //הוספת משתמש
    const addInvited = () => {
        axios.post(`https://localhost:44325/api/Invited/addTheInvited`, newobj).then(x => {
            console.log(x.data)
            if (x.status = 200) {
                success("נוספת בהצלחה")
                navigate("/connect")
            }
            else
                error("קרתה שגיאה")
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                הרשמה לאתר
            </Typography>
            <Card item xs={12} sm={12} sx={{ mt: 3 }}>
                <CardHeader
                    sx={{ bgcolor: "#b2c2bf" }}
                    action={
                        <>
                            <Typography sx={{ ml: 4, mr: 8 }} variant="h5" component="h5" gutterBottom color="#3b3a30">הכנס את הפרטים הבאים </Typography>
                        </>
                    }
                />
                <hr />
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={12}  >
                            <TextField sx={{ mt: 2, ml: 6, mr: 4 }}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                id="firstName"
                                name="firstName"
                                autoComplete="firstName"
                                type="text"
                                color="primary"
                                variant="outlined"
                                label="שם פרטי"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField sx={{ mt: 2, ml: 6, mr: 4 }}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                id="lastName"
                                name="lastName"
                                type="text"
                                color="primary"
                                variant="outlined"
                                label="שם משפחה"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField sx={{ mt: 2, ml: 6, mr: 4 }}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                id="email"
                                name="email"
                                type="email"
                                color="primary"
                                variant="outlined"
                                label="מייל" />
                        </Grid>
                        <Grid item xs={12} sm={12}  >
                            <FormControl sx={{ mt: 2, ml: 6, mr: 4, width: '26ch' }}  >
                                <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                                <OutlinedInput
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    id="password"
                                    name="password"
                                    label="סיסמא"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end" >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl >
                        </Grid >
                        <Grid item xs={12} sm={12} >
                            <Button sx={{ mt: 2, ml: 6, mr: 6, bgcolor: "#c0ded9", color: "#3b3a30" }} type="submit" >הוספה</Button>
                        </Grid >
                    </Box >
                </CardContent >
            </Card >
        </Box >
    </div >
}