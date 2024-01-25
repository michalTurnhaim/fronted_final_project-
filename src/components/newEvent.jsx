
import { TextField, StepContent, Typography, Button, makeStyles, Card, CardHeader, CardContent } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FillAllTypeEvent } from "../redux/action/typeEventAction";
import { UploadForm } from "./upLoadForm";
import * as XLSX from 'xlsx';
import { UploadForm2 } from "./uploud2";
import "./css/newEvent.css"
import '../App.css'
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { typography, Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";

const SaveEvent = () => {
  let listtypes = useSelector(n => n.TypeEventReducer.listTypeEvent);
  let d = useDispatch();
  let user = JSON.parse(sessionStorage.getItem('Current_User'));
  const [myObj, setmyObj] = useState({});
  sessionStorage.setItem('newEventDatiels', JSON.stringify(myObj))
  useEffect(() => {
    debugger
    axios.get('https://localhost:44325/api/typeEvent/getAllTypeEvent').then(k => {
      debugger
      d(FillAllTypeEvent(k.data))
    })
  }, [])
  sessionStorage.setItem('newEventDatiels', JSON.stringify(myObj))
  const findIdEvent = (e) => {
    debugger
    let i = listtypes.filter(x => x.nameTypeEventDto == e.target.value)[0].idTypeEventDto

    setmyObj({ ...myObj, idTypeEventDto: i, EmailOwnerOfEvent: user.emailInvitedDto })
  }
  return <Grid>
    <Typography variant="h4"
      sx={{ textAlign: 'center' }}
    > למילוי פרטי הארוע</Typography>
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={4}>
        <TextField sx={{ ml: 3 }} required id="outlined-basic" label="תאריך הארוע" type="date" InputLabelProps={{ shrink: true, }} onChange={(e) => setmyObj({ ...myObj, DateOfEvent: e.target.value })} />
      </Grid>
      <Grid item xs={4}>
        <TextField sx={{ ml: 3 }} required id="outlined-basic" label="כתובת הארוע" onChange={(e) => setmyObj({ ...myObj, AdressOfEvent: e.target.value })} />
      </Grid>
      <Grid item xs={4}>
        <TextField sx={{ ml: 3 }}
          required id="outlined-select-currency-native" select label="סוג הארוע" defaultValue="סוג הארוע" SelectProps={{ native: true, }}
          helperText="יש לבחור את סוג הארוע" onChange={(e) => findIdEvent(e)}>
          <option >
            בחר סוג ארוע
        </option>
          {listtypes.map((option) => (
            <option key={option.idTypeEventDto} value={option.nameTypeEventDto}>
              {option.nameTypeEventDto}
            </option>
          ))}
        </TextField>
      </Grid>
    </Grid>
    <Grid sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>להעלות הזמנה</Typography>
    </Grid>
    <UploadForm2></UploadForm2>
    {/* </Box> */}
  </Grid>
}




const DownloadSample = () => {

  const handleDownload = () => {
    const data = [
      ['מייל', 'שם פרטי', 'שם משפחה']
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = 'a.xlsx'; // שנה את 'data.xlsx' לשם הקובץ הרצוי
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return <Grid>
    <Typography>להוריד את קובץ ה exel ע"פ השדות שמופיעות בקובץ</Typography>
    <Typography>למלאות את פרטי המוזמנים</Typography>
    <Button className="btn btn" Sx={{ backgroundColor: "#c0ded9", marginLeft: '70%', marginTop: '0.5%' }} onClick={() => handleDownload()}>קובץ exel להורדה ⇓</Button>
  </Grid>
}
const UploadExcel = () => {
  debugger
  let obj = JSON.parse(sessionStorage.getItem('newEventDatiels'))
  debugger
  console.log(obj);

  const chec = () => {
    debugger
    sendobj()


  }
  //--------------------------
  //יש לעשות בדיקת תקינות!!!
  //--------------------------
  //שליפת סוגי ארועים
  const sendobj = () => {
    debugger
    axios.post(`https://localhost:44325/api/Functions/postowner`, obj).then(x => {
      debugger
      console.log(x.data)
      axios.put(`https://localhost:44325/api/Functions/BeforSendingEmail/${x.data}`).then(n => {
        debugger
      })

    })


  }
  let d = useDispatch()
  useEffect(() => {
    debugger
    axios.get('https://localhost:44325/api/typeEvent/getAllTypeEvent').then(k => {
      debugger
      d(FillAllTypeEvent(k.data))
    })
  }, [])

  return <div>
    <Typography sx={{ marginLeft: '25%', marginTop: '3%' }}>להעלות קובץ עם פרטי המוזמנים שמלאתם</Typography>
    <UploadForm></UploadForm>
    <Button className="btn btn" sx={{ backgroundColor: "#c0ded9", marginLeft: '45%' }} onClick={() => chec()}>לסיום</Button>
  </div>
}

function getSteps() {
  return ['העלאת קובץ אקסל', 'הורדת קובץ אקסל ומילוי מוזמנים בקובץ', 'הכנסת פרטי ארוע והעלאת הזמנה'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <UploadExcel />;
    case 1:
      return <DownloadSample />;
    case 2:
      return <SaveEvent />;
    default:
      return "Unknown step";
  }
}
export const NewEvent = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  // const useStyles = makeStyles(() => ({
  //   root: {
  //     "& .MuiStepIcon-active": { color: "red" },
  //     "& .MuiStepIcon-completed": { color: "green" },
  //     "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
  //   }
  // }));

  // const c = useStyles();
  const isStepOptional = (step) => {
    return step === 1;
  }

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // const handleReset = () => {
  //   setActiveStep(2);
  // };
  // let arr = [3, 2, 1]

  return <div>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'start',
        pt: 12
      }}
    >
      <Card sx={{ mt: 2 }}>
        <CardHeader sx={{ bgcolor: "#b2c2bf" }}
          action={

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {
                  completed: activeStep < index
                };
                const labelProps: { optional?: React.ReactNode } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={index} {...stepProps}>

                    <StepLabel  {...labelProps}>{label}</StepLabel>
                  </Step>


                );
              })}
            </Stepper>

          }
        />

        <CardContent>
          <Grid item xs={12} sm={12}>
            <Typography>{getStepContent(activeStep)}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              id="buttons_class"
              disabled={activeStep === 2}
              onClick={handleBack}
            >
              Back
              </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              id="buttons_class"
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === 0 ? "Finish" : "Next"}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </div>
}