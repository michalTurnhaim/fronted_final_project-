
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
import { success, error } from './sweetAlert';
import { useNavigate } from "react-router";

const steps = ['הכנסת פרטי ארוע והעלאת הזמנה', 'הורדת קובץ אקסל ומילוי מוזמנים בקובץ', 'העלאת קובץ אקסל'];
export const AddNewEvent = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  let navigate = useNavigate()

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    //האם מלאו את כל השדות בסטפר הקודם
    let flag = JSON.parse(sessionStorage.getItem('allfeild'))
    //האם העלו הזמנה
    let flagup = JSON.parse(sessionStorage.getItem('fileup'))

    //אם מלאו את כל השדות
    if (flag && flagup) {
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);

    } else
      //אם לא מלאו את כל השדות תוצג השגיאה
      error("יש למלאות את כל השדות")


    if (activeStep === steps.length - 1) {
      sessionStorage.setItem('fileup', null)
      sessionStorage.setItem('allfeild', null)
      sendobj()
      success("הארוע נוסף בהצלחה")
      sessionStorage.setItem('newEventDatiels', null)
      navigate("/ShowEventOfOwner")
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const sendobj = () => {
    //שמירת הנתונים שהוכנסו (פרטי הארוע)
    let obj = JSON.parse(sessionStorage.getItem('newEventDatiels'))
    //עדכון פרטי ארוע
    axios.post(`https://localhost:44325/api/Functions/postowner`, obj).then(x => {
      //שליחת מייל למוזמנים
      axios.put(`https://localhost:44325/api/Functions/BeforSendingEmail/${x.data}`).then(n => {
      })
    })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
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
    let nowDate = Date.now();
    const [myObj, setMyObj] = useState({});
    const [error, setError] = useState('');
    const [addressError, setAddressError] = useState('');
    sessionStorage.setItem('newEventDatiels', JSON.stringify(myObj))

    //משתנים לצורך בדיקה אם מלאו את כל השדות 
    const [fd, setfd] = useState(false)
    const [fa, setfa] = useState(false)
    const [at, setat] = useState(false)

    useEffect(() => {
      axios.get('https://localhost:44325/api/typeEvent/getAllTypeEvent').then(k => {
        d(FillAllTypeEvent(k.data))
      })
    }, [])
    //בדיקת ערך התאריך שהוזן
    function handleInputChange(e) {
      const inputValue = e.target.value;
      const isValidDate = validateDate(inputValue); // בדיקת תקינות תאריך

      //אם הערך שהוזן תקין
      if (isValidDate) {
        setMyObj({ ...myObj, DateOfEvent: inputValue })
        setfd(true)
        let allFieldsFilled = true;
        //האם מלאו את השדות האחרים
        if (!fa) {
          allFieldsFilled = false;
        }
        if (!at) {
          allFieldsFilled = false;
        }
        AllInputFill(allFieldsFilled)
        // איפוס השגיאה במידה והתאריך תקין
        setError('');
      }

      // הצגת השגיאה אם התאריך אינו חוקי
      else {
        setError('תאריך לא חוקי');
      }
    };

    // בדיקת תקינות תאריך
    const validateDate = (dateString) => {
      return Date.parse(dateString) > nowDate;
    };

    //בדיקת הערך שהוזן בכתובת הארוע
    function handleAddressChange(e) {
      const inputValue = e.target.value;
      const isValidAddress = validateAddress(inputValue);
      //אם הערך שהוזן תקין
      if (isValidAddress) {
        setMyObj({ ...myObj, AdressOfEvent: inputValue })
        setfa(true)
        let allFieldsFilled = true;
        //האם מלאו את השדות האחרים
        if (!fd) {
          allFieldsFilled = false;
        }
        if (!at) {
          allFieldsFilled = false;
        }
        AllInputFill(allFieldsFilled)
        setAddressError('');
      }
      else {
        setAddressError('כתובת לא תקינה');
      }
    };
    //בדיקת תקינות כתובת הארוע
    const validateAddress = (addressString) => {
      return addressString && addressString.trim() !== '';
    };

    //בדיקת תקינות לבחירת סוג ארוע
    function handleEventTypeChange(e) {
      const selectedValue = e.target.value;
      let selectedOption = listtypes.filter(x => x.nameTypeEventDto == selectedValue)[0]
      const id = selectedOption.idTypeEventDto;
      const isValidEventType = !!id;

      //אם הערך שהוזן תקין
      if (isValidEventType) {
        setMyObj({ ...myObj, idTypeEvent: id, EmailOwnerOfEvent: user.emailInvitedDto })
        setat(true)
        let allFieldsFilled = true;

        //אם הערך שהוזן תקין
        if (!fd) {
          allFieldsFilled = false;
        }
        if (!fa) {
          allFieldsFilled = false;
        }
        AllInputFill(allFieldsFilled)
      }
    };

    sessionStorage.setItem('newEventDatiels', JSON.stringify(myObj))
    //שינוי המשתנה כדי שיוכל לעבור לסטפ הבא
    const AllInputFill = (allFieldsFilled) => {
      if (allFieldsFilled) {
        let allFieldObj = { "fill": true };
        sessionStorage.setItem('allfeild', JSON.stringify(allFieldObj));
      }
      sessionStorage.setItem('newEventDatiels', JSON.stringify(myObj));
    }

    return <Grid>
      <Typography variant="h4" style={{ textAlign: "center", fontFamily: 'Arial', fontWeight: 'bold', color: '#b2c2bf', position: 'relative' }}
      > מילוי פרטי הארוע </Typography>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4} md={4} >
            <TextField
              color="primary"
              sx={{ width: "60%" }}
              required
              id="outlined-basic"
              label="תאריך הארוע"
              type="date"
              InputLabelProps={{ shrink: true, sx: { textAlign: "right" } }}
              onChange={handleInputChange}
              // קביעת השגיאה אם קיימת
              error={!!error}
              // הצגת השגיאה
              helperText={error}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField color="primary"
              sx={{ width: "60%" }}
              id="outlined-basic"
              label="כתובת הארוע"
              onChange={handleAddressChange}
              error={!!addressError}
              helperText={addressError} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField color="primary" sx={{ width: "60%" }}
              required id="outlined-select-currency-native" select label="סוג הארוע" defaultValue="סוג הארוע" SelectProps={{ native: true, }}
              helperText="יש לבחור את סוג הארוע"
              onChange={handleEventTypeChange}
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
      <UploadForm2 ></UploadForm2>
    </Grid>

  }

  //step 2
  const DownloadSample = () => {
    const handleDownload = () => {
      const data = [
        ['מייל', 'שם פרטי', 'שם משפחה']
      ];

      //exel יצירת קובץ ה 
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      worksheet['A1'].s = { font: { bold: true } };
      worksheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 15 }];
      Object.keys(worksheet).forEach(cell => {
        if (cell.endsWith('1')) {
          worksheet[cell].s = { fill: { fgColor: { rgb: 'FFFF00' } } };
        }
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const fileName = 'invited.xlsx';
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
        <Button className="btn btn" sx={{ color: "#3b3a30", backgroundColor: "#c0ded9", marginTop: '8px', mt: 4 }} onClick={() => handleDownload()} startIcon={<CloudDownloadIcon sx={{ ml: 1 }} />}> exel הורדה קובץ </Button>
      </Grid>
    </Grid>
  }

  //step 3
  const UploadExcel = () => {
    let obj = JSON.parse(sessionStorage.getItem('newEventDatiels'))
    let d = useDispatch()

    useEffect(() => {
      axios.get('https://localhost:44325/api/typeEvent/getAllTypeEvent').then(k => {

        d(FillAllTypeEvent(k.data))
      })
    }, [])

    return <Grid>
      <Typography variant="h6" sx={{ textAlign: 'center', ml: 4, mt: 2 }}>להעלות קובץ עם פרטי המוזמנים שמלאתם</Typography>
      <UploadForm></UploadForm>
    </Grid>
  }


  return (
    <Box sx={{ width: '80%', mt: 4, mx: 'auto', textAlign: 'center', backgroundColor: "#eaece5" }} justifyContent="center">
      <Stepper sx={{ ml: 4, mr: 4 }} dir="rtl" activeStep={activeStep} connector={<StepConnector sx={{ mt: 4 }} />}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 10, ml: 4, mr: 4 }} >
            <Button
              sx={{ backgroundColor: "#b2c2bf", color: "#3b3a30", mb: 4 }}
              onClick={handleNext}>
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