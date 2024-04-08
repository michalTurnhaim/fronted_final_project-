import { Box, Container, Typography } from "@mui/material";
import imageOrder from "../img/backGround.png"
import video from "../video/1.mp4"
import video2 from "../video/2.mp4"
import { styled } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';

export const About = () => {
  const theme = useTheme();
  const Background = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imageOrder})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  });

  return <Box sx={{ width: '100%', backgroundColor: '#f0f0f0', padding: '20px' }}>
    <Background sx={{ opacity: 0.3, mt: -8 }}></Background>
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'start' }}>
      <Typography sx={{ fontSize: '220%', mt: 2, fontWeight: 'bold', fontFamily: 'default' }}>! הארגון הכי פשוט והכי כיפי לשמחות משפחתיות – כל השמחה במקום אחד</Typography>
      <Typography sx={{ fontSize: '130%' }}>,באתר שלנו ניתן ליצור ארוע ולשלוח את ההזמנות לכל המוזמנים בלחיצת כפתור אחת</Typography>
      <Typography sx={{ fontSize: '130%' }}>. ניתן גם כן לעקוב מי מהמוזמנים אישר את הגעתו ולהערך בהתאם</Typography>
      <Typography sx={{ fontSize: '220%', mt: 5, fontWeight: 'bold', fontStyle: 'oblique', fontFamily: 'default' }}>?איך להשתמש באתר שלנו</Typography>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>

        {/* וידיאו1 */}
        <CardContent sx={{
          flex: '1 0 auto',
          boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
        }}>
          <Typography component="div" variant="h5" sx={{ direction: "rtl" }}>
            הוראות לבעל האירוע
            <DownloadTwoToneIcon />
          </Typography>
          <video width="320" height="240" controls>
            <source src={video} type="video/mp4" />
          </video>
        </CardContent>

        {/* וידיאו2 */}
        <CardContent sx={{
          flex: '1 0 auto',
          boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
        }}>
          <Typography component="div" variant="h5" sx={{ direction: "rtl" }}>
            הוראות למוזמנים לאירוע
            <DownloadTwoToneIcon />
          </Typography>
          <video width="320" height="240" controls>
            <source src={video2} type="video/mp4" />
          </video>
        </CardContent>

      </Box>
    </Box>
  </Box>

}