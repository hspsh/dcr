import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Edit from './views/edit'
import Prev from './views/prev'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/p/:id' element={<Edit />}/>
        <Route path='/i/:id' element={<Prev />}/>
      </Routes>
    </ BrowserRouter>
  );
}

export default App;
