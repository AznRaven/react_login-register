import Register from './pages/Register';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';

function App() {

  return (
    <main className="App">
      {/* <Register /> */}
      <Routes> 
        <Route 
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/"
          element={<Login />}
        />
        {/* <Route path='/price/:symbol' element={<Price/>} /> */}
        {/* <Route path='*' element={<Navagate to='/' />} /> */}
      </Routes>
    </main>
  );
}

export default App;