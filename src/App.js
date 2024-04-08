
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';
import './bootstrap.css'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </div>
  );
}

export default App;
