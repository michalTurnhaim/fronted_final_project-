import axios from "axios"
import { error } from "./sweetAlert";
import { useState } from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Grid, Paper, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
export const ShowEventOfOwner = () => {
    let user = JSON.parse(sessionStorage.getItem('Current_User'));
    const [arrNameImg, setarrNameImg] = useState([])
    let d = useDispatch()
    let n=useNavigate()
    useEffect(() => {
        if (arrNameImg.length == 0) {
            axios.get(`https://localhost:44325/api/Functions/returnListOfOwnerByEmail/${user.emailInvitedDto}`).then(l => {
                if (l.data.length == 0)
                    {
                    error("לא יצרת שום ארוע")
                    n("/newEvent")
                }
                else {
                    setarrNameImg(l.data)
                    debugger
                    console.log(l.data);
                }
            })
        }
    }, [])
    return <>
    <Box></Box>
    <Typography variant="h3" style={{  textAlign:"center", fontFamily: 'Arial', fontWeight: 'bold', color: '#b2c2bf' , position: 'relative'}} >
    הארועים שלך
    <span style={{ display: 'block', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: '5px', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23b2c2bf\' d=\'M0,288L80,245.3C160,203,320,117,480,117.3C640,117,800,203,960,213.3C1120,224,1280,160,1360,128L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z\'%3E%3C/path%3E%3C/svg%3E")' }}></span>
               </Typography>
 <Grid container spacing={2} sx={{ paddingX: 12,paddingY:6 }}>
      {arrNameImg.map((p, index) => (
        <Grid item key={index} xs={12} sm={12} md={4} lg={4} >
          <Card style={{ backgroundColor: '#eaece5' }}>
          <Link key={p} to="/sideBar" state={p} >
            <CardMedia
              component="img"
            //   alt={`Image ${index + 1}`}
              height="300"
              image={`https://localhost:44325/${p.nameFileInvitationDto}`}
              style={{ objectFit: 'contain',maxHeight: '100%' }}
            /></Link>
            <CardContent >
              {/* <Typography variant="body2" color="text.secondary">
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
       
        <Outlet></Outlet>
    </>
}