import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import newstore from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#c0ded9',
      main: '#c0ded9',
       dark: '#c0ded9',
       contrastText: '#3b3a30',
    },
  }
  //   white: {
  //     light: PALLETE.WHITE,
  //     main: PALLETE.WHITE,
  //     dark: PALLETE.WHITE,
  //     contrastText: PALLETE.WHITE,
  //   },
  //   success: {
  //     light: "#2e7d32",
  //     main: "#4caf50",
  //     dark: "#1b5e20",
  //     contrastText: PALLETE.WHITE,
  //   }
  // },
});
root.render(

  <React.StrictMode>
    <Provider store={newstore}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
