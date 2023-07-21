import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NavBar from './component/navBar';
import Signup from './pages/signUp';
import Login from './pages/login';
import List from './pages/list';
import HomePage from './pages/welcome';

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Signup />} exact />
        <Route path="/login" element={<Login />} />
        <Route path='/welcome' element={<HomePage />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
