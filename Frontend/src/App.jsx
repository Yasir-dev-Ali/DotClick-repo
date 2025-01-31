import React from 'react';
import Login from './component/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './component/SignUp/SignUp';
import Dashboard from './component/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/deshboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
