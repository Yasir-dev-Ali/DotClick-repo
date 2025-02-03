import React from 'react';
import Login from './component/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './component/SignUp/SignUp';
import Dashboard from './component/Dashboard/Dashboard';
import Logout from './component/Logout/Logout';
import ForgotPassword from './component/Forget/ForgetPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/deshboard' element={<Dashboard/>} />
        <Route path='/logout' element={<Logout/>}/>
        <Route path='*' element={<h1>Not Found</h1>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
