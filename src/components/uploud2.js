
import axios, { AxiosResponse } from 'axios';
import React from "react";
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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
      <div >
        <input  style={{marginLeft:'54%'}} type="file" accept=".jpg,.png" onChange={e => this.setFile(e)} />
        </div>
        <button className="btn btn" style={{backgroundColor:"#c0ded9",marginLeft:'80.76%',marginTop:'8px'}} type="submit">העלה</button>
      </form>

    
    );
  }
}

