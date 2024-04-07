import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Avatar, Box } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from "react";
import axios from "axios";
import { getList } from "../redux/action/listInvitedAction"
import { error, success } from "./sweetAlert";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from "@mui/base";
import Grid from "@mui/system/Unstable_Grid";
import { useNavigate } from "react-router";
//סכמה של ערכים תקינים
const validationSchema = yup.object({
    firstName: yup.string()
        .matches(/^[\u0590-\u05FFa-zA-Z\s]*$/, 'הכנס שם פרטי תקין')
        .min(2, 'השם פרטי חייב להכיל לפחות 2 תווים')
        .max(50, 'השם פרטי יכול להכיל עד 50 תווים')
        .required('שדה חובה')
    ,
    lastName: yup.string()
        .matches(/^[\u0590-\u05FFa-zA-Z\s]*$/, 'הכנס שם משפחה תקין')
        .min(2, 'השם משפחה חייב להכיל לפחות 2 תווים')
        .max(50, 'השם משפחה יכול להכיל עד 50 תווים')
        .required('שדה חובה')
    ,
    email: yup
        .string()
        .email('הכנס מייל תקין')
        .required('שדה חובה'),

});

export const AddInvited = () => {
    const [bool, setbool] = useState(true)
    let list = useSelector(n => n.ListInvitedReducer.list)
    let password;
    let obj = useSelector(x => x.OwnerOfEventReducer.object)
    let invitedtoevent = {}
    let n = useNavigate()
    let d = useDispatch()
    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', email: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => { chec(values) },
    });
    const chec = (values) => {
        debugger
        let num = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        password = num

        let user = { emailInvitedDto: values.email, firstNameInvitedDto: values.firstName, lastNameInvitedDto: values.lastName, passWordDto: num }
        invitedtoevent = { idEventDto: obj.idEventDto, idTypeInviteDto: 6002, isComeDto: false, emailInvitedDto: values.email }
        add(values.email, user)
    }

    async function add(email, user) {
        debugger
        let flag = false
        let flag2 = false
        setbool(false)
        //מעבר על רשימת המוזמנים לארוע הספציפי 

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            //בדיקה אם קיים מוזמן זה כבר
            if (email == element.emailInvitedDto) {
                flag = true
                error("הזמנתם את המוזמן הזה")
                break;
            }
        }
        //אם לא קיים
        if (flag == false) {
            // בדיקה אם כתובת מייל זה רשומה במערכת בתור INVITED
            try {
                await axios.get(`https://localhost:44325/api/Invited/checEmailIfExists/${email}`).then(c => {
                    //אם לא רשום
                    if (c.status == 204) {
                        debugger
                        flag2 = true
                        //הכנסת מוזמן חדש
                        axios.post("https://localhost:44325/api/Invited/addTheInvited", user).then(x => {
                            console.log(x.data)
                            d(getList(x.data))

                        })
                    }

                    else {
                        password = c.data.passWordDto
                        user = { ...user, passWordDto: c.data.passWordDto }
                    }

                }
                )
            }
            catch{

            }
            //הכנסת מוזמן לארוע חדש
            try {
                await axios.post("https://localhost:44325/api/InvitedToEvent/addTheInvitedToEvent", invitedtoevent).then(x => {
                    console.log(x.data)


                })
            }
            catch{

            }
            try {
                await axios.get(`https://localhost:44325/api/Functions/SendEmail/${user.emailInvitedDto}/${password}/${obj.nameFileInvitationDto}`).then(n => {
                    debugger
                })
            }
            catch{ }
            success("המוזמן נוסף בהצלחה")
            setbool(true)
            n("/sideBar/showAllInvited")

        }
    }

    return <div className='py-5 container'>

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'start',
            }}
        >
            <Avatar className='p-4' sx={{ backgroundColor: "#b2c2bf" }}>
                <PersonAddAlt1Icon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
                הכנסת מוזמנים נוספים
          </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            value={formik.values.firstName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // margin="normal"
                            fullWidth
                            id="firstName"
                            name="firstName"


                            label="שם פרטי"
                        /></Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // margin="normal"
                            fullWidth
                            name="lastName"

                            type="lastName"
                            id="lastName"


                            label="שם משפחה"
                        /></Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // margin="normal"
                            fullWidth
                            name="email"

                            type="email"
                            id="email"


                            label="כתובת מייל" /></Grid>


                    <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
                        <Button
                            disabled={!bool}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 5, marginTop: '16px', alignSelf: 'center', backgroundColor: 'red' }}
                        >
                            אישור
                         </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>

}