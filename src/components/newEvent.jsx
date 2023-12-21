

import { TextField, StepContent, Typography, Button, makeStyles} from "@mui/material"
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

const SaveEvent = () => {
  let listtypes = useSelector(n => n.TypeEventReducer.listTypeEvent);
  let d = useDispatch();
  let user = useSelector(k => k.InvitedtReducer.obj);
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
  return <div>
    <h5 style={{ marginLeft: '48%', marginTop: '1.5%' }}>למילוי פרטי הארוע</h5>
    <div style={{ margin: 'auto', position: 'center', textAlign: 'center' }}>
      <TextField required color="secondary" id="outlined-number" label="תאריך הארוע" type="date" InputLabelProps={{ shrink: true, }} onChange={(e) => setmyObj({ ...myObj, DateOfEvent: e.target.value })} />
      <TextField required color="secondary" id="outlined-basic" label="כתובת הארוע" variant="outlined" onChange={(e) => setmyObj({ ...myObj, AdressOfEvent: e.target.value })} />
      <TextField
        required color="secondary" id="outlined-select-currency-native" select label="סוג הארוע" defaultValue="סוג הארוע" SelectProps={{ native: true, }}
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

      <br></br>

    </div>
    <div>
      <h5 style={{ marginLeft: '50%' }}>להעלות הזמנה</h5>
      <UploadForm2></UploadForm2>
    </div>
  </div>
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

  return <div>
    <h5 style={{ marginLeft: '25%', marginTop: '3%' }}>להוריד את קובץ ה exel ע"פ השדות שמופיעות בקובץ</h5>
    <h5 style={{ marginLeft: '42%', marginTop: '1.5%' }}>למלאות את פרטי המוזמנים</h5>
    <button className="btn btn" style={{ backgroundColor:"#c0ded9",marginLeft: '70%', marginTop: '0.5%' }} onClick={() => handleDownload()}>קובץ exel להורדה ⇓</button>
  </div>
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
    <h5 style={{ marginLeft: '25%', marginTop: '3%' }}>להעלות קובץ עם פרטי המוזמנים שמלאתם</h5>
    <UploadForm></UploadForm>
    <button className="btn btn" style={{ backgroundColor:"#c0ded9",marginLeft: '45%' }} onClick={() => chec()}>לסיום</button>
  </div>
}

function getSteps() {
  return ['העלאת קובץ אקסל', 'הורדת קובץ אקסל ומילוי מוזמנים בקובץ', 'הכנסת פרטי ארוע והעלת הזמנה'];
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

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-2"></div>
        <div className="col col-lg-10">
          <div className="card">
            <div className="card-header" id="card_header">

              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                   const stepProps: { completed?: boolean } = {
                    completed: activeStep < index
                  };
              //     const labalProps=<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
              //     <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
              // </svg>
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
                       {/* <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel> */}
                      <StepLabel  {...labelProps}>{label}</StepLabel>
                    </Step>


                  );
                })}
              </Stepper>
            </div>
            <div className="card-body">

              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <div>
                  <div className="row">
                  <div className="col col-lg-1">
                  <Button
                  id="buttons_class"
                    disabled={activeStep === 2}
                    onClick={handleBack}
                  >
                    Back
              </Button></div>
                <div className="col col-lg-1">
                  <Button
                  id="buttons_class"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === 0 ? "Finish" : "Next"}
                  </Button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-lg-2"></div>
      </div>
    </div>
  );
}