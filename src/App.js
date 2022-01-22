import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './Components/MainComponent/MainComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainComponent></MainComponent>
      </div>
    </BrowserRouter>
  );
}

export default App;