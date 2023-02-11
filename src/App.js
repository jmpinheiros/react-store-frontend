import './App.css';

// criei meus componentes e agora trago para meu app root
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

// modulos react para router switch não usa mais, agora é Routes
// React route v6
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        Olá React
      </h3>

      <Navigation/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='department/*' element={<Department/>} />
        <Route path='employee/*' element={<Employee/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
