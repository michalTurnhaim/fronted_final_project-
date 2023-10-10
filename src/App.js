
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';
import './bootstrap.css'
import newstore from './redux/store';

function App() {
  return (
    <div >
      <Provider store={newstore}>
     <BrowserRouter>
          <Routing></Routing>
        </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
