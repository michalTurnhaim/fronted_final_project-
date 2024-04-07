import { Box, Typography } from "@mui/material";
import imageOrder from "../img/backGround.png"
import { styled } from "@mui/system";
export const About =()=>{

    const Background = styled("div")({
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${imageOrder})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    });
    return  <Box>
    <Background sx={{ opacity: 0.3, mt: -8 }}></Background>
    <Box sx={{
    mt:8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'start'}} >
        <Typography sx={{fontSize:'150%'}}>! הארגון הכי פשוט והכי כיפי לשמחות משפחתיות – כל השמחה במקום אחד</Typography>
        <Typography sx={{fontSize:'130%'}}>,באתר שלנו ניתן ליצור ארוע ולשלוח את ההזמנות לכל המוזמנים בלחיצת כפתור אחת</Typography>
        <Typography sx={{fontSize:'130%'}}>. ניתן גם כן לעקוב מי מהמוזמנים אישר את הגעתו ולהערך בהתאם</Typography>
    </Box></Box>
}