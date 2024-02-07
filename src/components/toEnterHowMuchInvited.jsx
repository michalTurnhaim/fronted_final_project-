import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { FillFilterInvitedToEvent } from "../redux/action/InvitedToEventFilterAction";
import { useLocation, useNavigate } from "react-router";
import { TextField, CssBaseline, Avatar, Typography, FormControlLabel, Button, Box, Grid } from "@mui/material";
import { success } from "./sweetAlert";
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

//לצורך בדיקת תקינות
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container } from "postcss";

//סכמה של המשתנים כולל דרישות תקינות
const validationSchema = yup.object({
    girls: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10'),

    boys: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10'),
    girlAdalt: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10'),

    boyAdalt: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10')
    ,
    girlTeneeger: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10'),

    boyTeneeger: yup
        .number()
        .min(0, 'מינימום  0')
        .max(10, 'מקסימום 10')
});
export const ToEnterInvitedAmount = () => {
    const params = useLocation()
    let n = useNavigate()
    let myinvited = useSelector(l => l.InvitedToEventReducer.objInvit)
    const [newInvited, setnewInvited] = useState(params.state)
    
    //פונקציות ומשתנים לבדיקת תקינות
    const formik = useFormik({
        initialValues: { girls: 0, boys: 0, girlAdalt: 0, boyAdalt: 0, girlTeneeger: 0, boyTeneeger: 0 },
        validationSchema: validationSchema,
        onSubmit: (values) => { updateObj(values) },
    });

    async function updateObj(values) {
        debugger
        const InvitedtoEventupdate = {
            ...newInvited,
            numGirlsDto: values.girls,
            numBoysDto: values.boys,
            numTeenageGirlsDto: values.girlTeneeger,
            numteenageBoysDto: values.boyTeneeger,
            numDaughterAdultsDto: values.girlAdalt,
            numSonAdultsDto: values.boyAdalt,
            isComeDto: true
        }
        
        //פונקציית שליחה לעידכון הנתונים
        try {
            await axios.put(`https://localhost:44325/api/InvitedToEvent/updateTheInvitedToEvent/${newInvited.idInvitedToEventDto}`, InvitedtoEventupdate).then(x => {
            console.log(x.data)
            debugger
            })
        }
        catch{
           
        }
        success("הפרטים נרשמו בהצלחה")
        n("/showeventorders")
    }
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const [listOwner, setListOwner] = useState([])

    const [dateOfEvent, setdateOfEvent] = useState(new Date())

    useEffect(() => {
        debugger
        axios.get("https://localhost:44325/api/OwnerOfEvent/getAllOwnerOfEvent").then(x => {

            console.log(x.data)
            setListOwner(...listOwner, x.data)

        })
        for (let index = 0; index < listOwner.length; index++) {
            if (listOwner[index].idEventDto == myinvited.idEventDto)
                setdateOfEvent(...dateOfEvent, listOwner[index].dateOfEventDto)

        }
        console.log(dateOfEvent)

    }, [])
   
    
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
                <EscalatorWarningIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                הכנס את כמות המגיעים
          </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={formik.touched.girlAdalt && Boolean(formik.errors.girlAdalt)}
                            helperText={formik.touched.girlAdalt && formik.errors.girlAdalt}
                            value={formik.values.girlAdalt}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="girlAdalt"
                            id="girlAdalt"
                            label="הכנס כמות מבוגרות"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={formik.touched.boyAdalt && Boolean(formik.errors.boyAdalt)}
                            helperText={formik.touched.boyAdalt && formik.errors.boyAdalt}
                            value={formik.values.boyAdalt}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="boyAdalt"
                            id="boyAdalt"
                            label="הכנס כמות מבוגרים"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={formik.touched.girls && Boolean(formik.errors.girls)}
                            helperText={formik.touched.girls && formik.errors.girls}
                            value={formik.values.girls}
                            onBlur={formik.handleBlur('girls')}
                            onChange={formik.handleChange}
                            name="girls"
                            id="girls"
                            label="הכנס כמות ילדות"
                            type="number"

                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={formik.touched.boys && Boolean(formik.errors.boys)}
                            helperText={formik.touched.boys && formik.errors.boys}
                            value={formik.values.boys}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="boys"
                            id="boys"
                            label="הכנס כמות ילדים"
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={formik.touched.girlTeneeger && Boolean(formik.errors.girlTeneeger)}
                            helperText={formik.touched.girlTeneeger && formik.errors.girlTeneeger}
                            value={formik.values.girlTeneeger}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="girlTeneeger"
                            id="girlTeneeger"
                            label="הכנס כמות נערות"
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            error={formik.touched.boyTeneeger && Boolean(formik.errors.boyTeneeger)}
                            helperText={formik.touched.boyTeneeger && formik.errors.boyTeneeger}
                            value={formik.values.boyTeneeger}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="הכנס כמות נערים"
                            name="boyTeneeger"
                            id="boyTeneeger"
                            type="number"
                            fullWidth>

                        </TextField>
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 5 }}
                >
                    אישור
            </Button>

            </Box>
        </Box>
    </div>
}