import React from 'react';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';

import Header from './pages/components/Header';
import Login  from './pages/Login';
import SignUp  from './pages/Registration';

import './App.css'

function App() {
  return (
  <>
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>  
      <Route path='/registration' element={<SignUp/>}/>  
    </Routes>
  </Router>
  </>
  );
}

export default App;
