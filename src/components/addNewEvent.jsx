
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { TextField, Card, CardHeader, CardContent } from "@mui/material"
import { UploadForm } from "./upLoadForm";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useSelector, useDispatch } from 'react-redux';
import { FillAllTypeEvent } from '../redux/action/typeEventAction';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { UploadForm2 } from "./uploud2";
import StepConnector from '@mui/material/StepConnector';
import * as XLSX from 'xlsx';



// const steps = ['העלאת קובץ אקסל', 'הורדת קובץ אקסל ומילוי מוזמנים בקובץ', 'הכנסת פרטי ארוע והעלאת הזמנה'];
const steps = ['הכנסת פרטי ארוע והעלאת הזמנה', 'הורדת קובץ אקסל ומילוי מוזמנים בקובץ', 'העלאת קובץ אקסל'];
export const AddNewEvent = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if(activeStep === steps.length - 1){
      // const chec = () => {
      //   debugger
      
        sendobj()
    
    
      // }
      //--------------------------
      //יש לעשות בדיקת תקינות!!!
      //--------------------------
      //שליפת סוגי ארועים
    
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const sendobj = () => {
    debugger
    let obj = JSON.parse(sessionStorage.getItem('newEventDatiels'))
    axios.post(`https://localhost:44325/api/Functions/postowner`, obj).then(x => {
      debugger
      console.log(x.data)
      axios.put(`https://localhost:44325/api/Functions/BeforSendingEmail/${x.data}`).then(n => {
        debugger
      })

    })


  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

//איזה פונקציה להפעיל בכל שלב
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SaveEvent />;
      case 1:
        return <DownloadSample />;
      case 2:
        return <UploadExcel />;
      default:
        return "Unknown step";
    }
  }
  
  //step 1
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
      <Typography variant="h4" style={{ textAlign: "center", fontFamily: 'Arial', fontWeight: 'bold', color: '#b2c2bf', position: 'relative' }}
      > מילוי פרטי הארוע </Typography>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4} md={4} >
            <TextField color="primary" sx={{ width: "60%" }} required id="outlined-basic" label="תאריך הארוע" type="date" InputLabelProps={{ shrink: true, sx: { textAlign: "right" } }} onChange={(e) => setmyObj({ ...myObj, DateOfEvent: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField color="primary" sx={{ width: "60%" }} required id="outlined-basic" label="כתובת הארוע" onChange={(e) => setmyObj({ ...myObj, AdressOfEvent: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField color="primary" sx={{ width: "60%" }}
              required id="outlined-select-currency-native" select label="סוג הארוע" defaultValue="סוג הארוע" SelectProps={{ native: true, }}
              helperText="יש לבחור את סוג הארוע" onChange={(e) => findIdEvent(e)}
              InputLabelProps={{ shrink: true, textAlign: "right" }}>
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
      </Box>
      <Typography variant="h6" sx={{ textAlign: 'center', ml: 4, mt: 2 }}>להעלות הזמנה</Typography>
      <UploadForm2></UploadForm2>
    </Grid>

  }
 
  //step 2
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
      
      <Typography variant="h6">ומלאו את כל הנתונים ע"פ השדות הנכונים exel הורידו קובץ </Typography>
      <Grid dir="rtl">
      <Button className="btn btn" sx={{color: "#eaece5", backgroundColor:"#c0ded9",marginTop:'8px',mt:4}} onClick={() => handleDownload()} startIcon={<CloudDownloadIcon sx={{ml:1}}/>}> exel הורדה קובץ </Button>
   </Grid>
    </Grid>
  }

  //step 3
  const UploadExcel = () => {
    let obj = JSON.parse(sessionStorage.getItem('newEventDatiels'))
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
  
    return <Grid>
      <Typography variant="h6" sx={{ textAlign: 'center', ml: 4, mt: 2 }}>להעלות קובץ עם פרטי המוזמנים שמלאתם</Typography>
      <UploadForm></UploadForm>
      {/* <Button sx={{ backgroundColor: "#c0ded9" ,color:"#3b3a30",mt:3 }} onClick={() => chec()}>לסיום</Button> */}
    </Grid>
  }
  

  return (
    <Box sx={{ width: '80%', mt: 4, mx: 'auto', textAlign: 'center', backgroundColor: "#eaece5" }} justifyContent="center">
      <Stepper sx={{ ml: 4, mr: 4 }} dir="rtl" activeStep={activeStep} connector={<StepConnector sx={{ mt: 4 }} />}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          //   if (isStepOptional(index)) {
          //     labelProps.optional = (
          //       <Typography variant="caption">Optional</Typography>
          //     );
          //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} sx={{ mt: 4 }} {...stepProps}>
              <StepLabel {...labelProps} >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
          <React.Fragment >
            <Typography sx={{ mt: 5, mb: 1 }}>{getStepContent(activeStep)}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 10, ml: 4, mr: 4 }}>
              <Button sx={{ backgroundColor: "#b2c2bf", color: "#3b3a30", mb: 4 }} onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'לסיום' : 'הבא'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, backgroundColor: "#b2c2bf", color: "#3b3a30", mb: 4 }}
              >
                הקודם
            </Button>
            </Box>
          </React.Fragment>
        )}
    </Box>
  );
}

