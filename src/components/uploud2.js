
import axios, { AxiosResponse } from 'axios';
import React from "react";
import Grid from '@mui/system/Unstable_Grid';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { success } from './sweetAlert';
import { error } from './sweetAlert';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export class UploadForm2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      file: null,
    };
  }
  async submit(e) {
    e.preventDefault();
    const url = `https://localhost:44325/api/Functions/up`;
    const formData = new FormData();
    formData.append('file', this.state.file, this.state.file.name); // add the file to the form data
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      let o={"flag":true}
      sessionStorage.setItem('fileup', JSON.stringify(o))
      success("הקובץ עלה בהצלחה ניתן להמשיך הלאה")
    } catch (errorr) {
      error("לא ניתן להעלות את הקובץ")
    }
  }

  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }



  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            dir="rtl">
            <Grid item xs={12} sm={9} md={9}>
            <Button component="label" sx={{ color: "#3b3a30", backgroundColor: "#c0ded9" }} variant="contained" onChange={e => this.setFile(e)} startIcon={<CloudUploadIcon sx={{ml:1}} />}>
                בחירת קובץ
            <VisuallyHiddenInput accept=".jpg,.png"  type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
               <Button sx={{ color: "#3b3a30", backgroundColor: "#c0ded9" }} type="submit">העלה</Button>
            </Grid >
          </Grid>
        </Box>
      </form>


    );
  }
}

