
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';
import './bootstrap.css'
import newstore from './redux/store';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import MapComponent from './components/tryAdress';



function App() {
  return (
    <div >
      
       
          <BrowserRouter>
            <Routing></Routing>
            {/* <MapComponent></MapComponent> */}
          </BrowserRouter>
       

    </div>
  );
}

export default App;
