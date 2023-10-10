import { TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FillAllTypeEvent } from "../redux/action/typeEventAction";
import { UploadForm } from "./upLoadForm";
import * as XLSX from 'xlsx';
import { UploadForm2 } from "./uploud2";


export const NewEvent = () => {
  let listtypes = useSelector(n => n.TypeEventReducer.listTypeEvent)
  let user = useSelector(k => k.InvitedtReducer.obj)
  console.log(user)
  //הגדרת משתנים לקלט שמכניסים

  let mydate = useRef()
  let myaddressOfEvent = useRef()
  let myidTypeOfEvent = useRef()
  
  // const [obj, setobj] = useState({})
  //idTypeOfEvent: myidTypeOfEvent.current ?.value
  debugger
  //setobj({
  //})
  const[idevent,setidevent]=useState(0)
//let  idevent=0
  let newobj = {}
  const chec = () => {
    debugger
    let obj = {
      EmailOwnerOfEvent: user.emailInvitedDto,
      DateOfEvent: mydate.current ?.value,
      AdressOfEvent: myaddressOfEvent.current ?.value}
    let i = listtypes.filter(x => x.nameTypeEventDto == myidTypeOfEvent.current ?.value)[0].idTypeEventDto
    newobj = { ...obj, IdTypeEvent: i }

    sendobj()
    

  }
  //--------------------------
  //יש לעשות בדיקת תקינות!!!
  //--------------------------
  //שליפת סוגי ארועים
  const sendobj = () => {
    debugger
    axios.post(`https://localhost:44325/api/Functions/postowner`, newobj).then(x => {
      debugger
      console.log(x.data)
      //idevent = x.data
      setidevent(x.data)
      axios.put(`https://localhost:44325/api/Functions/sendEmail/${x.data}`).then(n => {
      debugger
      
    })
      console.log(idevent);
      
    })
    // alert("הקניה בוצעה בהצלחה!!!!!!!!!")
    myaddressOfEvent.current.value = ""
    mydate.current.value = ""
    myidTypeOfEvent.current.value = ""
    // axios.put(`https://localhost:44325/api/Functions/sendEmail/${idevent}`).then(n => {
    //   debugger
    //   alert(n.data)
    // })

  }
  let d = useDispatch()
  useEffect(() => {
    debugger
    axios.get('https://localhost:44325/api/typeEvent/getAllTypeEvent').then(k => {
      debugger
      d(FillAllTypeEvent(k.data))
    })
  }, [])


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
  };




  return <div>
    <h5>להורדת קובץ exel</h5>
    <h5>למילוי פרטי המוזמנים</h5>
    <button onClick={handleDownload}>⇓</button>
    <div style={{ margin: 'auto', position: 'center', textAlign: 'center' }}>
      <TextField inputRef={mydate} required color="secondary" id="outlined-number" label="תאריך הארוע" type="date" InputLabelProps={{ shrink: true, }} />
      <TextField inputRef={myaddressOfEvent} required color="secondary" id="outlined-basic" label="כתובת הארוע" variant="outlined" />
      <TextField inputRef={myidTypeOfEvent} required color="secondary" id="outlined-select-currency-native" select label="סוג הארוע" defaultValue="סוג הארוע" SelectProps={{ native: true, }}
        helperText="יש לבחור רת סוג הארוע">
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
    <UploadForm></UploadForm>
    <h4>לעלות הזמנה</h4>
    <UploadForm2></UploadForm2>
    {/* <UploadForm ></UploadForm> */}
    <button onClick={() => chec()}>לסיום</button>
    {/* <h2>{myfirstName.current.value}</h2> */}
  </div>
}
